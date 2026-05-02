import { useTranslation } from 'react-i18next'
import { useLanguage } from '../context/LanguageContext.jsx'

export function LanguageToggle() {
  const { t } = useTranslation()
  const { language, setLanguage } = useLanguage()

  return (
    <div
      className="flex rounded-xl border-2 border-slate-200 bg-white p-1 shadow-sm dark:border-slate-600 dark:bg-slate-800"
      role="group"
      aria-label={t('lang.en') + ' / ' + t('lang.hi')}
    >
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`min-h-[44px] rounded-lg px-4 text-base font-bold md:min-h-[48px] md:px-5 md:text-lg ${
          language === 'en'
            ? 'bg-gradient-to-r from-[#0056b3] to-[#0891b2] text-white shadow-sm'
            : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700'
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage('hi')}
        className={`min-h-[44px] rounded-lg px-4 text-base font-bold md:min-h-[48px] md:px-5 md:text-lg ${
          language === 'hi'
            ? 'bg-gradient-to-r from-[#0056b3] to-[#0891b2] text-white shadow-sm'
            : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700'
        }`}
      >
        हिं
      </button>
    </div>
  )
}
