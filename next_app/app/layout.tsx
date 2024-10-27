import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { CartProvider } from './contexts/CartContext'

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
        <CartProvider>
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
                      Cart
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
              </div>
            </nav>
          </header>
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  )
}