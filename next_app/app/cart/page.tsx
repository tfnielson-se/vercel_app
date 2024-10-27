'use client'

import { useCart } from '../contexts/CartContext'
import Link from 'next/link'

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, total } = useCart()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-2">
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="bg-red-500 px-2 py-1 rounded-l"
                  >
                    -
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-red-500 px-2 py-1 rounded-r"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-2 text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <p className="text-xl font-bold">Total: ${total}</p>
            <Link href="/checkout" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-block">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  )
}