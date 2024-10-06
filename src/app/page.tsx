import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center py-2'>
      <main className='flex w-full flex-1 flex-col items-center justify-center px-20 text-center'>
        <h1 className='text-6xl font-bold'>
          Welcome to <span className='text-blue-600'>Next.js 14</span> with
          Firebase Auth
        </h1>
        <p className='mt-3 text-2xl'>
          Get started by editing{' '}
          <code className='rounded-md bg-gray-100 p-3 font-mono text-lg'>
            app/page.tsx
          </code>
        </p>
        <div className='mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full'>
          <Link href='/login'>
            <Button>Login</Button>
          </Link>
          <Link href='/dashboard'>
            <Button>Dashboard</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
