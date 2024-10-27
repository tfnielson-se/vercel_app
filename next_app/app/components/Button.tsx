// src/components/ui/button.tsx

import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive'
}

export const Button: React.FC<ButtonProps> = ({ variant = 'default', children, ...props }) => {
  const baseClasses = 'px-4 py-2 rounded focus:outline-none'
  const variantClasses =
    variant === 'destructive'
      ? 'bg-red-500 text-white hover:bg-red-600'
      : 'bg-blue-500 text-white hover:bg-blue-600'

  return (
    <button className={`${baseClasses} ${variantClasses}`} {...props}>
      {children}
    </button>
  )
}
