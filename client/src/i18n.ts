import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV !== 'production',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    preload: ['en', 'pl'],
    ns: ['translation'],
    defaultNS: 'translation',
    backend: {
      loadPath: '/api/locale/{{lng}}/{{ns}}'
    }
  });

export default i18n;
