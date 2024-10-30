'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCart } from '../contexts/CartContext'

export default function Header() {
  const { data: session, status } = useSession()
  const isAdmin = session?.user?.is_admin || false
  const router = useRouter()
  const { cart } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleAdminNavigation = (path: string) => {
    router.push(path)
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-800">The Store</Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link href="/products" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Products
            </Link>
            <Link href="/cart" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Cart ({cart.length})
            </Link>
            {status === 'authenticated' && session.user ? (
              <>
                <span className="text-gray-600">{session.user.name}</span>
                {isAdmin && (
                  <div className="relative group py-10">
                    <button className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                      Admin
                    </button>
                    <div className="absolute right-0 w-48 py-2 mt-2 bg-white rounded-md shadow-xl z-20 hidden group-hover:block">
                      <button onClick={() => handleAdminNavigation('/admin/products')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                        Admin Products
                      </button>
                      <button onClick={() => handleAdminNavigation('/admin/orders')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                        Admin Orders
                      </button>
                      <button onClick={() => handleAdminNavigation('/admin/users')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                        Admin Users
                      </button>
                    </div>
                  </div>
                )}
                <button onClick={() => signOut()} className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </Link>
                <Link href="/register" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Register
                </Link>
              </>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link href="/" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
            Home
          </Link>
          <Link href="/products" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
            Products
          </Link>
          <Link href="/cart" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
            Cart ({cart.length})
          </Link>
          {status === 'authenticated' && session.user ? (
            <>
              <span className="text-gray-600 block px-3 py-2">{session.user.name}</span>
              {isAdmin && (
                <>
                  <button onClick={() => handleAdminNavigation('/admin/products')} className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium w-full text-left">
                    Admin Products
                  </button>
                  <button onClick={() => handleAdminNavigation('/admin/orders')} className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium w-full text-left">
                    Admin Orders
                  </button>
                  <button onClick={() => handleAdminNavigation('/admin/users')} className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium w-full text-left">
                    Admin Users
                  </button>
                </>
              )}
              <button onClick={() => signOut()} className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium w-full text-left">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
                Login
              </Link>
              <Link href="/register" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}