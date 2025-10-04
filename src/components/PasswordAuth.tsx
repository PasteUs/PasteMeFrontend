import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { PasteResponse } from '@/types';

export default function PasswordAuth() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { key } = useParams<{ key: string }>();
  const config = useAppStore(state => state.config);
  const updateState = useAppStore(state => state.updateState);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = api.join(config.api.backend, 'paste', key || '');
    try {
      const response: PasteResponse = await api.get(url, { password }, [40301, 40402]);

      if (response.code === 40301) {
        setError(true);
        setPassword('');
      } else if (response.code === 40402) {
        navigate('/What_are_you_nong_sha_lei');
      } else {
        updateState({
          content: response.content || '',
          lang: response.lang === 'plain' ? 'plaintext' : response.lang || '',
          view: 'paste_view'
        });
      }
    } catch (err) {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-md py-12">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            {t('auth.form.label')}
          </label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={error ? t('auth.form.placeholder') : ''}
            autoFocus
            required
            className={error ? 'border-red-500' : ''}
          />
        </div>
        <Button type="submit">
          {t('auth.form.button')}
        </Button>
      </form>
    </div>
  );
}
