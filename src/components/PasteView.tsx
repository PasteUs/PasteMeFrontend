import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ClipboardJS from 'clipboard';
import { useAppStore } from '@/store/useAppStore';
import { markdown } from '@/lib/markdown';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import hljs from 'highlight.js';
import mermaid from 'mermaid';

export default function PasteView() {
  const { t } = useTranslation();
  const { content, lang } = useAppStore();
  const [raw, setRaw] = useState(false);
  const [copyStatus, setCopyStatus] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const linesCount = content.trim().split(/\r\n|\r|\n/).length;

  useEffect(() => {
    // Initialize clipboard
    const clipboard = new ClipboardJS('#clipboard-btn');

    clipboard.on('success', () => {
      setCopyStatus(1);
      window.getSelection()?.removeAllRanges();
      setTimeout(() => setCopyStatus(0), 2000);
    });

    clipboard.on('error', () => {
      setCopyStatus(-1);
      setTimeout(() => setCopyStatus(0), 2000);
    });

    return () => clipboard.destroy();
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      // Highlight code blocks
      contentRef.current.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
      });

      // Initialize mermaid diagrams
      if (lang === 'markdown') {
        mermaid.init(undefined, contentRef.current.querySelectorAll('.mermaid'));
      }
    }
  }, [content, lang, raw]);

  const getCopyTooltip = () => {
    if (copyStatus > 0) return t('view.tooltip.success');
    if (copyStatus < 0) return t('view.tooltip.fail');
    return t('view.tooltip.click');
  };

  const renderContent = () => {
    if (lang === 'markdown' && !raw) {
      return (
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: markdown.render(content) }}
        />
      );
    }

    return (
      <pre>
        <code className={`language-${lang}`}>{content}</code>
      </pre>
    );
  };

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>{linesCount} {t('view.lines')}</span>
            <span>|</span>
            <span>{t(`view.lang.${lang}`)}</span>
          </div>

          <div className="flex items-center gap-4">
            {lang === 'markdown' && (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="raw-mode"
                  checked={raw}
                  onCheckedChange={(checked) => setRaw(checked as boolean)}
                />
                <Label htmlFor="raw-mode" className="cursor-pointer text-sm">
                  源码
                </Label>
              </div>
            )}

            <button
              id="clipboard-btn"
              data-clipboard-text={content}
              className="text-blue-600 hover:text-blue-800 text-sm"
              title={getCopyTooltip()}
            >
              {t('view.copy')}
            </button>
          </div>
        </div>

        {/* Content */}
        <div
          ref={contentRef}
          className="p-6 overflow-auto"
          style={{ tabSize: 4 }}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
