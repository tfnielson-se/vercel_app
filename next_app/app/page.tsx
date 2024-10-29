import Link from 'next/link'

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to our Store</h1>
      <p className="mb-8">Discover the latest trends in fashion</p>
      <Link href="/products" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Shop Now
      </Link>
    </div>
  )
}