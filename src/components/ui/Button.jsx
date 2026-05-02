import { motion } from 'framer-motion'

/**
 * Large, high-contrast button for touch-friendly UI (light + dark).
 */
export function Button({
  children,
  className = '',
  variant = 'primary',
  type = 'button',
  disabled,
  ...props
}) {
  const base =
    'inline-flex min-h-[52px] items-center justify-center rounded-2xl px-6 py-3 text-lg font-semibold shadow-md transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 disabled:opacity-50 dark:focus-visible:ring-offset-slate-900 md:min-h-[56px] md:text-xl'
  const variants = {
    primary:
      'bg-blue-700 text-white hover:bg-blue-800 focus-visible:ring-blue-400 border border-blue-800 dark:bg-cyan-600 dark:hover:bg-cyan-500 dark:border-cyan-500 dark:text-white',
    saffron:
      'bg-orange-600 text-white hover:bg-orange-700 focus-visible:ring-orange-300 border border-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600',
    green:
      'bg-green-700 text-white hover:bg-green-800 focus-visible:ring-green-400 border border-green-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 dark:border-emerald-500',
    outline:
      'bg-white text-blue-800 border-2 border-blue-700 hover:bg-blue-50 focus-visible:ring-blue-300 dark:bg-slate-800 dark:text-cyan-300 dark:border-cyan-500/60 dark:hover:bg-slate-700',
    ghost:
      'bg-transparent text-blue-800 hover:bg-blue-50 shadow-none border-2 border-transparent dark:text-cyan-200 dark:hover:bg-slate-800',
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${base} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
