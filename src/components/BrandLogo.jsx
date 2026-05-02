import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

/**
 * Logo image (includes DASH wordmark) + subtitle — no duplicate large title.
 */
export function BrandLogo({ onNavigate }) {
  const { t } = useTranslation()

  return (
    <Link
      to="/"
      onClick={onNavigate}
      className="group flex max-w-[100vw] items-center gap-2 rounded-xl outline-none focus-visible:ring-4 focus-visible:ring-cyan-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 sm:gap-3"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 420, damping: 22 }}
        className="relative shrink-0"
      >
        <img
          src="/dash-logo.png"
          alt={t('app.logoAlt')}
          width={280}
          height={64}
          className="h-9 w-auto max-w-[min(58vw,260px)] object-contain object-left drop-shadow-sm transition-[filter] duration-300 group-hover:brightness-105 dark:opacity-95 dark:group-hover:opacity-100 md:h-11 md:max-w-[280px]"
        />
      </motion.div>
      <div className="hidden h-10 w-px shrink-0 bg-slate-200 dark:bg-slate-600 sm:block" aria-hidden />
      <div className="hidden min-w-0 flex-col justify-center sm:flex">
        <span className="max-w-[12rem] text-left text-[11px] font-semibold uppercase leading-snug tracking-wide text-[#0056b3] dark:text-cyan-400 md:text-xs">
          {t('app.fullName')}
        </span>
      </div>
    </Link>
  )
}
