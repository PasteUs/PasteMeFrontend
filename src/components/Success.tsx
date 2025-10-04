import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export default function Success() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const key = useAppStore(state => state.key);
  const updateState = useAppStore(state => state.updateState);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isQROpen, setIsQROpen] = useState(false);
  const baseUrl = window.location.origin;
  const pasteUrl = `${baseUrl}/#/${key}`;

  const goHome = () => {
    updateState({ view: 'form' });
    navigate('/');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pasteUrl);
      setCopyStatus('success');
      setTimeout(() => setCopyStatus('idle'), 2000);
    } catch (err) {
      setCopyStatus('error');
      setTimeout(() => setCopyStatus('idle'), 2000);
    }
  };

  const getCopyText = () => {
    if (copyStatus === 'success') return t('success.badge.success');
    if (copyStatus === 'error') return t('success.badge.fail');
    return t('success.badge.copy');
  };

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="my-8 bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-4">{t('success.h2')}</h2>

        <p className="mb-4">
          {t('success.access_paste.prefix')} <strong>{key}</strong> {t('success.access_paste.suffix')}
        </p>

        <ul className="list-disc list-inside space-y-3 mb-6">
          <li>
            {t('success.methods.input_in_navbar.prefix')}<strong>{t('success.methods.input_in_navbar.highlight')}</strong>
            &nbsp;
            <Popover open={isHelpOpen} onOpenChange={setIsHelpOpen}>
              <PopoverTrigger asChild>
                <Badge
                  variant="secondary"
                  className="cursor-help"
                  onMouseEnter={() => setIsHelpOpen(true)}
                  onMouseLeave={() => setIsHelpOpen(false)}
                >
                  ?
                </Badge>
              </PopoverTrigger>
              <PopoverContent>
                {t('success.popover.prefix')} <strong>{t('success.popover.highlight')}</strong> {t('success.popover.suffix')}
              </PopoverContent>
            </Popover>
          </li>

          <li>
            {t('success.methods.browser_link.browser')}
            &nbsp;
            <a
              href={pasteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
              title={t('success.methods.browser_link.tooltip')}
            >
              {pasteUrl}
            </a>
            &nbsp;
            <Badge
              variant="default"
              className="cursor-pointer"
              onClick={handleCopy}
            >
              {getCopyText()}
            </Badge>
          </li>

          <li>
            <Popover open={isQROpen} onOpenChange={setIsQROpen}>
              <PopoverTrigger asChild>
                <span
                  className="text-blue-600 cursor-pointer hover:underline"
                  onMouseEnter={() => setIsQROpen(true)}
                  onMouseLeave={() => setIsQROpen(false)}
                >
                  {t('success.methods.qr_code.scan_qr_code')}
                </span>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex justify-center p-2">
                  <QRCodeSVG value={pasteUrl} size={168} />
                </div>
              </PopoverContent>
            </Popover>
          </li>
        </ul>

        <Button onClick={goHome}>
          {t('success.return_home.button')}
        </Button>
      </div>
    </div>
  );
}
