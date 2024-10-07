'use client'

// import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

import {
  getIdToken,
  onAuthStateChanged,
  signIn,
  signOut,
  User,
} from '@/lib/firebase/auth'
import { useRouter } from 'next/navigation'

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

type AuthContextType = {
  loggedIn?: boolean
  user: User | null
  signIn: (email: string, password: string) => void
  signOut: () => void
}

type Props = {
  children: ReactNode
}

const authContextDefaultValues: AuthContextType = {
  loggedIn: undefined,
  user: null,
  signIn: () => {},
  signOut: () => {},
}

const AuthContext = createContext<AuthContextType>(authContextDefaultValues)
export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }: Props) => {
  const router = useRouter()

  const [loggedIn, setLoggedIn] = useState<boolean | undefined>(undefined)
  const [redirect, setRedirect] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
        setLoggedIn(true)
      } else {
        setUser(null)
        setLoggedIn(false)
      }
    })

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])

  const logIn = async (email: string, password: string) => {
    try {
      const userCredential = await signIn(email, password)
      const idToken = await getIdToken(userCredential.user)

      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      })

      if (response.ok) {
        setUser(userCredential.user)
        setRedirect(true)
        setLoggedIn(true)
      } else {
        console.error('Login failed:', await response.text())
        throw new Error('Login failed')
      }
    } catch (error) {
      console.error('Login failed:', error)
      throw error // Re-throw the error to be handled in the component
    }
  }

  const logOut = async () => {
    try {
      await signOut()

      const response = await fetch('/api/logout', {
        method: 'POST',
      })

      if (response.ok) {
        setLoggedIn(false)
      }
    } catch (error) {
      console.error('Sign out failed:', error)
    }
  }

  useEffect(() => {
    if (loggedIn && redirect) {
      console.log('loggedIn pushing to /dashboard')
      router.push('/dashboard')
      setRedirect(false)
      console.log('redirect set to false')
    } else if (!loggedIn) {
      router.push('/')
    }
  }, [loggedIn, redirect, router])

  const value = {
    loggedIn,
    user,
    signIn: logIn,
    signOut: logOut,
  }

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  )
}
