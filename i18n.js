import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import en from './locales/en.json';
import ua from './locales/ua.json';
import cz from './locales/cz.json';

const resources = {
  en: { translation: en },
  ua: {  translation: ua},
  cz: {  translation: cz }
};


const languageCode = Localization.getLocales()[0].languageCode ?? 'en';
console.log("🚀 i18n 🚀 ~ languageCode:", Localization.getLocales()[0].languageCode)



i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources,
    lng: languageCode, // Automatically detect the device language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already does escaping
    }
  });

export default i18n;

