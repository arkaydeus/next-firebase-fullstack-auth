'use client'

import SignoutButton from '@/components/SignoutButton'
import { Button } from '@/components/ui/button'
import { onAuthStateChanged } from '@/lib/firebase/auth'
import { User } from 'firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser)
      } else {
        setUser(null)
        router.push('/login')
      }
    })

    return () => unsubscribe()
  }, [router])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className='flex flex-col justify-center items-center py-2 min-h-screen'>
      <h1 className='mb-6 text-4xl font-bold'>Dashboard (Client-Side)</h1>
      <p className='mb-4'>Welcome, {user.email}!</p>
      <div className='flex flex-row gap-4'>
        <SignoutButton />
        <Button>
          <Link href='/server-page'>Go to Server-Side Page</Link>
        </Button>
      </div>
    </div>
  )
}
