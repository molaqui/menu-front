import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import TranslationEN from './locale/en.json';
import TranslationFR from './locale/fr.json';
import TranslationAR from './locale/ar.json';
import TranslationZH from './locale/zh.json';

import LanguageDetector from 'i18next-browser-languagedetector';
import React from 'react';

const resources = {
  en: {
    translation: TranslationEN,
  },
  fr: {
    translation: TranslationFR,
  },
  ar: {
    translation: TranslationAR,
  },
  zh: {
    translation: TranslationZH,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: {
      useSuspense: false, // fixed typo: useSuspense should be false, not flase
    },
  });

export default i18n;
