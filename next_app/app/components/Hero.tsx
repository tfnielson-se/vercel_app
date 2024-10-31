import Link from 'next/link'

export default function Hero() {
  return (
    <div className="relative min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 background-image">
      <h1 className="text-5xl sm:text-6xl font-bold text-gray-100 mb-6 animate-fade-in-up">
        Welcome to The Store
      </h1>
      <p className="text-xl sm:text-2xl text-gray-200 mb-12">
        Discover the latest trends in fashion
      </p>
      <div className="">
        <Link
          href="/products"
          className="bg-blue-500 text-white font-semibold py-3 px-8 rounded-full text-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        >
          Shop Now
        </Link>
      </div>
    </div>
  )
}