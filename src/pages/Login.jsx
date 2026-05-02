import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { InputField } from '../components/ui/InputField.jsx'
import { Button } from '../components/ui/Button.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { validateLogin } from '../utils/validators.js'

const REMEMBER_KEY = 'election_remember_email'

export function Login() {
  const { t } = useTranslation()
  const { signIn, resetPassword, user, isFirebaseConfigured } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [showPw, setShowPw] = useState(false)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(REMEMBER_KEY)
    if (saved) setEmail(saved)
  }, [])

  useEffect(() => {
    if (user) navigate(from, { replace: true })
  }, [user, from, navigate])

  async function handleSubmit(e) {
    e.preventDefault()
    const v = validateLogin({ email, password })
    setErrors(v)
    if (Object.keys(v).length) {
      Object.values(v).forEach((key) => toast.error(t(key)))
      return
    }
    setSubmitting(true)
    try {
      if (remember) localStorage.setItem(REMEMBER_KEY, email.trim())
      else localStorage.removeItem(REMEMBER_KEY)
      await signIn({ email: email.trim(), password })
      toast.success(t('success.login'))
      navigate(from, { replace: true })
    } catch (err) {
      console.error(err)
      toast.error(t('errors.authFailed'))
    } finally {
      setSubmitting(false)
    }
  }

  async function handleForgot() {
    if (!isValidEmailQuick(email)) {
      toast.error(t('errors.email'))
      return
    }
    try {
      await resetPassword(email.trim())
      toast.success(t('auth.resetSent'))
    } catch {
      toast.error(t('errors.authFailed'))
    }
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-14 md:px-6 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border-2 border-blue-100 bg-white p-8 shadow-xl dark:border-slate-700 dark:bg-slate-900 md:p-10"
      >
        <h1 className="mb-8 text-center text-3xl font-extrabold text-blue-950 dark:text-white md:text-4xl">
          {t('login.title')}
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <InputField
            id="login-email"
            type="email"
            autoComplete="email"
            label={t('login.email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email ? t(errors.email) : ''}
          />
          <div>
            <InputField
              id="login-password"
              type={showPw ? 'text' : 'password'}
              autoComplete="current-password"
              label={t('login.password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password ? t(errors.password) : ''}
            />
            <button
              type="button"
              className="mt-2 text-lg font-semibold text-blue-800 underline"
              onClick={() => setShowPw((s) => !s)}
            >
              {showPw ? t('auth.hidePassword') : t('auth.showPassword')}
            </button>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex cursor-pointer items-center gap-3 text-lg md:text-xl">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-6 w-6 rounded border-2 border-slate-400"
              />
              {t('login.remember')}
            </label>
            <button
              type="button"
              className="text-lg font-semibold text-orange-700 underline"
              onClick={handleForgot}
            >
              {t('login.forgot')}
            </button>
          </div>

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? t('common.loading') : t('login.submit')}
          </Button>
        </form>

        <p className="mt-8 text-center text-lg text-slate-700 dark:text-slate-300 md:text-xl">
          {t('login.noAccount')}{' '}
          <Link to="/signup" className="font-bold text-blue-800 underline">
            {t('nav.signup')}
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

function isValidEmailQuick(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim())
}
