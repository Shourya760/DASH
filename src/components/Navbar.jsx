import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { useAuth } from '../context/AuthContext.jsx'
import { LanguageToggle } from './LanguageToggle.jsx'
import { Button } from './ui/Button.jsx'
import { BrandLogo } from './BrandLogo.jsx'
import { DarkModeToggle } from './DarkModeToggle.jsx'

const linkClass =
  'relative px-3 py-2 text-lg font-semibold text-slate-700 transition-colors after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-gradient-to-r after:from-[#0056b3] after:to-[#00bcd4] after:transition-transform after:duration-300 hover:text-blue-800 hover:after:scale-x-100 aria-[current=page]:text-blue-600 aria-[current=page]:after:scale-x-100 dark:text-slate-200 dark:hover:text-cyan-300 dark:aria-[current=page]:text-cyan-400'

const mobileLinkClass =
  'block min-h-[52px] rounded-2xl px-4 py-3 text-lg font-semibold transition-colors aria-[current=page]:bg-blue-100 aria-[current=page]:text-blue-900 dark:aria-[current=page]:bg-slate-800 dark:aria-[current=page]:text-cyan-300 text-slate-800 hover:bg-blue-50 dark:text-slate-100 dark:hover:bg-slate-800'

export function Navbar() {
  const { t } = useTranslation()
  const { user, logOut } = useAuth()
  const [open, setOpen] = useState(false)
  const [elevated, setElevated] = useState(false)

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <motion.header
      initial={false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={`sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl transition-shadow duration-300 dark:border-slate-700/80 dark:bg-slate-950/85 ${
        elevated
          ? 'shadow-lg shadow-slate-900/10 dark:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.55)]'
          : ''
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:gap-6 md:px-6">
        <BrandLogo onNavigate={close} />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          <NavLink to="/" end className={linkClass} onClick={close}>
            {t('nav.home')}
          </NavLink>
          <NavLink to="/features" className={linkClass} onClick={close}>
            {t('nav.features')}
          </NavLink>
          <NavLink to="/timeline" className={linkClass} onClick={close}>
            {t('nav.timeline')}
          </NavLink>
          <NavLink to="/faq" className={linkClass} onClick={close}>
            {t('nav.faq')}
          </NavLink>
          {user ? (
            <NavLink to="/dashboard" className={linkClass} onClick={close}>
              {t('nav.dashboard')}
            </NavLink>
          ) : null}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageToggle />
          <DarkModeToggle />
          {user ? (
            <Button
              type="button"
              variant="outline"
              className="!min-h-[48px] !px-4 !text-base"
              onClick={() => {
                logOut()
                close()
              }}
            >
              {t('nav.logout')}
            </Button>
          ) : (
            <>
              <Link to="/login" onClick={close}>
                <Button variant="ghost" className="!min-h-[48px] !px-4 !text-base">
                  {t('nav.login')}
                </Button>
              </Link>
              <Link to="/signup" onClick={close}>
                <Button className="!min-h-[48px] !bg-gradient-to-r !from-[#0056b3] !to-[#0891b2] !px-5 !text-base !text-white shadow-lg hover:opacity-95">
                  {t('nav.signup')}
                </Button>
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <DarkModeToggle />
          <LanguageToggle />
          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-slate-200 bg-white text-slate-800 shadow-sm dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            aria-expanded={open}
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <HiX className="h-7 w-7" /> : <HiMenuAlt3 className="h-7 w-7" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-slate-200/80 bg-white/95 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-950/95 lg:hidden"
          >
            <div className="flex max-h-[min(70vh,520px)] flex-col gap-1 overflow-y-auto px-4 py-4">
              <NavLink to="/" end className={mobileLinkClass} onClick={close}>
                {t('nav.home')}
              </NavLink>
              <NavLink to="/features" className={mobileLinkClass} onClick={close}>
                {t('nav.features')}
              </NavLink>
              <NavLink to="/timeline" className={mobileLinkClass} onClick={close}>
                {t('nav.timeline')}
              </NavLink>
              <NavLink to="/faq" className={mobileLinkClass} onClick={close}>
                {t('nav.faq')}
              </NavLink>
              {user ? (
                <NavLink to="/dashboard" className={mobileLinkClass} onClick={close}>
                  {t('nav.dashboard')}
                </NavLink>
              ) : null}
              <div className="mt-3 flex flex-col gap-3 border-t border-slate-200 pt-4 dark:border-slate-700">
                {user ? (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      logOut()
                      close()
                    }}
                  >
                    {t('nav.logout')}
                  </Button>
                ) : (
                  <>
                    <Link to="/login" onClick={close}>
                      <Button variant="outline" className="w-full">
                        {t('nav.login')}
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={close}>
                      <Button className="w-full !bg-gradient-to-r !from-[#0056b3] !to-[#0891b2] !text-white">
                        {t('nav.signup')}
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  )
}
