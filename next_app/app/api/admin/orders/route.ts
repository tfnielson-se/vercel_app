import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: { name: true, email: true },
        },
        items: {
          include: {
            product: {
              select: { name: true },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json(orders)
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json({ error: 'Error fetching orders' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { userId, items, status } = await request.json()

    const order = await prisma.order.create({
      data: {
        user: { connect: { id: userId } },
        status,
        items: {
          create: items.map((item: { productId: string; quantity: number }) => ({
            product: { connect: { id: item.productId } },
            quantity: item.quantity,
          })),
        },
      },
      include: {
        user: {
          select: { name: true, email: true },
        },
        items: {
          include: {
            product: {
              select: { name: true },
            },
          },
        },
      },
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json({ error: 'Error creating order' }, { status: 500 })
  }
}
