import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { SimplePageLayout } from '../layouts/SimplePageLayout.jsx'

const docList = [
  { en: 'Voter ID card', hi: 'मतदाता पहचान पत्र' },
  { en: 'Aadhaar (where permitted)', hi: 'आधार (जहाँ अनुमति हो)' },
  { en: 'Passport', hi: 'पासपोर्ट' },
  { en: 'Driving licence', hi: 'ड्राइविंग लाइसेंस' },
  { en: 'Tax ID card (where accepted)', hi: 'टैक्स आईडी कार्ड (जहाँ मान्य हो)' },
  { en: 'Service ID cards (for officials as per rules)', hi: 'सेवा पहचान पत्र (नियमों अनुसार)' },
]

export function Documents() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'hi' ? 'hi' : 'en'

  return (
    <SimplePageLayout>
      <h1 className="mb-4 text-3xl font-extrabold text-blue-950 md:text-4xl">{t('documents.title')}</h1>
      <p className="mb-8 text-xl text-slate-700 md:text-2xl">{t('documents.sub')}</p>

      <ul className="space-y-4">
        {docList.map((item, i) => (
          <motion.li
            key={item.en}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="flex items-start gap-4 rounded-2xl border-2 border-green-100 bg-white p-5 shadow-md"
          >
            <span className="text-2xl" aria-hidden>
              ✓
            </span>
            <span className="text-xl font-semibold text-slate-900 md:text-2xl">{item[lang]}</span>
          </motion.li>
        ))}
      </ul>
    </SimplePageLayout>
  )
}
