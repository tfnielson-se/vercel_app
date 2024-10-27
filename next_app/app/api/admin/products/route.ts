import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        image: true

      },
    })
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { name, description, price, image } = await request.json()
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        image
      },
    })
    return NextResponse.json({ id: product.id, name: product.name, description: product.description, price: product.price, image: product.image}, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({ error: 'Error creating product' }, { status: 500 })
  }
}