'use client'

import { useState, useEffect } from 'react'
import { withAdminAuth } from '../../components/withAdminAuth'

interface OrderItem {
  productId: string
  quantity: number
}

interface Order {
  id: string
  userId: string
  user: {
    name: string
    email: string
  }
  status: string
  createdAt: string
  items: OrderItem[]
}

function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [newOrder, setNewOrder] = useState({
    userId: '',
    status: 'Pending',
    items: [{ productId: '', quantity: 1 }],
  })
  const [editingOrder, setEditingOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/admin/orders')
      if (!response.ok) throw new Error('Failed to fetch orders')
      const data = await response.json()
      setOrders(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching orders')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index?: number) => {
    const { name, value } = e.target

    if (index !== undefined && name === 'quantity') {
      const updatedItems = [...(editingOrder ? editingOrder.items : newOrder.items)]
      updatedItems[index].quantity = parseInt(value)
      if (editingOrder) setEditingOrder({ ...editingOrder, items: updatedItems })
      else setNewOrder({ ...newOrder, items: updatedItems })
    } else {
      if (editingOrder) setEditingOrder({ ...editingOrder, [name]: value })
      else setNewOrder({ ...newOrder, [name]: value })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingOrder) {
        const response = await fetch(`/api/admin/orders/${editingOrder.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingOrder),
        })
        if (!response.ok) throw new Error('Failed to update order')
        setEditingOrder(null)
      } else {
        const response = await fetch('/api/admin/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newOrder),
        })
        if (!response.ok) throw new Error('Failed to create order')
        setNewOrder({ userId: '', status: 'Pending', items: [{ productId: '', quantity: 1 }] })
      }
      await fetchOrders()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while saving the order')
    }
  }

  const handleEdit = (order: Order) => {
    setEditingOrder(order)
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/orders/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Failed to delete order')
      await fetchOrders()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while deleting the order')
    }
  }

  if (isLoading) return <div className="text-center mt-8">Loading orders...</div>
  if (error) return <div className="text-center mt-8 text-red-600">{error}</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-black">Manage Orders</h1>
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <input
          type="text"
          name="userId"
          value={editingOrder ? editingOrder.userId : newOrder.userId}
          onChange={handleInputChange}
          placeholder="User ID"
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="status"
          value={editingOrder ? editingOrder.status : newOrder.status}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        {(editingOrder ? editingOrder.items : newOrder.items).map((item, index) => (
          <div key={index} className="flex space-x-2">
            <input
              type="text"
              name="productId"
              value={item.productId}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Product ID"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="number"
              name="quantity"
              value={item.quantity}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Quantity"
              className="w-full p-2 border rounded"
              required
            />
          </div>
        ))}
        <button type="submit" className="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600">
          {editingOrder ? 'Update Order' : 'Add Order'}
        </button>
        {editingOrder && (
          <button
            type="button"
            onClick={() => setEditingOrder(null)}
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
                User
              </th>
              <th className="px-6 py-3 border-b-2 border-blue-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 border-b-2 border-green-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 border-b-2 border-yellow-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Items
              </th>
              <th className="px-6 py-3 border-b-2 border-purple-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.user.name} <br />
                  <span className="text-sm text-gray-600">{order.user.email}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <ul className="list-disc pl-5">
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        {item.productId} x {item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(order)}
                    className="text-blue-600 hover:text-blue-900 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(order.id)}
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

export default withAdminAuth(AdminOrders)
