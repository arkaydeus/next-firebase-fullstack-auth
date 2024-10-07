import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out successfully' })

  response.headers.set(
    'Set-Cookie',
    'session=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Strict',
  )

  return response
}
