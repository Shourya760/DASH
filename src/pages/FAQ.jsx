import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { SimplePageLayout } from '../layouts/SimplePageLayout.jsx'
import { Button } from '../components/ui/Button.jsx'
import { InputField } from '../components/ui/InputField.jsx'
import { findFaqReply } from '../utils/faqReplies.js'
import { speakText } from '../hooks/useSpeech.js'

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
      text:
        lang === 'hi'
          ? 'नमस्ते! नीचे एक प्रश्न चुनें या लिखें।'
          : 'Hi! Pick a question below or type your own.',
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
      <h1 className="mb-4 text-3xl font-extrabold text-blue-950 md:text-4xl">{t('faq.title')}</h1>
      <p className="mb-6 text-xl text-slate-700 md:text-2xl">{t('faq.sub')}</p>

      <div className="mb-4 flex flex-wrap gap-2">
        {quickQuestions.map((q) => (
          <button
            key={q.key}
            type="button"
            onClick={() => handleQuick(q.key)}
            className="rounded-2xl border-2 border-blue-200 bg-blue-50 px-4 py-3 text-left text-base font-semibold text-blue-900 hover:bg-blue-100 md:text-lg"
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
            {listening ? '…' : ''} {t('faq.voiceListen')}
          </Button>
        ) : (
          <p className="rounded-xl bg-slate-100 px-4 py-3 text-base text-slate-600">
            {lang === 'hi'
              ? 'आपका ब्राउज़र आवाज़ पहचान को सपोर्ट नहीं कर सकता।'
              : 'Your browser may not support speech recognition.'}
          </p>
        )}
        <Button type="button" variant="green" onClick={readLastBot} className="!min-h-[48px]">
          {t('faq.voiceSpeak')}
        </Button>
      </div>

      <div
        className="mb-6 max-h-[420px] space-y-3 overflow-y-auto rounded-3xl border-2 border-slate-200 bg-slate-50 p-4 md:max-h-[520px] md:p-6"
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
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-lg shadow md:max-w-[75%] md:text-xl ${
                  m.role === 'user'
                    ? 'bg-blue-700 text-white'
                    : 'border-2 border-slate-200 bg-white text-slate-900'
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
