import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { status } = await request.json()
    const updatedOrder = await prisma.order.update({
      where: { id: params.id },
      data: { status },
    })
    return NextResponse.json(updatedOrder)
  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json({ error: 'Error updating order' }, { status: 500 })
  }
}