import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { SimplePageLayout } from '../layouts/SimplePageLayout.jsx'
import { timelineEvents, DEMO_POLL_DATE } from '../utils/timelineData.js'
import { useCountdown } from '../hooks/useCountdown.js'

export function Timeline() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'hi' ? 'hi' : 'en'
  const { days, hours, minutes, seconds } = useCountdown(DEMO_POLL_DATE)

  return (
    <SimplePageLayout>
      <h1 className="mb-4 text-3xl font-extrabold text-blue-950 md:text-4xl">{t('timeline.title')}</h1>
      <p className="mb-8 text-xl text-slate-700 md:text-2xl">{t('timeline.sub')}</p>

      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-12 grid grid-cols-2 gap-3 rounded-3xl border-2 border-blue-200 bg-gradient-to-br from-blue-700 to-blue-900 p-6 text-white shadow-xl sm:grid-cols-4 md:gap-4 md:p-8"
      >
        <p className="col-span-full mb-2 text-center text-xl font-bold md:text-2xl">
          {t('timeline.countdown')}
        </p>
        <div className="rounded-2xl bg-white/15 px-3 py-4 text-center backdrop-blur">
          <div className="text-3xl font-black md:text-4xl">{days}</div>
          <div className="text-sm font-semibold opacity-90 md:text-base">{t('timeline.days')}</div>
        </div>
        <div className="rounded-2xl bg-white/15 px-3 py-4 text-center backdrop-blur">
          <div className="text-3xl font-black md:text-4xl">{hours}</div>
          <div className="text-sm font-semibold opacity-90 md:text-base">{t('timeline.hours')}</div>
        </div>
        <div className="rounded-2xl bg-white/15 px-3 py-4 text-center backdrop-blur">
          <div className="text-3xl font-black md:text-4xl">{minutes}</div>
          <div className="text-sm font-semibold opacity-90 md:text-base">{t('timeline.mins')}</div>
        </div>
        <div className="rounded-2xl bg-white/15 px-3 py-4 text-center backdrop-blur">
          <div className="text-3xl font-black md:text-4xl">{seconds}</div>
          <div className="text-sm font-semibold opacity-90 md:text-base">{t('timeline.secs')}</div>
        </div>
      </motion.section>

      <div className="relative space-y-8 before:absolute before:left-4 before:top-2 before:h-[calc(100%-2rem)] before:w-1 before:bg-gradient-to-b before:from-orange-400 before:to-green-600 md:before:left-6">
        {timelineEvents.map((ev, i) => (
          <motion.article
            key={ev.id}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="relative ms-12 rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-md md:ms-16 md:p-8"
          >
            <span className="absolute -start-[44px] top-8 flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-lg font-bold text-white shadow md:-start-[52px] md:h-12 md:w-12">
              {i + 1}
            </span>
            <p className="text-lg font-bold text-blue-800 md:text-xl">{ev.date}</p>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-900 md:text-3xl">
              {ev.title[lang]}
            </h2>
            <p className="mt-2 text-lg text-slate-600 md:text-xl">{ev.desc[lang]}</p>
          </motion.article>
        ))}
      </div>
    </SimplePageLayout>
  )
}
