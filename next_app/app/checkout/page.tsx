'use client';

import { useCart } from '../contexts/CartContext';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);  // Loading state for UX feedback
  const [errorMessage, setErrorMessage] = useState<string | null>(null);  // Error message state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      console.error('User not authenticated');
      setErrorMessage('Please sign in to complete your order.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            price: item.price,
            status: 'pending'
          })),
          userId: session.user.id,
        }),
      });

      if (response.ok) {
        clearCart();
        router.push('/order-confirmation');
      } else {
        setErrorMessage('Failed to place order. Please try again.');
        console.error('Failed to create order');

        // console.log(({
        //   items: cart.map((item) => ({
        //     id: item.id,
        //     quantity: item.quantity,
        //     price: item.price,
        //   })),
        //   userId: session.user.id,
        // }))

      }
    } catch (error) {
      setErrorMessage('An error occurred while placing your order. Please try again.');
      console.error('Error creating order:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-xl text-black font-bold mb-2">Order Summary</h2>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between text-black">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="font-bold mt-2 text-gray-900">Total: ${total.toFixed(2)}</div>
        </div>
        {errorMessage && (
          <div className="text-red-600 font-semibold mb-4">{errorMessage}</div>
        )}
        <button
          type="submit"
          disabled={loading}
          className={`w-full ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200`}
        >
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
}
