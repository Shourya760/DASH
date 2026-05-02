import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { Button } from '../components/ui/Button.jsx'
import { InputField } from '../components/ui/InputField.jsx'
import { SimplePageLayout } from '../layouts/SimplePageLayout.jsx'
import { speakText } from '../hooks/useSpeech.js'
import { findFaqReply } from '../utils/faqReplies.js'

const quickQuestions = [
  { key: 'q1', en: 'How to register?', hi: 'पंजीकरण कैसे करें?' },
  { key: 'q2', en: 'What ID is needed?', hi: 'कौन सा आईडी चाहिए?' },
  { key: 'q3', en: 'What is NOTA?', hi: 'NOTA क्या है?' },
  { key: 'q4', en: 'How does EVM work?', hi: 'EVM कैसे काम करती है?' },
]

function mapQuickToText(key, lang) {
  const map = {
    q1: lang === 'hi' ? 'पंजीकरण कैसे करें' : 'How to register',
    q2: lang === 'hi' ? 'कौन सा आईडी चाहिए' : 'What ID is needed',
    q3: 'NOTA',
    q4: lang === 'hi' ? 'EVM कैसे काम करती है' : 'How does EVM work',
  }
  return map[key] || ''
}

export function FAQ() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'hi' ? 'hi' : 'en'
  const [messages, setMessages] = useState(() => [
    {
      role: 'bot',
      text: lang === 'hi' ? 'नमस्ते! नीचे एक प्रश्न चुनें या लिखें।' : 'Hi! Pick a question below or type your own.',
    },
  ])
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const pushPair = useCallback(
    (userText) => {
      const reply = findFaqReply(userText, lang)
      setMessages((m) => [...m, { role: 'user', text: userText }, { role: 'bot', text: reply }])
    },
    [lang],
  )

  function handleSend(e) {
    e.preventDefault()
    const q = input.trim()
    if (!q) return
    pushPair(q)
    setInput('')
  }

  function handleQuick(key) {
    pushPair(mapQuickToText(key, lang))
  }

  function toggleListen() {
    if (listening) {
      SpeechRecognition.stopListening()
      return
    }
    resetTranscript()
    SpeechRecognition.startListening({
      language: lang === 'hi' ? 'hi-IN' : 'en-IN',
    })
  }

  useEffect(() => {
    if (!listening && transcript) {
      setInput(transcript)
      resetTranscript()
    }
  }, [listening, transcript, resetTranscript])

  function readLastBot() {
    const last = [...messages].reverse().find((m) => m.role === 'bot')
    if (last) speakText(last.text, lang)
  }

  return (
    <SimplePageLayout>
      <h1 className="mb-4 text-3xl font-extrabold text-slate-950 dark:text-white md:text-4xl">
        {t('faq.title')}
      </h1>
      <p className="mb-6 text-xl font-medium text-slate-600 dark:text-slate-300 md:text-2xl">
        {t('faq.sub')}
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        {quickQuestions.map((q) => (
          <button
            key={q.key}
            type="button"
            onClick={() => handleQuick(q.key)}
            className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-left text-base font-semibold text-blue-900 transition hover:bg-blue-100 dark:border-cyan-400/25 dark:bg-cyan-500/10 dark:text-cyan-100 dark:hover:bg-cyan-500/15 md:text-lg"
          >
            {q[lang]}
          </button>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap gap-3">
        {browserSupportsSpeechRecognition ? (
          <Button
            type="button"
            variant={listening ? 'saffron' : 'outline'}
            onClick={toggleListen}
            className="!min-h-[48px]"
          >
            {listening ? '...' : ''} {t('faq.voiceListen')}
          </Button>
        ) : (
          <p className="rounded-xl bg-slate-100 px-4 py-3 text-base text-slate-600 dark:bg-slate-900 dark:text-slate-300">
            {lang === 'hi'
              ? 'आपका ब्राउज़र आवाज पहचान को सपोर्ट नहीं कर सकता।'
              : 'Your browser may not support speech recognition.'}
          </p>
        )}
        <Button type="button" variant="green" onClick={readLastBot} className="!min-h-[48px]">
          {t('faq.voiceSpeak')}
        </Button>
      </div>

      <div
        className="mb-6 max-h-[420px] space-y-3 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 md:max-h-[520px] md:p-6"
        role="log"
        aria-live="polite"
      >
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={`${i}-${m.text.slice(0, 12)}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-lg shadow-sm md:max-w-[75%] md:text-xl ${
                  m.role === 'user'
                    ? 'bg-blue-700 text-white dark:bg-cyan-700'
                    : 'border border-slate-200 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100'
                }`}
              >
                {m.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="flex flex-col gap-4 sm:flex-row">
        <InputField
          id="faq-input"
          label=""
          className="flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('faq.placeholder')}
          aria-label={t('faq.placeholder')}
        />
        <Button type="submit" className="sm:self-end">
          {t('faq.send')}
        </Button>
      </form>
    </SimplePageLayout>
  )
}

