'use client'

import { signOut } from '@/lib/firebase/auth'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'

export default function SignoutButton() {
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Sign out failed:', error)
    }
  }

  return <Button onClick={handleSignOut}>Sign Out</Button>
}
