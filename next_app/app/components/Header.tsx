'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCart } from '../contexts/CartContext'

export default function Header() {
  const { data: session, status } = useSession()
  const isAdmin = session?.user?.is_admin || false
  const router = useRouter()
  const { cart } = useCart()

  const handleAdminNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-800">Clothing Store</Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300 text-sm font-medium">
                Home
              </Link>
              <Link href="/products" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300 text-sm font-medium">
                Products
              </Link>
              <Link href="/cart" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300 text-sm font-medium">
                Cart ({cart.length})
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {status === 'authenticated' && session.user ? (
              <>
                <span className="text-gray-900">{session.user.name}</span>
               
                {isAdmin && (
                  <>
                    <button onClick={() => handleAdminNavigation('/admin/products')} className="text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                      Admin Products
                    </button>
                    <button onClick={() => handleAdminNavigation('/admin/orders')} className="text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                      Admin Orders
                    </button>
                    <button onClick={() => handleAdminNavigation('/admin/users')} className="text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                      Admin Users
                    </button>
                  </>
                )}
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </Link>
                <Link href="/register" className="text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                  Register
                </Link>
                
              </>
            )}
             <button onClick={() => signOut()} className="text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                  Logout
                </button>
          </div>
        </div>
      </nav>
    </header>
  )
}