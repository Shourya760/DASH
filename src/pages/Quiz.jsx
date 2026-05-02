import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { SimplePageLayout } from '../layouts/SimplePageLayout.jsx'
import { Button } from '../components/ui/Button.jsx'
import { quizQuestions } from '../utils/quizData.js'

export function Quiz() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'hi' ? 'hi' : 'en'
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [picked, setPicked] = useState(null)
  const [finished, setFinished] = useState(false)

  const q = quizQuestions[index]
  const total = quizQuestions.length
  const progress = finished
    ? 100
    : (index / total) * 100 + (picked ? (1 / total) * 100 : 0)

  function choose(key) {
    if (picked) return
    setPicked(key)
    if (key === q.correct) setScore((s) => s + 1)
  }

  function next() {
    if (index + 1 >= total) {
      setFinished(true)
      return
    }
    setIndex((i) => i + 1)
    setPicked(null)
  }

  function restart() {
    setIndex(0)
    setScore(0)
    setPicked(null)
    setFinished(false)
  }

  if (finished) {
    return (
      <SimplePageLayout>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl border-2 border-blue-200 bg-white p-10 text-center shadow-xl dark:border-slate-700 dark:bg-slate-900"
        >
          <h1 className="text-3xl font-extrabold text-blue-950 dark:text-white md:text-4xl">{t('quiz.score')}</h1>
          <p className="mt-6 text-5xl font-black text-orange-600">
            {score}/{total}
          </p>
          <Button className="mt-10" onClick={restart}>
            {t('quiz.restart')}
          </Button>
        </motion.div>
      </SimplePageLayout>
    )
  }

  return (
    <SimplePageLayout>
      <h1 className="mb-4 text-3xl font-extrabold text-blue-950 dark:text-white md:text-4xl">{t('quiz.title')}</h1>
      <p className="mb-6 text-xl text-slate-700 dark:text-slate-300 md:text-2xl">{t('quiz.sub')}</p>

      <div className="mb-6 h-4 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-green-600"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      <motion.div
        key={q.id}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-900 md:p-8"
      >
        <p className="mb-2 text-sm font-bold text-slate-500 dark:text-slate-400">
          {index + 1}/{total}
        </p>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">{q.question[lang]}</h2>

        <div className="mt-8 flex flex-col gap-4">
          {q.options.map((opt) => {
            const wrong = picked && picked !== q.correct && picked === opt.key
            const right = picked && q.correct === opt.key
            return (
              <button
                key={opt.key}
                type="button"
                disabled={Boolean(picked)}
                onClick={() => choose(opt.key)}
                className={`min-h-[56px] rounded-2xl border-2 px-4 text-left text-lg font-semibold transition md:min-h-[64px] md:text-xl ${
                  right
                    ? 'border-green-600 bg-green-50 text-green-900 dark:border-green-400 dark:bg-green-500/20 dark:text-green-100'
                    : wrong
                      ? 'border-red-500 bg-red-50 text-red-900 dark:border-red-400 dark:bg-red-500/20 dark:text-red-100'
                      : 'border-slate-300 bg-slate-50 text-slate-900 hover:border-blue-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-cyan-400 dark:hover:bg-slate-700'
                }`}
              >
                {opt[lang]}
              </button>
            )
          })}
        </div>

        <div className="mt-8 flex justify-end">
          <Button type="button" disabled={!picked} onClick={next}>
            {index + 1 >= total ? t('quiz.finish') : t('quiz.next')}
          </Button>
        </div>
      </motion.div>
    </SimplePageLayout>
  )
}
