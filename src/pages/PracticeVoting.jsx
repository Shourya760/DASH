import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { SimplePageLayout } from '../layouts/SimplePageLayout.jsx'
import { Button } from '../components/ui/Button.jsx'
import { playVoteBeep } from '../utils/beep.js'

/** Fictional party names for demo only */
const parties = [
  { id: 'p1', symbol: '🌾', name: { en: 'Sample Party A', hi: 'नमूना दल A' } },
  { id: 'p2', symbol: '🌟', name: { en: 'Sample Party B', hi: 'नमूना दल B' } },
  { id: 'p3', symbol: '🕊️', name: { en: 'Sample Party C', hi: 'नमूना दल C' } },
  { id: 'nota', symbol: '✖️', name: { en: 'NOTA', hi: 'NOTA' } },
]

// Color classes for high visibility on white and dark backgrounds
const optionBase =
  'flex min-h-[72px] items-center gap-4 rounded-2xl border-2 px-4 text-left text-lg font-bold shadow-md md:min-h-[88px] md:text-xl transition-colors duration-200'
const optionUnselected =
  'border-slate-300 bg-white hover:border-blue-400 text-blue-900 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:hover:border-blue-400'
const optionSelected =
  'border-orange-500 bg-orange-100 text-orange-950 dark:bg-orange-700/35 dark:border-orange-300 dark:text-orange-100'
const optionDisabled = 'opacity-90'

export function PracticeVoting() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'hi' ? 'hi' : 'en'
  const [selected, setSelected] = useState(null)
  const [phase, setPhase] = useState('pick') // pick | confirm | done

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
      <h1 className="mb-4 text-3xl font-extrabold text-blue-950 dark:text-white md:text-4xl">
        {t('practice.title')}
      </h1>
      <p className="mb-8 text-xl text-slate-700 dark:text-slate-200 md:text-2xl">{t('practice.sub')}</p>

      <div className="rounded-3xl border-4 border-slate-800 bg-slate-100 p-4 shadow-2xl md:p-8 dark:bg-slate-900">
        <div className="mb-6 rounded-2xl bg-slate-900 px-4 py-3 text-center text-lg font-bold text-amber-300 md:text-xl">
          {lang === 'hi' ? 'डेमो ईवीएम' : 'DEMO EVM'}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {parties.map((p) => (
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
                phase === 'done' ? optionDisabled : '',
              ].join(' ')}
            >
              <span
                className={`text-3xl ${
                  selected?.id === p.id
                    ? 'text-orange-700 dark:text-orange-100'
                    : 'text-blue-700 dark:text-blue-200'
                }`}
              >
                {p.symbol}
              </span>
              <span
                className={`${
                  selected?.id === p.id
                    ? 'text-orange-900 dark:text-orange-50'
                    : 'text-blue-900 dark:text-white'
                }`}
              >
                {p.name[lang]}
              </span>
            </motion.button>
          ))}
        </div>

        {phase === 'confirm' && selected ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex flex-col gap-4 rounded-2xl border-2 border-blue-300 bg-white p-6 dark:bg-slate-800 dark:border-blue-600"
          >
            <p className="text-xl font-semibold text-slate-800 dark:text-slate-100">
              {lang === 'hi' ? 'पुष्टि करें: ' : 'Confirm: '}
              <span className="text-blue-800 dark:text-cyan-300">
                {selected.symbol} {selected.name[lang]}
              </span>
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
              className="mt-8 rounded-2xl border-2 border-green-600 bg-green-50 p-8 text-center dark:bg-green-900/20 dark:border-green-400"
            >
              <p className="text-2xl font-extrabold text-green-800 md:text-3xl dark:text-green-300">
                ✓ {t('practice.success')}
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
