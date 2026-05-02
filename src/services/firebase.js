import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'

/**
 * Firebase config from Vite env. Create `.env` from `.env.example`.
 * If keys are missing, `auth` is null and AuthContext can use demo/local fallback.
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const hasConfig = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId)

let app = null
let auth = null

if (hasConfig) {
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
  auth = getAuth(app)
}

export { app, auth, hasConfig as isFirebaseConfigured }
