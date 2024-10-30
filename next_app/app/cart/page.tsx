'use client'

import { useCart } from '../contexts/CartContext'
import Link from 'next/link'

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, total } = useCart()

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">Your Cart</h1>
        {cart.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-8">Your cart is empty.</p>
            <Link 
              href="/" 
              className="inline-block bg-blue-500 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-6 mb-8">
              {cart.map((item) => (
                <div key={item.id} className="bg-white shadow-sm rounded-lg p-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-1">{item.name}</h2>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 text-gray-800">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-6 text-sm text-red-600 hover:text-red-800 font-medium focus:outline-none focus:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white shadow-sm rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-medium text-gray-900">Total</span>
                <span className="text-2xl font-semibold text-gray-900">${total.toFixed(2)}</span>
              </div>
              <Link 
                href="/checkout" 
                className="block w-full bg-blue-500 text-white text-center px-6 py-3 rounded-md font-medium hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}