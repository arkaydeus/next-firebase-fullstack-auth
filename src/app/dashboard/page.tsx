// 'use server'

import ClientInfo from '@/components/ClientInfo'
import ServerInfo from '@/components/ServerInfo'
import SignoutButton from '@/components/SignoutButton'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Dashboard() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-8 py-2'>
      <h1 className='mb-6 text-4xl font-bold'>Dashboard (Client-Side)</h1>

      <div className='flex flex-row gap-4'>
        <ClientInfo />
        <ServerInfo />
      </div>

      <div className='flex flex-row gap-4'>
        <Link href='/login'>
          <Button>Sign In</Button>
        </Link>
        <SignoutButton />
      </div>
    </div>
  )
}
