import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export function DashboardCard({ to, emoji, title, accent = 'blue', index = 0 }) {
  const cardTone =
    accent === 'saffron'
      ? 'bg-orange-50 dark:bg-orange-500/20'
      : accent === 'green'
        ? 'bg-emerald-50 dark:bg-emerald-500/12'
        : 'bg-blue-50 dark:bg-cyan-500/12'

  const accentText =
    accent === 'saffron'
      ? 'text-orange-800 dark:text-orange-100'
      : accent === 'green'
        ? 'text-emerald-700 dark:text-emerald-300'
        : 'text-blue-700 dark:text-cyan-300'

  const ring =
    accent === 'saffron'
      ? 'border-orange-200 hover:border-orange-400 hover:shadow-orange-100 dark:border-orange-500/45 dark:hover:border-orange-300 dark:hover:bg-orange-500/15'
      : accent === 'green'
        ? 'border-green-200 hover:border-green-500 hover:shadow-green-100 dark:border-emerald-500/45 dark:hover:border-emerald-300 dark:hover:bg-emerald-500/15'
        : 'border-blue-200 hover:border-blue-400 hover:shadow-blue-100 dark:border-cyan-500/45 dark:hover:border-cyan-300 dark:hover:bg-cyan-500/15'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.99 }}
      className="h-full"
    >
      <Link
        to={to}
        className={`flex min-h-[120px] items-center gap-4 rounded-3xl border-2 p-5 shadow-md transition focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300/70 focus-visible:ring-offset-2 dark:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.55)] dark:focus-visible:ring-cyan-400/60 dark:focus-visible:ring-offset-slate-950 ${cardTone} ${ring} md:min-h-[140px] md:p-6`}
      >
        <span className={`text-4xl drop-shadow-sm md:text-5xl ${accentText}`} aria-hidden>
          {emoji}
        </span>
        <span
          className={`text-xl font-extrabold tracking-tight md:text-2xl ${
            accent === 'saffron' ? 'text-orange-900 dark:text-orange-50' : 'text-slate-900 dark:text-white'
          }`}
        >
          {title}
        </span>
      </Link>
    </motion.div>
  )
}
