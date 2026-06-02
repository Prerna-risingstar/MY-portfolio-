import { NextResponse, type NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const token = request.cookies.get('portfolio_admin')?.value
  const isAuthenticated = !!token && token === process.env.ADMIN_SECRET

  const { pathname } = request.nextUrl

  // Protect /admin/* except /admin/login
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login') && !isAuthenticated) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/admin/login'
    return NextResponse.redirect(loginUrl)
  }

  // If already logged in, skip the login page
  if (pathname === '/admin/login' && isAuthenticated) {
    const dashboardUrl = request.nextUrl.clone()
    dashboardUrl.pathname = '/admin'
    return NextResponse.redirect(dashboardUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
