import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { SimplePageLayout } from '../layouts/SimplePageLayout.jsx'
import { InputField } from '../components/ui/InputField.jsx'
import { Button } from '../components/ui/Button.jsx'
import { findPollingBooth } from '../services/proxyData.js'

export function PollingBooth() {
  const { t } = useTranslation()
  const [epic, setEpic] = useState('')
  const [result, setResult] = useState(null)
  const [searching, setSearching] = useState(false)

  async function handleSearch(e) {
    e.preventDefault()
    setSearching(true)
    const booth = await findPollingBooth(epic)
    setResult(booth)
    setSearching(false)
  }

  return (
    <SimplePageLayout>
      <section className="mb-8">
        <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.24em] text-emerald-700 dark:text-emerald-300">
          {t('booth.kicker')}
        </p>
        <h1 className="text-3xl font-extrabold text-slate-950 dark:text-white md:text-4xl">
          {t('booth.title')}
        </h1>
        <p className="mt-4 text-xl font-medium leading-relaxed text-slate-600 dark:text-slate-300 md:text-2xl">
          {t('booth.sub')}
        </p>
      </section>

      <form
        onSubmit={handleSearch}
        className="mb-8 flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:shadow-[0_18px_44px_-24px_rgba(0,0,0,0.9)]"
      >
        <InputField
          id="epic"
          label={t('booth.epic')}
          value={epic}
          onChange={(e) => setEpic(e.target.value)}
          placeholder="ABC1234567"
        />
        <Button type="submit" variant="green" disabled={searching}>
          {searching ? t('common.loading') : t('booth.search')}
        </Button>
      </form>

      {result ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-lg text-slate-800 shadow-sm dark:border-emerald-400/30 dark:bg-emerald-500/10 dark:text-slate-100 md:text-xl"
        >
          <p className="font-extrabold text-emerald-950 dark:text-emerald-100">{result.boothName}</p>
          <p className="mt-2 text-slate-700 dark:text-slate-300">{result.address}</p>
          <p className="mt-2 text-slate-700 dark:text-slate-300">
            {result.ward} - {result.room}
          </p>
          <p className="mt-2 text-slate-700 dark:text-slate-300">{result.pollingDate}</p>
          <p className="mt-2 font-semibold text-emerald-900 dark:text-emerald-200">{result.officerHelpdesk}</p>
        </motion.div>
      ) : null}
    </SimplePageLayout>
  )
}
