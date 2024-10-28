import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();


export async function GET() {
	try {
		const users = await prisma.user.findMany({
			select: {
				id: true,
				name: true,
				email: true,
				is_admin: true,
				updatedAt: true,
				createdAt: true,
			},
		});
		return NextResponse.json(users);
	} catch (error) {
		console.error("Error fetching users:", error);
		return NextResponse.json(
			{ error: "Error fetching users" },
			{ status: 500 }
		);
	}
}

export async function POST(request: Request) {
	try {
		const { name, email, password, is_admin } = await request.json();
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
				is_admin,
			},
		});
		return NextResponse.json(
			{ id: user.id, name: user.name, email: user.email, is_admin: user.is_admin },
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error creating user:", error);
		return NextResponse.json(
			{ error: "Error creating user" },
			{ status: 500 }
		);
	}
}
