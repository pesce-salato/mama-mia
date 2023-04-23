import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'

const Key = 'i18n:lng'

export enum Language {
  en = 'en',
  zh = 'zh',
}

export const getInitLng = () => {
  return localStorage.getItem(Key) || Language.en
}

export const useSetLng = () => {
  const { i18n } = useTranslation()

  return useCallback(
    async (lng: Language) => {
      await i18n.changeLanguage(lng)
      localStorage.setItem(Key, lng)
    },
    [i18n]
  )
}
