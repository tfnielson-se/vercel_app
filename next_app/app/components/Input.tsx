// src/components/ui/input.tsx

import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export const Input: React.FC<InputProps> = ({ className, ...props }) => (
  <input
    className={`border rounded px-3 py-2 w-full text-black focus:outline-none focus:ring focus:border-blue-500 ${className}`}
    {...props}
  />
)
