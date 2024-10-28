import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { items, total, shippingDetails } = await request.json()

    // Log received data for debugging
    console.log('Received items:', items)
    console.log('Received total:', total)
    console.log('Received shippingDetails:', shippingDetails)

    const userId = ''  // Replace with actual user ID if available

    const order = await prisma.order.create({
      data: {
        userId: userId || 'guest',  // Set userId appropriately
        status: 'pending',
        // total: total,  // Make sure your model includes `total`
        // shippingAddress: JSON.stringify(shippingDetails),  // Adjust based on your schema
        items: {
          create: items.map((item: { id: string; quantity: number; price: number }) => ({
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
