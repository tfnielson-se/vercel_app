'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (item: CartItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }
      return [...prevCart, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total }}>
      {children}
    </CartContext.Provider>
  )
}