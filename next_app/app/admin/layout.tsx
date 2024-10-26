import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-semibold text-gray-800">Admin Panel</h1>
        </div>
        <nav className="mt-4">
          <Link href="/admin/products" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
            Manage Products
          </Link>
          <Link href="/admin/orders" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
            Manage Orders
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}