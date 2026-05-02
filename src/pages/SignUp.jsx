import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { InputField } from '../components/ui/InputField.jsx'
import { Button } from '../components/ui/Button.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { validateSignup } from '../utils/validators.js'

export function SignUp() {
  const { t } = useTranslation()
  const { signUp, user } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true })
  }, [user, navigate])

  async function handleSubmit(e) {
    e.preventDefault()
    const v = validateSignup({ name, email, password, confirm })
    setErrors(v)
    if (Object.keys(v).length) {
      Object.values(v).forEach((key) => toast.error(t(key)))
      return
    }
    setSubmitting(true)
    try {
      await signUp({ name: name.trim(), email: email.trim(), password })
      navigate('/dashboard', { replace: true })
    } catch (err) {
      console.error(err)
      toast.error(t('errors.signupFailed'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-14 md:px-6 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border-2 border-orange-100 bg-white p-8 shadow-xl dark:border-slate-700 dark:bg-slate-900 md:p-10"
      >
        <h1 className="mb-8 text-center text-3xl font-extrabold text-blue-950 dark:text-white md:text-4xl">
          {t('signup.title')}
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <InputField
            id="signup-name"
            autoComplete="name"
            label={t('signup.name')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name ? t(errors.name) : ''}
          />
          <InputField
            id="signup-email"
            type="email"
            autoComplete="email"
            label={t('signup.email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email ? t(errors.email) : ''}
          />
          <div>
            <InputField
              id="signup-password"
              type={showPw ? 'text' : 'password'}
              autoComplete="new-password"
              label={t('signup.password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password ? t(errors.password) : ''}
            />
            <InputField
              id="signup-confirm"
              type={showPw ? 'text' : 'password'}
              autoComplete="new-password"
              label={t('signup.confirm')}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="mt-4"
              error={errors.confirm ? t(errors.confirm) : ''}
            />
            <button
              type="button"
              className="mt-2 text-lg font-semibold text-blue-800 underline"
              onClick={() => setShowPw((s) => !s)}
            >
              {showPw ? t('auth.hidePassword') : t('auth.showPassword')}
            </button>
          </div>

          <Button type="submit" variant="saffron" className="w-full" disabled={submitting}>
            {submitting ? t('common.loading') : t('signup.submit')}
          </Button>
        </form>

        <p className="mt-8 text-center text-lg text-slate-700 dark:text-slate-300 md:text-xl">
          {t('signup.hasAccount')}{' '}
          <Link to="/login" className="font-bold text-blue-800 underline">
            {t('nav.login')}
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
