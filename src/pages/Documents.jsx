import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { HiCheckCircle } from 'react-icons/hi'
import { SimplePageLayout } from '../layouts/SimplePageLayout.jsx'

const docList = [
  { en: 'Voter ID card', hi: 'मतदाता पहचान पत्र' },
  { en: 'Aadhaar (where permitted)', hi: 'आधार (जहां अनुमति हो)' },
  { en: 'Passport', hi: 'पासपोर्ट' },
  { en: 'Driving licence', hi: 'ड्राइविंग लाइसेंस' },
  { en: 'Tax ID card (where accepted)', hi: 'टैक्स आईडी कार्ड (जहां मान्य हो)' },
  { en: 'Service ID cards (for officials as per rules)', hi: 'सेवा पहचान पत्र (नियमों के अनुसार)' },
]

export function Documents() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'hi' ? 'hi' : 'en'

  return (
    <SimplePageLayout>
      <h1 className="mb-4 text-3xl font-extrabold text-slate-950 dark:text-white md:text-4xl">
        {t('documents.title')}
      </h1>
      <p className="mb-8 text-xl font-medium text-slate-600 dark:text-slate-300 md:text-2xl">
        {t('documents.sub')}
      </p>

      <ul className="space-y-4">
        {docList.map((item, i) => (
          <motion.li
            key={item.en}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="flex items-start gap-4 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm dark:border-emerald-400/25 dark:bg-slate-900"
          >
            <HiCheckCircle
              className="mt-0.5 h-7 w-7 shrink-0 text-emerald-700 dark:text-emerald-300"
              aria-hidden
            />
            <span className="text-xl font-semibold text-slate-900 dark:text-slate-100 md:text-2xl">
              {item[lang]}
            </span>
          </motion.li>
        ))}
      </ul>
    </SimplePageLayout>
  )
}

