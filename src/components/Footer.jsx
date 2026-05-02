import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from 'react-icons/fa'

const social = [
  { Icon: FaFacebookF, href: 'https://facebook.com', label: 'Facebook' },
  { Icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
  { Icon: FaTwitter, href: 'https://twitter.com', label: 'X' },
  { Icon: FaLinkedinIn, href: 'https://linkedin.com', label: 'LinkedIn' },
]

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="mt-auto border-t border-slate-200 bg-gradient-to-b from-slate-50 to-white dark:border-slate-800 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src="/dash-logo.png"
                alt=""
                className="h-10 w-auto max-w-[200px] object-contain object-left"
              />
              <span className="sr-only">{t('app.title')}</span>
            </Link>
            <p className="mt-4 max-w-sm text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              {t('footer.tagline')}
            </p>
            <p className="mt-3 text-base font-medium text-slate-500 dark:text-slate-400">
              {t('footer.empower')}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {social.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:border-cyan-500/50 hover:text-[#0056b3] dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-cyan-400/50 dark:hover:text-cyan-300"
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
            <div>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {t('footer.quickLinks')}
              </h3>
              <ul className="space-y-3 text-lg">
                <li>
                  <Link className="text-slate-700 hover:text-[#0056b3] dark:text-slate-200 dark:hover:text-cyan-300" to="/">
                    {t('nav.home')}
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-slate-700 hover:text-[#0056b3] dark:text-slate-200 dark:hover:text-cyan-300"
                    to="/features"
                  >
                    {t('nav.features')}
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-slate-700 hover:text-[#0056b3] dark:text-slate-200 dark:hover:text-cyan-300"
                    to="/timeline"
                  >
                    {t('nav.timeline')}
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-slate-700 hover:text-[#0056b3] dark:text-slate-200 dark:hover:text-cyan-300"
                    to="/faq"
                  >
                    {t('nav.faq')}
                  </Link>
                </li>
                <li>
                  <a
                    className="text-slate-700 hover:text-[#0056b3] dark:text-slate-200 dark:hover:text-cyan-300"
                    href="#contact"
                  >
                    {t('footer.contact')}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {t('footer.resources')}
              </h3>
              <ul className="space-y-3 text-lg">
                <li>
                  <a
                    className="text-slate-700 hover:text-[#0056b3] dark:text-slate-200 dark:hover:text-cyan-300"
                    href="https://eci.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('footer.eci')}
                  </a>
                </li>
                <li>
                  <a
                    className="text-slate-700 hover:text-[#0056b3] dark:text-slate-200 dark:hover:text-cyan-300"
                    href="https://eci.gov.in/voter/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('footer.guidelines')}
                  </a>
                </li>
                <li>
                  <Link
                    className="text-slate-700 hover:text-[#0056b3] dark:text-slate-200 dark:hover:text-cyan-300"
                    to="/privacy"
                  >
                    {t('footer.privacy')}
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-slate-700 hover:text-[#0056b3] dark:text-slate-200 dark:hover:text-cyan-300"
                    to="/terms"
                  >
                    {t('footer.terms')}
                  </Link>
                </li>
              </ul>
            </div>

            <div id="contact">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {t('footer.contact')}
              </h3>
              <ul className="space-y-4 text-lg text-slate-700 dark:text-slate-200">
                <li>
                  <span className="block text-sm font-semibold text-slate-500 dark:text-slate-400">
                    {t('footer.emailLabel')}
                  </span>
                  <a className="hover:text-[#0056b3] dark:hover:text-cyan-300" href="mailto:support@dashvote.in">
                    support@dashvote.in
                  </a>
                </li>
                <li>
                  <span className="block text-sm font-semibold text-slate-500 dark:text-slate-400">
                    {t('footer.phoneLabel')}
                  </span>
                  <a className="hover:text-[#0056b3] dark:hover:text-cyan-300" href="tel:+911800111111">
                    1800-XXX-XXXX
                  </a>
                </li>
                <li>
                  <span className="block text-sm font-semibold text-slate-500 dark:text-slate-400">
                    {t('footer.locationLabel')}
                  </span>
                  <span>{t('footer.locationValue')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-600" />

        <div className="flex flex-col gap-4 text-center md:flex-row md:items-center md:justify-between">
          <p className="text-base text-slate-500 dark:text-slate-400">{t('footer.disclaimer')}</p>
          <p className="text-base text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} {t('app.title')}. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}
