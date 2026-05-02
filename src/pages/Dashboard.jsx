import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { DashboardCard } from '../components/DashboardCard.jsx'

export function Dashboard() {
  const { t } = useTranslation()

  const items = [
    { to: '/how-to-vote', emoji: '🗳️', title: t('dash.howToVote'), accent: 'blue' },
    { to: '/documents', emoji: '📄', title: t('dash.documents'), accent: 'green' },
    { to: '/polling-booth', emoji: '📍', title: t('dash.booth'), accent: 'saffron' },
    { to: '/faq', emoji: '❓', title: t('dash.faq'), accent: 'blue' },
    { to: '/quiz', emoji: '🧠', title: t('dash.quiz'), accent: 'green' },
    { to: '/practice-voting', emoji: '🎮', title: t('dash.practice'), accent: 'saffron' },
    { to: '/timeline', emoji: '🕒', title: t('dash.timeline'), accent: 'blue' },
  ]

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6 text-center dark:border-slate-700 dark:bg-gradient-to-r dark:from-slate-900 dark:to-slate-800"
      >
        <h1 className="text-3xl font-extrabold text-blue-950 dark:text-white md:text-5xl">{t('dashboard.title')}</h1>
        <p className="mt-3 text-xl text-slate-600 dark:text-slate-300 md:text-2xl">{t('dashboard.sub')}</p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item, index) => (
          <DashboardCard key={item.to} {...item} index={index} />
        ))}
      </div>
    </div>
  )
}
