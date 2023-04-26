import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'
import { en } from '@/i18n/en'
import { zh } from '@/i18n/zh'
import { getInitLng } from '@/i18n/lng'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    zh: {
      translation: zh,
    },
  },
  lng: getInitLng(),
})
