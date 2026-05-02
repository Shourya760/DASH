import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HiCheckCircle, HiMinusCircle, HiSparkles } from 'react-icons/hi'
import { Button } from '../components/ui/Button.jsx'
import { SimplePageLayout } from '../layouts/SimplePageLayout.jsx'
import { playVoteBeep } from '../utils/beep.js'

const parties = [
  { id: 'p1', Icon: HiSparkles, name: { en: 'Sample Party A', hi: 'नमूना दल A' } },
  { id: 'p2', Icon: HiCheckCircle, name: { en: 'Sample Party B', hi: 'नमूना दल B' } },
  { id: 'p3', Icon: HiSparkles, name: { en: 'Sample Party C', hi: 'नमूना दल C' } },
  { id: 'nota', Icon: HiMinusCircle, name: { en: 'NOTA', hi: 'NOTA' } },
]

const optionBase =
  'flex min-h-[72px] items-center gap-4 rounded-2xl border px-4 text-left text-lg font-bold shadow-sm transition-colors duration-200 md:min-h-[88px] md:text-xl'
const optionUnselected =
  'border-slate-300 bg-white text-slate-900 hover:border-blue-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:border-cyan-400'
const optionSelected =
  'border-orange-400 bg-orange-50 text-orange-950 dark:border-orange-300/60 dark:bg-orange-500/15 dark:text-orange-100'

export function PracticeVoting() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'hi' ? 'hi' : 'en'
  const [selected, setSelected] = useState(null)
  const [phase, setPhase] = useState('pick')

  function confirmVote() {
    if (!selected) return
    playVoteBeep()
    setPhase('done')
  }

  function reset() {
    setSelected(null)
    setPhase('pick')
  }

  return (
    <SimplePageLayout>
      <h1 className="mb-4 text-3xl font-extrabold text-slate-950 dark:text-white md:text-4xl">
        {t('practice.title')}
      </h1>
      <p className="mb-8 text-xl font-medium text-slate-600 dark:text-slate-300 md:text-2xl">
        {t('practice.sub')}
      </p>

      <div className="rounded-2xl border border-slate-300 bg-slate-100 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-950 md:p-8">
        <div className="mb-6 rounded-xl bg-slate-900 px-4 py-3 text-center text-lg font-bold text-amber-300 ring-1 ring-white/10 md:text-xl">
          {lang === 'hi' ? 'डेमो ईवीएम' : 'DEMO EVM'}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {parties.map((p) => {
            const Icon = p.Icon
            return (
              <motion.button
                key={p.id}
                type="button"
                whileTap={{ scale: 0.97 }}
                disabled={phase === 'done'}
                onClick={() => {
                  setSelected(p)
                  setPhase('confirm')
                }}
                className={[
                  optionBase,
                  selected?.id === p.id ? optionSelected : optionUnselected,
                  phase === 'done' ? 'opacity-90' : '',
                ].join(' ')}
              >
                <Icon
                  className={`h-8 w-8 shrink-0 ${
                    selected?.id === p.id
                      ? 'text-orange-700 dark:text-orange-200'
                      : 'text-blue-700 dark:text-cyan-300'
                  }`}
                  aria-hidden
                />
                <span>{p.name[lang]}</span>
              </motion.button>
            )
          })}
        </div>

        {phase === 'confirm' && selected ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex flex-col gap-4 rounded-2xl border border-blue-200 bg-white p-6 shadow-sm dark:border-cyan-400/25 dark:bg-slate-900"
          >
            <p className="text-xl font-semibold text-slate-800 dark:text-slate-100">
              {lang === 'hi' ? 'पुष्टि करें: ' : 'Confirm: '}
              <span className="text-blue-800 dark:text-cyan-300">{selected.name[lang]}</span>
            </p>
            <div className="flex flex-wrap gap-3">
              <Button type="button" onClick={confirmVote}>
                {t('practice.cast')}
              </Button>
              <Button type="button" variant="outline" onClick={() => setPhase('pick')}>
                {lang === 'hi' ? 'वापस' : 'Back'}
              </Button>
            </div>
          </motion.div>
        ) : null}

        <AnimatePresence>
          {phase === 'done' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8 rounded-2xl border border-emerald-300 bg-emerald-50 p-8 text-center dark:border-emerald-400/35 dark:bg-emerald-500/10"
            >
              <p className="flex items-center justify-center gap-2 text-2xl font-extrabold text-emerald-800 dark:text-emerald-200 md:text-3xl">
                <HiCheckCircle className="h-8 w-8" aria-hidden />
                {t('practice.success')}
              </p>
              <Button type="button" variant="green" className="mt-6" onClick={reset}>
                {t('practice.reset')}
              </Button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </SimplePageLayout>
  )
}

