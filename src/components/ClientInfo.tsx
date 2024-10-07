'use client'

import { useAuth } from '@/app/context/AuthContext'
import InfoCard from './InfoCard'
import { Card } from './ui/card'

export default function ClientInfo() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className='flex justify-center items-center'>
        <Card className='p-8 w-full max-w-md'>Not logged in</Card>
      </div>
    )
  }

  return (
    <div className='flex justify-center items-center'>
      <InfoCard user={user} type='client' />
    </div>
  )
}
