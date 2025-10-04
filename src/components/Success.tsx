import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import ClipboardJS from 'clipboard';
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
  const [copyStatus, setCopyStatus] = useState(0);
  const baseUrl = window.location.origin;
  const pasteUrl = `${baseUrl}/#/${key}`;

  useEffect(() => {
    const clipboard = new ClipboardJS('.copy-badge');

    clipboard.on('success', () => {
      setCopyStatus(1);
      setTimeout(() => setCopyStatus(0), 2000);
    });

    clipboard.on('error', () => {
      setCopyStatus(-1);
      setTimeout(() => setCopyStatus(0), 2000);
    });

    return () => clipboard.destroy();
  }, []);

  const goHome = () => {
    navigate('/');
  };

  const getCopyText = () => {
    if (copyStatus > 0) return t('lang.success.badge.success');
    if (copyStatus < 0) return t('lang.success.badge.fail');
    return t('lang.success.badge.copy');
  };

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="my-8 bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-4">{t('lang.success.h2')}</h2>

        <p
          className="mb-4"
          dangerouslySetInnerHTML={{ __html: t('lang.success.p[0].text', { key }) }}
        />

        <ul className="list-disc list-inside space-y-3 mb-6">
          <li>
            <span dangerouslySetInnerHTML={{ __html: t('lang.success.ul.li[0].text') }} />
            &nbsp;
            <Popover>
              <PopoverTrigger asChild>
                <Badge variant="secondary" className="cursor-help">?</Badge>
              </PopoverTrigger>
              <PopoverContent>
                <div dangerouslySetInnerHTML={{ __html: t('lang.success.popover.text') }} />
              </PopoverContent>
            </Popover>
          </li>

          <li>
            {t('lang.success.ul.li[1].browser')}
            &nbsp;
            <a
              href={pasteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
              title={t('lang.success.ul.li[1].tooltip')}
            >
              {pasteUrl}
            </a>
            &nbsp;
            <Badge
              variant="default"
              className="copy-badge cursor-pointer"
              data-clipboard-text={pasteUrl}
            >
              {getCopyText()}
            </Badge>
          </li>

          <li>
            <Popover>
              <PopoverTrigger asChild>
                <span className="text-blue-600 cursor-pointer hover:underline">
                  {t('lang.success.ul.li[2].scan_qr_code')}
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
          {t('lang.success.p[1].button')}
        </Button>
      </div>
    </div>
  );
}
