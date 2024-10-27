'use client'

import { useState, useEffect } from 'react'
import { withAdminAuth } from '../../components/withAdminAuth'
import ProductCard from '../../components/ProductCard'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
}

function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  const handleSaveProduct = async (product: Product) => {
    try {
      const url = product.id ? `/api/admin/products/${product.id}` : '/api/admin/products'
      const method = 'POST'

      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      })

      if (!response.ok) {
        throw new Error('Failed to save product')
      }

      await fetchProducts()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while saving the product')
    }
  }

  const handleDeleteProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete product')
      }

      await fetchProducts()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while deleting the product')
    }
  }

  if (isLoading) {
    return <div className="text-center mt-8">Loading products...</div>
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">{error}</div>
  }

  const handleUpdateProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'PUT',
      })

      if (!response.ok) {
        throw new Error('Failed to Update product')
      }

      await fetchProducts()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while updating the product')
    }
  }

  if (isLoading) {
    return <div className="text-center mt-8">Loading products...</div>
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">{error}</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Manage Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ProductCard
          id=""
          name=""
          description=""
          price={0}
          image=""
          onSave={() => handleSaveProduct}
        />
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onSave={() => handleSaveProduct(product)}
            onDelete={() => handleDeleteProduct(product.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default withAdminAuth(AdminProducts)