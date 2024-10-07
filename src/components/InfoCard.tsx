import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

export interface IInfoCard {
  user: {
    uid: string
    email?: string | null
    displayName?: string | null
    emailVerified?: boolean
    metadata: {
      creationTime?: string
      lastSignInTime?: string
    }
  }
  type: 'client' | 'server'
}

export default function InfoCard({ user, type }: IInfoCard) {
  return (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle>User Information ({type} side)</CardTitle>
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
          <strong>Email Verified:</strong> {user.emailVerified ? 'Yes' : 'No'}
        </p>
        <p>
          <strong>Created At:</strong> {user.metadata.creationTime}
        </p>
        <p>
          <strong>Last Sign In:</strong> {user.metadata.lastSignInTime}
        </p>
      </CardContent>
    </Card>
  )
}
