import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  console.log(token)

  // if (!token) {
  //   // If no token exists, redirect to login regardless of the path
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }

  // if (request.nextUrl.pathname.startsWith('/admin')) {
  //   // Check if the user has admin privileges
  //   if (!token.is_admin) {
  //     return NextResponse.redirect(new URL('/unauthorized', request.url))
  //   }
  // }

  // If all checks pass, continue with the request
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}