'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const { signIn } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await signIn(email, password)
      // If signIn is successful, it will redirect in the AuthContext
    } catch (error) {
      console.error('Sign in error:', error)
      setError(
        'Failed to sign in. Please check your credentials and try again.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex flex-col justify-center items-center py-2 min-h-screen'>
      <h1 className='mb-6 text-4xl font-bold'>Login</h1>
      {error && <p className='mb-4 text-red-500'>{error}</p>}
      <form onSubmit={handleSubmit} className='w-full max-w-xs'>
        <Input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          className='mb-4'
          disabled={isLoading}
        />
        <Input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          className='mb-4'
          disabled={isLoading}
        />
        <Button type='submit' className='w-full' disabled={isLoading}>
          {isLoading ? (
            <span className='animate-pulse'>Signing in...</span>
          ) : (
            'Sign In'
          )}
        </Button>
      </form>
    </div>
  )
}
