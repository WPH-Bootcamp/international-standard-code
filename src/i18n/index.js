import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';

const modules = import.meta.glob('./locales/*/translation.json', {
  eager: true,
});

const resources = Object.entries(modules).reduce((acc, [path, module]) => {
  const lang = path.split('/')[2];
  acc[lang] = { translation: module.default };
  return acc;
}, {});

i18next
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18next;
