import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  const isApiAdminRoute = request.nextUrl.pathname.startsWith('/api/admin')

  if (isAdminRoute || isApiAdminRoute) {
    // Check for a valid admin session here
    // For demo purposes, we'll just check for a hardcoded token
    const token = request.cookies.get('admin_token')?.value

    if (token !== 'super_secret_admin_token') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}