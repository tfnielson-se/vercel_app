import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { items, total, shippingDetails } = await request.json()

    const order = await prisma.order.create({
      data: {
        userId: '',
        status: 'pending',
        // total: total,
        // shippingAddress: JSON.stringify(shippingDetails),
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: true,
      },
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json({ error: 'Error creating order' }, { status: 500 })
  }
}
