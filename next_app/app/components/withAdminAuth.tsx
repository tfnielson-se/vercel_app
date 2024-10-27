'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function withAdminAuth(WrappedComponent: React.ComponentType) {
  return function WithAdminAuth(props: any) {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
      if (status === 'loading') return // Do nothing while loading
      if (!session || !session.user.is_admin) {
        router.push('/login')
      }
    }, [session, status, router])

    if (status === 'loading') {
      return <div className="text-center mt-8">Loading...</div>
    }

    if (!session || !session.user.is_admin) {
      return null
    }

    return <WrappedComponent {...props} />
  }
}