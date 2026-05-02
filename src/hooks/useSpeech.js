/**
 * Thin helpers for Web Speech API (TTS).
 * STT is handled in FAQ via react-speech-recognition where supported.
 */
export function speakText(text, lang = 'en-IN') {
  if (typeof window === 'undefined' || !window.speechSynthesis) return false
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = lang === 'hi' ? 'hi-IN' : 'en-IN'
  u.rate = 0.95
  window.speechSynthesis.speak(u)
  return true
}
