import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { adminAuth } from '../lib/firebase/admin'

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value || ''

  // Validate session
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const decodedClaims = await adminAuth.verifySessionCookie(session, true)
    console.log('Decoded claims:', decodedClaims)
    return NextResponse.next()
  } catch (error) {
    console.error('Failed to verify session:', error)
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
