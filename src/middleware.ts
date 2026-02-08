import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Check if it's an admin route
    if (pathname.startsWith("/admin")) {
        const isAdminSession = request.cookies.has("admin_session");

        // Define public admin routes (login, register)
        const isAuthRoute = pathname.startsWith("/admin/login") || pathname.startsWith("/admin/register");

        // 2. Redirect unauthenticated users trying to access protected routes
        if (!isAdminSession && !isAuthRoute) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }

        // 3. Redirect authenticated users trying to access login/register
        if (isAdminSession && isAuthRoute) {
            return NextResponse.redirect(new URL("/admin", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
