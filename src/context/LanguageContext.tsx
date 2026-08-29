import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import { translations, LANGUAGES, type LanguageCode, type TranslationKey } from '../i18n/translations'

interface LanguageContextType {
  language: LanguageCode
  setLanguage: (code: LanguageCode) => void
  t: (key: TranslationKey) => string
  languageLabel: string
}

const LanguageContext = createContext<LanguageContextType | null>(null)

const STORAGE_KEY = 'irctc-language'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as LanguageCode | null
    return saved && translations[saved] ? saved : 'en'
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language)
    document.documentElement.lang = language
  }, [language])

  const setLanguage = useCallback((code: LanguageCode) => {
    setLanguageState(code)
  }, [])

  const t = useCallback(
    (key: TranslationKey) => translations[language][key] ?? translations.en[key] ?? key,
    [language]
  )

  const languageLabel = LANGUAGES.find((l) => l.code === language)?.label ?? 'English'

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languageLabel }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
