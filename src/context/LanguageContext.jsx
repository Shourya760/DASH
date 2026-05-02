import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

const LanguageContext = createContext(null)

const STORAGE_KEY = 'election_lang'

export function LanguageProvider({ children }) {
  const { i18n } = useTranslation()
  const [lang, setLangState] = useState(i18n.language || 'en')

  const setLanguage = useCallback(
    (code) => {
      const next = code === 'hi' ? 'hi' : 'en'
      i18n.changeLanguage(next)
      localStorage.setItem(STORAGE_KEY, next)
      document.documentElement.lang = next === 'hi' ? 'hi' : 'en'
      setLangState(next)
    },
    [i18n],
  )

  const value = useMemo(
    () => ({
      language: lang,
      setLanguage,
      toggleLanguage: () => setLanguage(lang === 'hi' ? 'en' : 'hi'),
    }),
    [lang, setLanguage],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
