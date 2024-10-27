import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import Header from './components/Header'
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
        <Providers>
          <CartProvider>
            <Header />
            {children}
          </CartProvider>
        </Providers>
      </body>
    </html>
  )
}