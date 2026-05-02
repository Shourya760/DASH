import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export function About() {
  const { t } = useTranslation()

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 md:px-6 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border-2 border-blue-100 bg-white p-8 shadow-lg dark:border-slate-700 dark:bg-slate-900 md:p-10"
      >
        <h1 className="mb-6 text-3xl font-extrabold text-blue-950 dark:text-white md:text-4xl">{t('about.title')}</h1>
        <p className="mb-4 text-xl leading-relaxed text-slate-700 dark:text-slate-300 md:text-2xl">{t('about.p1')}</p>
        <p className="text-xl leading-relaxed text-slate-700 dark:text-slate-300 md:text-2xl">{t('about.p2')}</p>
      </motion.div>
    </div>
  )
}
