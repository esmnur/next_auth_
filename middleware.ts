import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAuth = !!token
    const isAuthPage = req.nextUrl.pathname.startsWith("/auth")
    const isAdminPage = req.nextUrl.pathname.startsWith("/admin")

    console.log("Path:", req.nextUrl.pathname)
    console.log("Is authenticated:", isAuth)
    console.log("Token role:", token?.role)
    console.log("Is admin page:", isAdminPage)
    console.log("========================")

    if (req.nextUrl.pathname === "/auth/error") {
      return NextResponse.next()
    }

    if (isAuthPage && isAuth) {
      return NextResponse.redirect(new URL("/", req.url))
    }

    if (!isAuthPage && !isAuth) {
      let from = req.nextUrl.pathname
      if (req.nextUrl.search) {
        from += req.nextUrl.search
      }

      return NextResponse.redirect(new URL(`/auth/signin?from=${encodeURIComponent(from)}`, req.url))
    }

    if (isAdminPage && token?.role !== "admin") {
      console.log("Access denied to admin page. User role:", token?.role)
      return NextResponse.redirect(new URL("/unauthorized", req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => true,
    },
  },
)

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
}
