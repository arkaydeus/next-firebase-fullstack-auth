'use client'

import { useAuth } from '@/app/context/AuthContext'
import { Button } from './ui/button'

export default function SignoutButton() {
  const { signOut } = useAuth()

  return <Button onClick={signOut}>Sign Out</Button>
}
