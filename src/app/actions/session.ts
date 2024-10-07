'use server'

import { adminAuth } from '@/lib/firebase/admin'
import { cookies } from 'next/headers'

export async function getUser() {
  const sessionCookie = cookies().get('session')
  if (!sessionCookie) {
    return null
  }
  const decodedToken = await adminAuth.verifySessionCookie(
    sessionCookie.value,
    true,
  )

  const user = await adminAuth.getUser(decodedToken.uid)
  return user
}
