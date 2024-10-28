'use client'

import { useCart } from '../contexts/CartContext'
import Link from 'next/link'

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, total } = useCart()

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between transition-transform transform hover:scale-105">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{item.name}</h2>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center text-black">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="bg-red-500 text-black px-3 py-1 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-red-500 text-black px-3 py-1 rounded-r-md focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-4 text-red-500 font-semibold focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-white shadow-md rounded-lg p-4">
            <p className="text-xl font-bold text-gray-900">Total: ${total.toFixed(2)}</p>
            <Link href="/checkout" className="mt-4 block w-full bg-blue-600 text-black text-center px-4 py-2 rounded-md transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
