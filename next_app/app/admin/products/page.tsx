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

  console.log(products)

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const inputValue = name === 'price' ? parseFloat(value) || 0 : value; // Convert 'price' to number
  
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, [name]: inputValue });
    } else {
      setNewProduct({ ...newProduct, [name]: inputValue });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editingProduct) {
      await updateProduct()
    } else {
      await createProduct()
    }
  }

  // Create a new product
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

  // Update an existing product
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

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
  }

  const handleDeleteProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Failed to delete product')
      await fetchProducts()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting product')
    }
  }


  const cancelEdit = () => {
    setEditingProduct(null)
  }


  if (isLoading) return <div className="text-center mt-8">Loading products...</div>
  if (error) return <div className="text-center mt-8 text-red-600">{error}</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold text-black mb-4">Manage Products</h1>
      <form onSubmit={handleSubmit} className="mb-8 space-y-4 text-black">
        <input
          type="text"
          name="name"
          value={editingProduct ? editingProduct.name : newProduct.name}
          onChange={handleInputChange}
          placeholder="Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="description"
          value={editingProduct ? editingProduct.description : newProduct.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="price"
          value={editingProduct ? editingProduct.price : newProduct.price}
          onChange={handleInputChange}
          placeholder="Price"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="image"
          value={editingProduct ? editingProduct.image : newProduct.image}
          onChange={handleInputChange}
          placeholder="Image URL"
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600">
          {editingProduct ? 'Update Product' : 'Add Product'}
        </button>
        {editingProduct && (
          <button
            type="button"
            onClick={cancelEdit}
            className="ml-2 bg-gray-500 text-black px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </form>
      <div className="overflow-x-auto bg-gray-200 border-2 border-gray-900 rounded-md">
        <table className="min-w-full text-black">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-red-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b-2 border-blue-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 border-b-2 border-green-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 border-b-2 border-yellow-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.description}</td>
                <td className="px-6 py-4 whitespace-nowrap"><img alt='' src={product.image}></img></td>
                <td className="px-6 py-4 whitespace-nowrap">{product.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="text-blue-600 hover:text-blue-900 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-red-600 hover:text-red-900"
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
