import { adminAuth } from '@/lib/firebase/admin'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { idToken } = await request.json()

  if (!idToken) {
    return NextResponse.json({ error: 'Missing ID token' }, { status: 400 })
  }

  try {
    const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 days
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn,
    })

    const options = {
      name: 'session',
      value: sessionCookie,
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
    }

    return NextResponse.json(
      { success: true },
      {
        status: 200,
        headers: {
          'Set-Cookie': `session=${sessionCookie}; Max-Age=${options.maxAge}; Path=/; HttpOnly; Secure; SameSite=Strict`,
        },
      },
    )
  } catch (error) {
    console.error('Failed to create session:', error)
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 },
    )
  }
}
