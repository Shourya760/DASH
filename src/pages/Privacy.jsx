import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export function Privacy() {
  const { t } = useTranslation()

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 md:px-6 md:py-20">
      <motion.article
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-lg dark:border-slate-700 dark:bg-slate-900 md:p-10"
      >
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white md:text-4xl">
          {t('legal.privacyTitle')}
        </h1>
        <p className="mt-6 text-lg text-slate-600 dark:text-slate-300 md:text-xl">{t('legal.privacyBody')}</p>
        <Link to="/" className="mt-8 inline-block text-lg font-semibold text-[#0056b3] underline dark:text-cyan-400">
          {t('nav.home')}
        </Link>
      </motion.article>
    </div>
  )
}
