import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export function FeatureCard({ to, icon, title, description, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Link
        to={to}
        className="flex h-full min-h-[160px] flex-col gap-3 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition hover:border-[#0056b3]/50 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:hover:border-cyan-500/40"
      >
        <div className="text-4xl" aria-hidden>
          {icon}
        </div>
        <h3 className="text-xl font-bold text-blue-950 dark:text-white md:text-2xl">{title}</h3>
        <p className="text-lg text-slate-600 dark:text-slate-300 md:text-xl">{description}</p>
      </Link>
    </motion.div>
  )
}
