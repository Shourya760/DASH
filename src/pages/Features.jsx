import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button.jsx'

export function Features() {
  const { t } = useTranslation()

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 md:px-6 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border-2 border-green-100 bg-white p-8 shadow-lg dark:border-slate-700 dark:bg-slate-900 md:p-10"
      >
        <h1 className="mb-6 text-3xl font-extrabold text-blue-950 dark:text-white md:text-4xl">{t('features.title')}</h1>
        <p className="mb-8 text-xl leading-relaxed text-slate-700 dark:text-slate-300 md:text-2xl">{t('features.p1')}</p>
        <ul className="mb-10 space-y-4 text-xl text-slate-800 dark:text-slate-200 md:text-2xl">
          <li>✓ {t('dash.howToVote')}</li>
          <li>✓ {t('dash.timeline')}</li>
          <li>✓ {t('dash.faq')}</li>
          <li>✓ {t('dash.quiz')}</li>
          <li>✓ {t('dash.practice')}</li>
        </ul>
        <Link to="/signup">
          <Button className="!min-h-[56px]">{t('hero.ctaPrimary')}</Button>
        </Link>
      </motion.div>
    </div>
  )
}
