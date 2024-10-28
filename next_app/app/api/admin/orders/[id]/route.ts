import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Update order status by ID
export async function PUT(request: Request) {
    try {
        const { id, status } = await request.json(); // Include id in the request body

        const updatedOrder = await prisma.order.update({
            where: { id },
            data: { status },
        });

        return NextResponse.json(updatedOrder);
    } catch (error) {
        console.error("Error updating order:", error);
        return NextResponse.json(
            { error: "Error updating order" },
            { status: 500 }
        );
    }
}

// Delete order by ID
export async function DELETE(request: Request) {
    try {
        const { id } = await request.json(); // Include id in the request body

        await prisma.order.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Order deleted successfully" });
    } catch (error) {
        console.error("Error deleting order:", error);
        return NextResponse.json(
            { error: "Error deleting order" },
            { status: 500 }
        );
    }
}

// Get order by ID
export async function GET(request: Request) {
    try {
        const { id } = await request.json(); // Include id in the request body

        const order = await prisma.order.findUnique({
            where: { id },
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
        });

        if (!order) {
            return NextResponse.json(
                { error: "Order not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(order);
    } catch (error) {
        console.error("Error fetching order:", error);
        return NextResponse.json(
            { error: "Error fetching order" },
            { status: 500 }
        );
    }
}
