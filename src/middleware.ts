import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  console.log('Middleware running for path:', request.nextUrl.pathname)

  const session = request.cookies.get('session')?.value || ''

  if (!session) {
    console.log('No session found, redirecting to login')
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    return NextResponse.next()
  } catch (error) {
    console.error('Failed to verify session:', error)
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  // match every path except / and /login and /api routes
  matcher: ['/((?!_next/static|_next/image|favicon.ico|login|api|$).*)'],
}
