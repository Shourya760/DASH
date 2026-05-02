import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export function DashboardCard({ to, Icon, title, accent = 'blue', index = 0 }) {
  const cardTone =
    accent === 'saffron'
      ? 'bg-white dark:bg-slate-900'
      : accent === 'green'
        ? 'bg-white dark:bg-slate-900'
        : 'bg-white dark:bg-slate-900'

  const iconTone =
    accent === 'saffron'
      ? 'bg-orange-100 text-orange-800 ring-orange-200 dark:bg-orange-500/18 dark:text-orange-200 dark:ring-orange-400/25'
      : accent === 'green'
        ? 'bg-emerald-100 text-emerald-800 ring-emerald-200 dark:bg-emerald-500/18 dark:text-emerald-200 dark:ring-emerald-400/25'
        : 'bg-blue-100 text-blue-800 ring-blue-200 dark:bg-cyan-500/18 dark:text-cyan-200 dark:ring-cyan-400/25'

  const ring =
    accent === 'saffron'
      ? 'border-orange-200 hover:border-orange-400 hover:shadow-orange-100/80 dark:border-orange-400/35 dark:hover:border-orange-300'
      : accent === 'green'
        ? 'border-emerald-200 hover:border-emerald-500 hover:shadow-emerald-100/80 dark:border-emerald-400/35 dark:hover:border-emerald-300'
        : 'border-blue-200 hover:border-blue-400 hover:shadow-blue-100/80 dark:border-cyan-400/35 dark:hover:border-cyan-300'

  const bar =
    accent === 'saffron'
      ? 'from-orange-500 to-amber-400'
      : accent === 'green'
        ? 'from-emerald-600 to-teal-400'
        : 'from-blue-700 to-cyan-500'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.99 }}
      className="h-full"
    >
      <Link
        to={to}
        className={`group relative flex min-h-[128px] overflow-hidden rounded-2xl border-2 p-5 shadow-sm transition duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300/70 focus-visible:ring-offset-2 dark:shadow-[0_12px_32px_-16px_rgba(0,0,0,0.85)] dark:focus-visible:ring-cyan-400/60 dark:focus-visible:ring-offset-slate-950 ${cardTone} ${ring} md:min-h-[146px] md:p-6`}
      >
        <span className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${bar}`} aria-hidden />
        <span
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ring-1 transition group-hover:scale-105 md:h-16 md:w-16 ${iconTone}`}
          aria-hidden
        >
          <Icon className="h-8 w-8 md:h-9 md:w-9" />
        </span>
        <span className="flex min-w-0 flex-1 items-center text-xl font-extrabold leading-snug text-slate-950 dark:text-white md:text-2xl">
          <span className="break-words">{title}</span>
        </span>
      </Link>
    </motion.div>
  )
}
