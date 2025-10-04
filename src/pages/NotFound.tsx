import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation();
  const useAppStore = () => ({ notFound: true });
  const { notFound } = useAppStore();

  return (
    <div className={`min-h-screen flex items-center justify-center ${notFound ? 'bg-paste-blue' : ''}`}>
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-8">{t('lang.not_found.content.title')}</p>
        <Link
          to="/"
          className="bg-white text-paste-blue px-6 py-3 rounded-lg hover:bg-gray-100 transition"
        >
          {t('lang.not_found.content.go_home')}
        </Link>
        <div className="mt-12 text-sm opacity-75">
          <p>{t('lang.not_found.footer.text')}</p>
        </div>
      </div>
    </div>
  );
}
