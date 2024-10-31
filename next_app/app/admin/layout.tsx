export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-50">

      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}