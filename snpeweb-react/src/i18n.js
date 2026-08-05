import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import ko from './locales/ko.json'
import en from './locales/en.json'
import ja from './locales/ja.json'

function syncHtmlLang(lng) {
  if (typeof document === 'undefined') return
  const code = String(lng || 'ko').split('-')[0]
  document.documentElement.lang = code
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ko: { translation: ko },
      en: { translation: en },
      ja: { translation: ja },
    },
    supportedLngs: ['ko', 'en', 'ja'],
    nonExplicitSupportedLngs: true,
    fallbackLng: 'ko',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  })

syncHtmlLang(i18n.resolvedLanguage || i18n.language)
i18n.on('languageChanged', syncHtmlLang)

export default i18n
