'use client'

import { useState, useEffect } from 'react'
import { withAdminAuth } from '../../components/withAdminAuth'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
}

function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: 0, image: '' })
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  // GET Products
  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/admin/products')
      if (!response.ok) throw new Error('Failed to fetch products')
      const data = await response.json()
      setProducts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching products')
    } finally {
      setIsLoading(false)
    }
  }

  // Set attributes
  const handleInputChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    const inputValue = name === 'price' ? parseFloat(value) || 0 : value;

    if (editingProduct) {
      setEditingProduct({ ...editingProduct, [name]: inputValue });
    } else {
      setNewProduct({ ...newProduct, [name]: inputValue });
    }
  };

  // Submit Form depending on action
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (editingProduct) {
      await updateProduct()
    } else {
      await createProduct()
    }
  }

  // POST new product
  const createProduct = async () => {
    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      })
      if (!response.ok) throw new Error('Failed to create product')
      setNewProduct({ name: '', description: '', price: 0, image: '' })
      await fetchProducts()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating product')
    }
  }

  // PUT edit products
  const updateProduct = async () => {
    try {
      const response = await fetch(`/api/admin/products/${editingProduct?.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProduct),
      })
      if (!response.ok) {
        throw new Error('Failed to update product')
      }
      setEditingProduct(null)
      await fetchProducts()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating product')
    }
  }

  // Set Product to be edited
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
  }

  // DELETE Product
  const handleDeleteProduct = async (product: Product) => {
    try {
      const response = await fetch(`/api/admin/products/${product.id}`,
        { method: 'DELETE' })
      if (!response.ok) throw new Error('Failed to delete product')
      await fetchProducts()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting product')
    }
  }

  // Cancel Edit, Clear Form
  const cancelEdit = () => {
    setEditingProduct(null)
  }

  if (isLoading) return <div className="flex justify-center items-center h-screen text-gray-600">Loading products...</div>
  if (error) return <div className="flex justify-center items-center h-screen text-red-600">{error}</div>

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">Manage Products</h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={editingProduct ? editingProduct.name : newProduct.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={editingProduct ? editingProduct.description : newProduct.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={editingProduct ? editingProduct.price : newProduct.price}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="text"
              id="image"
              name="image"
              value={editingProduct ? editingProduct.image : newProduct.image}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {editingProduct ? 'Update Product' : 'Add Product'}
            </button>
            {editingProduct && (
              <button
                type="button"
                onClick={cancelEdit}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                <td className="px-6 py-4  whitespace-nowrap text-sm text-gray-500">{product.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={product.image} alt={product.name} className="w-10 h-10 rounded-full" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="text-blue-600 hover:text-blue-900 mr-4 focus:outline-none focus:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product)}
                    className="text-red-600 hover:text-red-900 focus:outline-none focus:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default withAdminAuth(AdminProducts)