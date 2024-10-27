import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { SignJWT } from 'jose'
import { cookies } from 'next/headers'
import { nanoid } from 'nanoid'

const prisma = new PrismaClient()
const bcrypt = require('bcryptjs')


export async function POST(request: Request) {
  const { email, password } = await request.json()

  try {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 })
    }

    const token = await new SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setJti(nanoid())
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET))

    cookies().set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600,
      path: '/',
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in auth route:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}