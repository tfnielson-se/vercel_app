'use client'

import { useState, useEffect } from 'react'
import { withAdminAuth } from '../../components/withAdminAuth'

interface OrderItem {
  id: string
  productId: string
  quantity: number
  product: {
    name: string
  }
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

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (!response.ok) throw new Error('Failed to update order status')
      await fetchOrders()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while updating order status')
    }
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
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="border rounded p-1"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <ul className="list-disc pl-5">
                    {order.items.map((item) => (
                      <li key={item.id}>
                        {item.product.name} x {item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
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