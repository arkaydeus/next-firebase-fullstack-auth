import {
  createUserWithEmailAndPassword,
  getIdToken as firebaseGetIdToken,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
  User,
} from 'firebase/auth'

import { auth } from './config'

export const signIn = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password)

export const signUp = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password)

export const signOut = () => {
  firebaseSignOut(auth)
}

export const onAuthStateChanged = (callback: (user: User | null) => void) =>
  firebaseOnAuthStateChanged(auth, callback)

export const getIdToken = (user: User) => firebaseGetIdToken(user)

export type { User }
