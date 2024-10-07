'use server'

import { getUser } from '@/app/actions/session'
import InfoCard from './InfoCard'
import { Card } from './ui/card'

export default async function ServerInfo() {
  const user = await getUser()

  if (!user) {
    return (
      <div className='flex justify-center items-center'>
        <Card className='p-8 w-full max-w-md'>Not logged in</Card>
      </div>
    )
  }

  try {
    return (
      <div className='flex justify-center items-center'>
        <InfoCard user={user} type='server' />
      </div>
    )
  } catch (error) {
    console.error('Error fetching user data:', error)
    return <div>Error fetching user data.</div>
  }
}
