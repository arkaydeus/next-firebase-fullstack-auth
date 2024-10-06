import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string,
)

serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n')

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  })
}

export const adminAuth = getAuth()
