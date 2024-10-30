'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const images = [
    '/placeholder.svg?height=600&width=1200',
    '/placeholder.svg?height=600&width=1200',
    '/placeholder.svg?height=600&width=1200'
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative min-h-screen bg-gray-50">
      <div className="absolute inset-0 overflow-hidden">
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 lg:px-8">
        <h1
          className="text-5xl sm:text-6xl font-bold text-black mb-6 transform transition-all duration-700 translate-y-0 opacity-100"
        >
          Welcome to The Store
        </h1>
        <p
          className="text-xl sm:text-2xl text-black mb-12 transform transition-all duration-700 delay-300 translate-y-0 opacity-100"
        >
          Discover the latest trends in fashion
        </p>
        <div
          className="transform transition-all duration-700 delay-500 scale-100 opacity-100"
        >
          <Link
            href="/products"
            className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  )
}