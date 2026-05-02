import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  FaHandSparkles,
  FaIdCard,
  FaMapMarkedAlt,
  FaUserCheck,
  FaUserPlus,
  FaVoteYea,
} from 'react-icons/fa'
import { SimplePageLayout } from '../layouts/SimplePageLayout.jsx'

const icons = [FaUserPlus, FaIdCard, FaMapMarkedAlt, FaUserCheck, FaVoteYea, FaHandSparkles]

export function HowToVote() {
  const { t } = useTranslation()

  const steps = [
    { title: t('howToVote.step1'), desc: t('howToVote.step1d') },
    { title: t('howToVote.step2'), desc: t('howToVote.step2d') },
    { title: t('howToVote.step3'), desc: t('howToVote.step3d') },
    { title: t('howToVote.step4'), desc: t('howToVote.step4d') },
    { title: t('howToVote.step5'), desc: t('howToVote.step5d') },
    { title: t('howToVote.step6'), desc: t('howToVote.step6d') },
  ]

  return (
    <SimplePageLayout>
      <h1 className="mb-10 text-3xl font-extrabold text-slate-950 dark:text-white md:text-4xl">
        {t('howToVote.title')}
      </h1>

      <ol className="relative space-y-6 border-s-4 border-blue-200 ps-6 dark:border-cyan-500/30 md:space-y-8 md:ps-10">
        {steps.map((step, i) => {
          const Icon = icons[i]
          return (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="relative"
            >
              <span className="absolute -start-[34px] flex h-12 w-12 items-center justify-center rounded-xl bg-blue-700 text-white shadow-sm ring-4 ring-slate-50 dark:bg-cyan-600 dark:ring-slate-950 md:-start-[54px] md:h-14 md:w-14">
                <Icon className="text-2xl" aria-hidden />
              </span>
              <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 md:p-6">
                <p className="mb-1 text-sm font-bold uppercase tracking-wide text-orange-600 dark:text-orange-300">
                  {t('feature.howToVote')} - {i + 1}/6
                </p>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
                  {step.title}
                </h2>
                <p className="mt-2 text-lg text-slate-700 dark:text-slate-300 md:text-xl">
                  {step.desc}
                </p>
              </div>
            </motion.li>
          )
        })}
      </ol>
    </SimplePageLayout>
  )
}

