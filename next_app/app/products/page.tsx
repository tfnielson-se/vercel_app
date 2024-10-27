'use client'

import { useEffect, useState } from 'react'
import { useCart } from '../contexts/CartContext'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string | null
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const { addToCart } = useCart()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/admin/products')
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }
      const data = await response.json()
      setProducts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching products')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4">
            <img src={product.image || '/placeholder.png'} alt={product.name} className="w-full h-48 object-cover mb-2" />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
            <button
              onClick={() => addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                total: product.price * 1
              })}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}