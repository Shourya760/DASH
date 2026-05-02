import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { auth, isFirebaseConfigured } from '../services/firebase.js'

const DEMO_USER_KEY = 'election_demo_user'

const AuthContext = createContext(null)

function readDemoUser() {
  try {
    const raw = localStorage.getItem(DEMO_USER_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function writeDemoUser(user) {
  if (user) localStorage.setItem(DEMO_USER_KEY, JSON.stringify(user))
  else localStorage.removeItem(DEMO_USER_KEY)
}

export function AuthProvider({ children }) {
  const { t } = useTranslation()
  const [user, setUser] = useState(null)
  const [initializing, setInitializing] = useState(true)

  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsub = onAuthStateChanged(auth, (u) => {
        setUser(
          u
            ? {
                uid: u.uid,
                email: u.email,
                displayName: u.displayName || u.email?.split('@')[0] || 'Voter',
                source: 'firebase',
              }
            : null,
        )
        setInitializing(false)
      })
      return () => unsub()
    }

    setUser(readDemoUser())
    setInitializing(false)
    return undefined
  }, [])

  const signUp = useCallback(
    async ({ name, email, password }) => {
      if (isFirebaseConfigured && auth) {
        const cred = await createUserWithEmailAndPassword(auth, email, password)
        if (name && cred.user) {
          await updateProfile(cred.user, { displayName: name })
        }
        toast.success(t('success.signup'))
        return
      }

      // Demo mode without Firebase — local session only (not for production)
      const demo = {
        uid: `demo-${Date.now()}`,
        email,
        displayName: name || email.split('@')[0],
        source: 'demo',
      }
      writeDemoUser(demo)
      setUser(demo)
      toast.success(t('success.signup'))
    },
    [t],
  )

  const signIn = useCallback(
    async ({ email, password }) => {
      if (isFirebaseConfigured && auth) {
        await signInWithEmailAndPassword(auth, email, password)
        return
      }

      const existing = readDemoUser()
      if (existing && existing.email === email) {
        setUser(existing)
        return
      }
      // Allow any demo login if no prior signup — creates session
      const demo = {
        uid: `demo-${Date.now()}`,
        email,
        displayName: email.split('@')[0],
        source: 'demo',
      }
      writeDemoUser(demo)
      setUser(demo)
    },
    [t],
  )

  const logOut = useCallback(async () => {
    if (isFirebaseConfigured && auth) {
      await signOut(auth)
    } else {
      writeDemoUser(null)
      setUser(null)
    }
    toast.success(t('success.logout'))
  }, [t])

  const resetPassword = useCallback(
    async (email) => {
      if (!isFirebaseConfigured || !auth) {
        toast.error(t('errors.firebaseConfig'))
        return
      }
      await sendPasswordResetEmail(auth, email)
    },
    [t],
  )

  const value = useMemo(
    () => ({
      user,
      initializing,
      isFirebaseConfigured,
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
