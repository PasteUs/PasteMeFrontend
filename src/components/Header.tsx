import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppStore } from '@/store/useAppStore';

export default function Header() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const config = useAppStore(state => state.config);
  const [key, setKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (key) {
      navigate(`/${key}`);
      setKey('');
    }
  };

  const setLang = (lang: string) => {
    i18n.changeLanguage(lang);
    // Store in cookie if needed
    document.cookie = `pasteme_lang=${lang};max-age=${7 * 24 * 60 * 60};path=/`;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-bold hover:text-gray-300 transition"
            title={t('nav.router_link')}
          >
            PasteMe
          </Link>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="hidden md:flex items-center gap-2 flex-1 max-w-md mx-4">
            <div className="flex items-center gap-1 text-sm text-gray-400">
              {window.location.host}/
            </div>
            <Input
              type="search"
              placeholder={t('nav.form.placeholder')}
              value={key}
              onChange={(e) => setKey(e.target.value)}
              maxLength={8}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              required
            />
            <Button type="submit" size="sm">
              {t('nav.form.button')}
            </Button>
          </form>

          {/* Right side menu */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:text-gray-300">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLang('zh-CN')}>
                  {t('nav.lang.zh_CN')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang('en')}>
                  {t('nav.lang.en')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notifications (if admin API available) */}
            {config.api.admin && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:text-gray-300">
                    <Bell className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>{t('nav.more')}</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* More Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden md:flex text-white hover:text-gray-300">
                  {t('nav.something.text')}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <a href="https://docs.pasteme.cn/#/developer/api" target="_blank" rel="noopener noreferrer">
                    API
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="https://docs.pasteme.cn/#/documentation" target="_blank" rel="noopener noreferrer">
                    {t('nav.something.help')}
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="https://github.com/LucienShui/PasteMe/issues" target="_blank" rel="noopener noreferrer">
                    {t('nav.something.feedback')}
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Donate */}
            <Button variant="ghost" size="sm" className="hidden md:flex text-white hover:text-gray-300">
              {t('nav.donate')}
            </Button>

            {/* Mobile Menu */}
            <Button variant="ghost" size="icon" className="md:hidden text-white">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* GitHub Corner */}
      <a
        href="https://github.com/LucienShui/PasteMe"
        target="_blank"
        rel="noopener noreferrer"
        className="github-corner hidden lg:block"
        aria-label="View source on GitHub"
        title={t('nav.beg')}
      >
        <svg width="80" height="80" viewBox="0 0 250 250" style={{ fill: '#151513', color: '#fff', position: 'absolute', top: '3.5em', border: 0, right: 0 }} aria-hidden="true">
          <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
          <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style={{ transformOrigin: '130px 106px' }} className="octo-arm"></path>
          <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" className="octo-body"></path>
        </svg>
      </a>
    </nav>
  );
}
