import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Clothing Store',
  description: 'Your one-stop shop for trendy clothes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
                <Link href="/login" className="text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </Link>
                <Link href="/register" className="text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                  Register
                </Link>
                <Link href="/admin/products" className="text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                  Admin Products
                </Link>
                <Link href="/admin/orders" className="text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                  Admin Orders
                </Link>
                <Link href="/admin/users" className="text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                  Admin Users
                </Link>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-controls="mobile-menu" aria-expanded="false">
                  <span className="sr-only">Open main menu</span>
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </nav>
          <div className="sm:hidden" id="mobile-menu">
            <div className="pt-2 pb-3 space-y-1">
              <Link href="/" className="text-gray-900 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">
                Home
              </Link>
              <Link href="/products" className="text-gray-900 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">
                Products
              </Link>
              <Link href="/login" className="text-gray-900 hover:bg-gray-100 block px-3 py-2 rounded-md text-base  font-medium">
                Login
              </Link>
              <Link href="/register" className="text-gray-900 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">
                Register
              </Link>
              <Link href="/admin/products" className="text-gray-900 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">
                Admin Products
              </Link>
              <Link href="/admin/orders" className="text-gray-900 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">
                Admin Orders
              </Link>
              <Link href="/admin/users" className="text-gray-900 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">
                Admin Users
              </Link>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  )
}