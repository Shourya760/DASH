import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

const CURRENT_USER_KEY = 'election_demo_user'
const USERS_KEY = 'election_demo_users'

const AuthContext = createContext(null)

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function readCurrentUser() {
  return readJson(CURRENT_USER_KEY, null)
}

function readUsers() {
  const users = readJson(USERS_KEY, [])
  return Array.isArray(users) ? users : []
}

function writeCurrentUser(user) {
  if (user) localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
  else localStorage.removeItem(CURRENT_USER_KEY)
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function toPublicUser(account) {
  if (!account) return null
  return {
    uid: account.uid,
    email: account.email,
    displayName: account.displayName,
    source: 'local',
  }
}

export function AuthProvider({ children }) {
  const { t } = useTranslation()
  const [user, setUser] = useState(null)
  const [initializing, setInitializing] = useState(true)

  useEffect(() => {
    setUser(readCurrentUser())
    setInitializing(false)
  }, [])

  const signUp = useCallback(
    async ({ name, email, password }) => {
      const normalizedEmail = email.trim().toLowerCase()
      const users = readUsers().filter((item) => item.email !== normalizedEmail)
      const account = {
        uid: `local-${Date.now()}`,
        email: normalizedEmail,
        password,
        displayName: name || normalizedEmail.split('@')[0] || 'Voter',
      }
      const publicUser = toPublicUser(account)

      writeUsers([...users, account])
      writeCurrentUser(publicUser)
      setUser(publicUser)
      toast.success(t('success.signup'))
    },
    [t],
  )

  const signIn = useCallback(async ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase()
    const users = readUsers()
    let account = users.find((item) => item.email === normalizedEmail && item.password === password)

    if (!account) {
      account = {
        uid: `local-${Date.now()}`,
        email: normalizedEmail,
        password,
        displayName: normalizedEmail.split('@')[0] || 'Voter',
      }
      writeUsers([...users, account])
    }

    const publicUser = toPublicUser(account)
    writeCurrentUser(publicUser)
    setUser(publicUser)
  }, [])

  const logOut = useCallback(async () => {
    writeCurrentUser(null)
    setUser(null)
    toast.success(t('success.logout'))
  }, [t])

  const resetPassword = useCallback(
    async (email) => {
      const normalizedEmail = email.trim().toLowerCase()
      const users = readUsers()

      if (!users.some((item) => item.email === normalizedEmail)) {
        writeUsers([
          ...users,
          {
            uid: `local-${Date.now()}`,
            email: normalizedEmail,
            password: 'password',
            displayName: normalizedEmail.split('@')[0] || 'Voter',
          },
        ])
      }

      toast.success(t('auth.resetSent'))
    },
    [t],
  )

  const value = useMemo(
    () => ({
      user,
      initializing,
      signUp,
      signIn,
      logOut,
      resetPassword,
    }),
    [user, initializing, signUp, signIn, logOut, resetPassword],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

