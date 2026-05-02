import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { HiCheckCircle } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button.jsx'

export function Features() {
  const { t } = useTranslation()
  const featureItems = [
    t('dash.howToVote'),
    t('dash.timeline'),
    t('dash.faq'),
    t('dash.quiz'),
    t('dash.practice'),
  ]

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 md:px-6 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-emerald-100 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900 md:p-10"
      >
        <h1 className="mb-6 text-3xl font-extrabold text-slate-950 dark:text-white md:text-4xl">
          {t('features.title')}
        </h1>
        <p className="mb-8 text-xl font-medium leading-relaxed text-slate-600 dark:text-slate-300 md:text-2xl">
          {t('features.p1')}
        </p>
        <ul className="mb-10 space-y-4 text-xl text-slate-800 dark:text-slate-200 md:text-2xl">
          {featureItems.map((item) => (
            <li key={item} className="flex items-center gap-3">
              <HiCheckCircle className="h-7 w-7 shrink-0 text-emerald-700 dark:text-emerald-300" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <Link to="/signup">
          <Button className="!min-h-[56px]">{t('hero.ctaPrimary')}</Button>
        </Link>
      </motion.div>
    </div>
  )
}

