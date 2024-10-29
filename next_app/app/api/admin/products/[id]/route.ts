import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Update product by ID
export async function PUT(request: Request) {
  try {
    const { id, name, description, price, image } = await request.json(); // Include id in the request body

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { name, description, price, image },
    });

    return NextResponse.json({
      id: updatedProduct.id,
      name: updatedProduct.name,
      description: updatedProduct.description,
      price: updatedProduct.price,
      image: updatedProduct.image,
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Error updating product' }, { status: 500 });
  }
}

// Delete product by ID
export async function DELETE(request: NextRequest) {
  // Extract the ID from the URL
  const { pathname } = request.nextUrl;
  const id = pathname.split('/').pop(); // Get the last segment of the path

  try {
    console.log("DELETING", id);

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Error deleting product' }, { status: 500 });
  }
}
