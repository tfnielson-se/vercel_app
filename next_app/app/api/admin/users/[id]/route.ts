import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Update user by ID
export async function PUT(request: Request) {
  try {
    const { id, name, email, is_admin } = await request.json(); // Include id in the request body

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, email, is_admin },
    });

    return NextResponse.json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      is_admin: updatedUser.is_admin,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Error updating user' }, { status: 500 });
  }
}

// Delete user by ID
export async function DELETE(request: NextRequest) {
  // Extract the ID from the URL
  const { pathname } = request.nextUrl;
  const id = pathname.split('/').pop(); // Get the last segment of the path

  console.log(id)
  try {
    console.log("DELETING", id);

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Error deleting user' }, { status: 500 });
  }
}

