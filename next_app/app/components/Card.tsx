// src/components/ui/card.tsx

import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
}

export const Card: React.FC<CardProps> = ({ children, className }) => (
  <div className={`border rounded shadow bg-white ${className}`}>{children}</div>
)

export const CardContent: React.FC<CardProps> = ({ children, className }) => (
  <div className={`p-4 ${className}`}>{children}</div>
)

export const CardFooter: React.FC<CardProps> = ({ children, className }) => (
  <div className={`border-t p-4 ${className}`}>{children}</div>
)
