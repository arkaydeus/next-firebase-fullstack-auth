import SignoutButton from '@/components/SignoutButton'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { adminAuth } from '@/lib/firebase/admin'
import { cookies } from 'next/headers'

// async function logout() {
//   'use server'
//   cookies().delete('session')
//   redirect('/')
// }

// const handleSignOut = async () => {
//   'use server'
//   try {
//     await signOut()
//     redirect('/')
//   } catch (error) {
//     console.error('Sign out failed:', error)
//   }
// }

export default async function ServerPage() {
  const sessionCookie = cookies().get('session')

  if (!sessionCookie) {
    return <div>You are not logged in. Please log in to view this page.</div>
  }

  try {
    const decodedToken = await adminAuth.verifySessionCookie(
      sessionCookie.value,
      true,
    )

    const user = await adminAuth.getUser(decodedToken.uid)

    return (
      <div className='flex min-h-screen items-center justify-center'>
        <Card className='w-full max-w-md'>
          <CardHeader>
            <CardTitle>User Information (Server-Side)</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>UID:</strong> {user.uid}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Display Name:</strong> {user.displayName || 'Not set'}
            </p>
            <p>
              <strong>Email Verified:</strong>{' '}
              {user.emailVerified ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Created At:</strong> {user.metadata.creationTime}
            </p>
            <p>
              <strong>Last Sign In:</strong> {user.metadata.lastSignInTime}
            </p>
          </CardContent>
          <CardFooter>
            <SignoutButton />
          </CardFooter>
        </Card>
      </div>
    )
  } catch (error) {
    console.error('Error verifying token:', error)
    return <div>An error occurred while fetching user information.</div>
  }
}
