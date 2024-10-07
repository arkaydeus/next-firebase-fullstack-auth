// 'use server'

import ClientInfo from '@/components/ClientInfo'
import ServerInfo from '@/components/ServerInfo'
import SignoutButton from '@/components/SignoutButton'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Dashboard() {
  // const [user, setUser] = useState<User | null>(null)
  // const router = useRouter()

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged((authUser) => {
  //     if (authUser) {
  //       setUser(authUser)
  //     } else {
  //       setUser(null)
  //       router.push('/login')
  //     }
  //   })

  //   return () => unsubscribe()
  // }, [router])

  // if (!user) {
  //   return <div>Loading...</div>
  // }

  return (
    <div className='flex flex-col gap-8 justify-center items-center py-2 min-h-screen'>
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
