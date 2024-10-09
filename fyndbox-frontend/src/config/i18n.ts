import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translations } from '@fyndbox/shared';

i18n.use(initReactI18next).init({
  resources: translations,
  lng: localStorage.getItem('appLanguage') || 'en', // default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
