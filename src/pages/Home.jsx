import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  FaVoteYea,
  FaCalendarAlt,
  FaQuestionCircle,
  FaGamepad,
  FaClipboardList,
  FaMapMarkerAlt,
  FaBookOpen,
  FaLanguage,
  FaHandsHelping,
  FaLaptopCode,
} from 'react-icons/fa'
import { FeatureCard } from '../components/FeatureCard.jsx'
import { Button } from '../components/ui/Button.jsx'
import { useCountUp } from '../hooks/useCountUp.js'

function Stat({ label, value, suffix = '', active }) {
  const n = useCountUp(value, { duration: 2400, active })
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-3xl border-2 border-slate-200 bg-white p-6 text-center shadow-md dark:border-slate-700 dark:bg-slate-900 md:p-8"
    >
      <p className="text-4xl font-black tabular-nums text-[#0056b3] dark:text-cyan-400 md:text-5xl">
        {n.toLocaleString()}
        {suffix}
      </p>
      <p className="mt-2 text-lg font-semibold text-slate-600 dark:text-slate-300 md:text-xl">{label}</p>
    </motion.div>
  )
}

export function Home() {
  const { t } = useTranslation()
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-100px' })

  const titleWords = t('hero.headline').split(' ')

  const whyItems = [
    { icon: FaBookOpen, key: 'w1' },
    { icon: FaLanguage, key: 'w2' },
    { icon: FaHandsHelping, key: 'w3' },
    { icon: FaLaptopCode, key: 'w4' },
  ]

  const showcase = [
    { to: '/how-to-vote', icon: FaVoteYea, titleKey: 'home.showcase.guide', descKey: 'home.showcase.guideDesc', color: 'text-blue-600 dark:text-cyan-400' },
    { to: '/faq', icon: FaQuestionCircle, titleKey: 'home.showcase.faq', descKey: 'home.showcase.faqDesc', color: 'text-orange-600 dark:text-orange-400' },
    { to: '/practice-voting', icon: FaGamepad, titleKey: 'home.showcase.evm', descKey: 'home.showcase.evmDesc', color: 'text-green-600 dark:text-green-400' },
    { to: '/quiz', icon: FaClipboardList, titleKey: 'home.showcase.quiz', descKey: 'home.showcase.quizDesc', color: 'text-violet-600 dark:text-violet-400' },
    { to: '/timeline', icon: FaCalendarAlt, titleKey: 'home.showcase.timeline', descKey: 'home.showcase.timelineDesc', color: 'text-cyan-600 dark:text-cyan-300' },
    { to: '/polling-booth', icon: FaMapMarkerAlt, titleKey: 'home.showcase.booth', descKey: 'home.showcase.boothDesc', color: 'text-rose-600 dark:text-rose-400' },
  ]

  const testimonials = [
    { quoteKey: 'home.testimonial1', nameKey: 'home.testimonial1Name', roleKey: 'home.testimonial1Role' },
    { quoteKey: 'home.testimonial2', nameKey: 'home.testimonial2Name', roleKey: 'home.testimonial2Role' },
    { quoteKey: 'home.testimonial3', nameKey: 'home.testimonial3Name', roleKey: 'home.testimonial3Role' },
  ]

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-orange-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-gradient-to-br from-[#0056b3]/25 to-[#00bcd4]/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-10 h-64 w-64 rounded-full bg-orange-300/30 blur-3xl dark:bg-orange-500/10" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/10 blur-3xl dark:bg-blue-500/5" />

        <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-4 py-16 md:flex-row md:items-center md:px-6 md:py-24">
          <div className="flex-1 space-y-8">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-base font-semibold text-[#0056b3] shadow-sm backdrop-blur dark:border-slate-600 dark:bg-slate-800/80 dark:text-cyan-400 md:text-lg"
            >
              <span aria-hidden>🇮🇳</span>
              {t('app.tagline')}
            </motion.p>

            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 dark:text-white md:text-6xl lg:text-7xl">
              {titleWords.map((word, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, type: 'spring', stiffness: 120, damping: 18 }}
                  className="inline-block pr-2"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="max-w-xl text-xl leading-relaxed text-slate-600 dark:text-slate-300 md:text-2xl"
            >
              {t('hero.sub')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/signup">
                <Button className="!min-h-[58px] !bg-gradient-to-r !from-[#0056b3] !to-[#0891b2] !px-8 !text-xl !text-white shadow-xl hover:opacity-95">
                  {t('hero.ctaPrimary')}
                </Button>
              </Link>
              <Link to="/how-to-vote">
                <Button variant="outline" className="!min-h-[58px] !border-2 !px-8 !text-xl dark:!border-cyan-500/40 dark:!bg-slate-800 dark:!text-white dark:hover:!bg-slate-700">
                  {t('hero.ctaSecondary')}
                </Button>
              </Link>
            </motion.div>

            <p className="text-lg text-slate-500 dark:text-slate-400">{t('access.largeText')}</p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, type: 'spring', stiffness: 90, damping: 16 }}
            className="grid flex-1 grid-cols-2 gap-4 md:max-w-xl md:gap-5"
          >
            {[
              { Icon: FaVoteYea, label: t('feature.howToVote'), border: 'border-blue-200 dark:border-blue-500/30', bg: 'bg-white dark:bg-slate-800/80', icon: 'text-blue-600 dark:text-cyan-400' },
              { Icon: FaCalendarAlt, label: t('feature.timeline'), border: 'border-orange-200 dark:border-orange-500/30', bg: 'bg-white dark:bg-slate-800/80', icon: 'text-orange-600 dark:text-orange-400' },
              { Icon: FaQuestionCircle, label: t('feature.faq'), border: 'border-green-200 dark:border-green-500/30', bg: 'bg-white dark:bg-slate-800/80', icon: 'text-green-600 dark:text-green-400' },
              { Icon: FaGamepad, label: t('feature.practice'), border: 'border-cyan-200 dark:border-cyan-500/30', bg: 'bg-white dark:bg-slate-800/80', icon: 'text-cyan-600 dark:text-cyan-300' },
            ].map(({ Icon, label, border, bg, icon }, idx) => (
              <motion.div
                key={label}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`flex min-h-[140px] flex-col items-center justify-center rounded-3xl border-2 ${border} ${bg} p-5 shadow-lg md:min-h-[160px]`}
              >
                <Icon className={`text-5xl ${icon}`} aria-hidden />
                <span className="mt-3 text-center text-base font-bold text-slate-800 dark:text-slate-100 md:text-lg">
                  {label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center text-3xl font-extrabold text-slate-900 dark:text-white md:text-4xl"
        >
          {t('home.whyTitle')}
        </motion.h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyItems.map(({ icon: Icon, key }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-md transition-shadow hover:shadow-xl dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0056b3]/15 to-[#00bcd4]/15 text-[#0056b3] dark:from-cyan-500/20 dark:to-blue-500/10 dark:text-cyan-400">
                <Icon className="text-2xl" aria-hidden />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white md:text-2xl">{t(`home.why.${key}.title`)}</h3>
              <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">{t(`home.why.${key}.desc`)}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-16 dark:border-slate-800 dark:bg-slate-900/50 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center text-3xl font-extrabold text-slate-900 dark:text-white md:text-4xl"
          >
            {t('home.showcaseTitle')}
          </motion.h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {showcase.map((item, i) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -6 }}
                className="h-full"
              >
                <Link
                  to={item.to}
                  className="flex h-full min-h-[180px] flex-col gap-3 rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-md transition hover:border-[#0056b3]/40 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900 dark:hover:border-cyan-500/40"
                >
                  <item.icon className={`text-4xl ${item.color}`} aria-hidden />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white md:text-2xl">{t(item.titleKey)}</h3>
                  <p className="text-lg text-slate-600 dark:text-slate-300">{t(item.descKey)}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section ref={statsRef} className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <h2 className="mb-10 text-center text-3xl font-extrabold text-slate-900 dark:text-white md:text-4xl">
          {t('home.statsTitle')}
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-center text-lg text-slate-600 dark:text-slate-300 md:text-xl">
          {t('home.statsSub')}
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          <Stat label={t('home.statUsers')} value={12847} active={statsInView} suffix="+" />
          <Stat label={t('home.statElections')} value={24} active={statsInView} suffix="+" />
          <Stat label={t('home.statFaqs')} value={5600} active={statsInView} suffix="+" />
        </div>
      </section>

      <section className="bg-gradient-to-b from-white to-slate-50 py-16 dark:from-slate-950 dark:to-slate-900 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="mb-10 text-center text-3xl font-extrabold text-slate-900 dark:text-white md:text-4xl">
            {t('home.testimonialsTitle')}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((item, i) => (
              <motion.blockquote
                key={item.nameKey}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-900 md:p-8"
              >
                <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-200 md:text-xl">“{t(item.quoteKey)}”</p>
                <footer className="mt-6 border-t border-slate-200 pt-4 dark:border-slate-600">
                  <p className="font-bold text-slate-900 dark:text-white">{t(item.nameKey)}</p>
                  <p className="text-base text-slate-500 dark:text-slate-400">{t(item.roleKey)}</p>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <h2 className="mb-10 text-center text-3xl font-extrabold text-slate-900 dark:text-white md:text-4xl">
          {t('features.sectionTitle')}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            to="/how-to-vote"
            icon="🗳️"
            title={t('feature.howToVote')}
            description={t('feature.howToVoteDesc')}
            delay={0}
          />
          <FeatureCard
            to="/timeline"
            icon="🕒"
            title={t('feature.timeline')}
            description={t('feature.timelineDesc')}
            delay={0.05}
          />
          <FeatureCard
            to="/faq"
            icon="❓"
            title={t('feature.faq')}
            description={t('feature.faqDesc')}
            delay={0.1}
          />
          <FeatureCard
            to="/practice-voting"
            icon="🎮"
            title={t('feature.practice')}
            description={t('feature.practiceDesc')}
            delay={0.15}
          />
        </div>
      </section>
    </div>
  )
}
