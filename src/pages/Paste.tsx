import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import Loading from '@/components/Loading';
import PasswordAuth from '@/components/PasswordAuth';
import PasteView from '@/components/PasteView';
import ManualDeleted from '@/components/ManualDeleted';
import type { PasteResponse } from '@/types';

export default function Paste() {
  const { key } = useParams<{ key: string }>();
  const navigate = useNavigate();
  const { view, config, init, updateState } = useAppStore();

  useEffect(() => {
    const loadPaste = async () => {
      init();
      updateState({ view: 'loading' });

      const url = api.join(config.api.backend, 'paste', key || '');

      try {
        const response: PasteResponse = await api.get(url, {}, [40301, 40402]);

        if (response.code === 40301) {
          updateState({ view: 'password_auth' });
        } else if (response.code === 40402) {
          toast.error('Paste not found');
          navigate('/');
        } else {
          updateState({
            view: 'paste_view',
            content: response.content || '',
            lang: response.lang === 'plain' ? 'plaintext' : response.lang || ''
          });
        }
      } catch (error) {
        console.error('Failed to load paste:', error);
        toast.error('Paste not found');
        navigate('/');
      }
    };

    if (key && config.api.backend) {
      loadPaste();
    }
  }, [key, config.api.backend]);

  const renderView = () => {
    switch (view) {
      case 'loading':
        return <Loading />;
      case 'password_auth':
        return <PasswordAuth />;
      case 'paste_view':
        return <PasteView />;
      case 'manual_deleted':
        return <ManualDeleted />;
      default:
        return <Loading />;
    }
  };

  return <div className="py-8">{renderView()}</div>;
}
