import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { lang as zhCN } from '@/assets/lang/zh-CN';
import { lang as en } from '@/assets/lang/en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      'zh-CN': {
        translation: zhCN
      },
      'en': {
        translation: en
      }
    },
    lng: 'zh-CN',
    fallbackLng: 'zh-CN',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
