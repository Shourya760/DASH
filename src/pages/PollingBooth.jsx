import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { SimplePageLayout } from '../layouts/SimplePageLayout.jsx'
import { InputField } from '../components/ui/InputField.jsx'
import { Button } from '../components/ui/Button.jsx'

export function PollingBooth() {
  const { t } = useTranslation()
  const [epic, setEpic] = useState('')
  const [showResult, setShowResult] = useState(false)

  function handleSearch(e) {
    e.preventDefault()
    setShowResult(true)
  }

  return (
    <SimplePageLayout>
      <h1 className="mb-4 text-3xl font-extrabold text-blue-950 md:text-4xl">{t('booth.title')}</h1>
      <p className="mb-8 text-xl text-slate-700 md:text-2xl">{t('booth.sub')}</p>

      <form onSubmit={handleSearch} className="mb-8 flex flex-col gap-6 rounded-3xl border-2 border-blue-100 bg-white p-6 shadow-lg">
        <InputField
          id="epic"
          label={t('booth.epic')}
          value={epic}
          onChange={(e) => setEpic(e.target.value)}
          placeholder="ABC1234567"
        />
        <Button type="submit" variant="green">
          {t('booth.search')}
        </Button>
      </form>

      {showResult ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border-2 border-orange-200 bg-orange-50 p-6 text-lg text-slate-800 md:text-xl"
        >
          {t('booth.result')}
        </motion.div>
      ) : null}
    </SimplePageLayout>
  )
}
