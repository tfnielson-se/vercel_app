import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { name, email, is_admin } = await request.json()
    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: { name, email, is_admin },
    })
    return NextResponse.json({ id: updatedUser.id, name: updatedUser.name, email: updatedUser.email, is_admin: updatedUser.is_admin })
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json({ error: 'Error updating user' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.user.delete({
      where: { id: params.id },
    })
    return NextResponse.json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json({ error: 'Error deleting user' }, { status: 500 })
  }
}