'use client'

import { useState, useEffect } from 'react'
import { withAdminAuth } from '../../components/withAdminAuth'

interface OrderItem {
  id: string
  productId: string
  quantity: number
  price: number
  product: {
    name: string
  }
}

interface Order {
  id: string
  userId: string
  status: string
  total: number
  createdAt: string
  updatedAt: string
  shippingAddress: string
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
      if (!response.ok) {
        throw new Error('Failed to fetch orders')
      }
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
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (!response.ok) {
        throw new Error('Failed to update order status')
      }
      await fetchOrders()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while updating order status')
    }
  }

  if (isLoading) {
    return <div className="text-center mt-8">Loading orders...</div>
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">{error}</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Manage Orders</h1>
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">Order ID: {order.id}</h2>
            <p className="text-gray-600">User ID: {order.userId}</p>
            <p className="text-gray-600">Created At: {new Date(order.createdAt).toLocaleString()}</p>
            <p className="text-gray-600">Total: ${order.total.toFixed(2)}</p>
            <div className="mt-2">
              <label htmlFor={`status-${order.id}`} className="mr-2">Status:</label>
              <select
                id={`status-${order.id}`}
                value={order.status}
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                className="border rounded p-1"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <h3 className="text-lg font-semibold mt-4">Order Items:</h3>
            <ul className="list-disc list-inside">
              {order.items.map(item => (
                <li key={item.id}>
                  {item.product.name} - Quantity: {item.quantity} - Price: ${item.price.toFixed(2)}
                </li>
              ))}
            </ul>
            <h3 className="text-lg font-semibold mt-4">Shipping Address:</h3>
            <p>{order.shippingAddress}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default withAdminAuth(AdminOrders)