import { motion } from 'framer-motion'
import { HiMoon, HiSun } from 'react-icons/hi'
import { useTheme } from '../context/ThemeContext.jsx'
import { useTranslation } from 'react-i18next'

export function DarkModeToggle() {
  const { theme, toggle } = useTheme()
  const { t } = useTranslation()
  const dark = theme === 'dark'

  return (
    <motion.button
      type="button"
      onClick={toggle}
      whileTap={{ scale: 0.94 }}
      aria-pressed={dark}
      aria-label={dark ? t('theme.light') : t('theme.dark')}
      className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-slate-200 bg-white text-amber-500 shadow-sm transition-colors hover:border-cyan-500/40 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-amber-300 dark:hover:border-cyan-400/50 dark:hover:bg-slate-700"
    >
      {dark ? <HiSun className="h-6 w-6" /> : <HiMoon className="h-6 w-6" />}
    </motion.button>
  )
}
