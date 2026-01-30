import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const { pathname } = req.nextUrl;

    const token = req.nextauth.token;
    const role = token?.role;
    const isFirstLogin = token?.isFirstLogin;

    // ---------------- FIRST LOGIN ENFORCEMENT ----------------
    if (isFirstLogin && pathname !== "/change-password") {
      return NextResponse.redirect(new URL("/change-password", req.url));
    }

    // ---------------- STUDENT ROUTES ----------------
    if (pathname.startsWith("/student")) {
      if (!role) {
        return NextResponse.redirect(new URL("/api/auth/signin", req.url));
      }

      if (role !== "STUDENT") {
        return NextResponse.redirect(new URL("/teacher/dashboard", req.url));
      }
    }

    // ---------------- TEACHER / ADMIN ROUTES ----------------
    if (pathname.startsWith("/teacher")) {
      if (!role) {
        return NextResponse.redirect(new URL("/api/auth/signin", req.url));
      }

      if (role !== "TEACHER" && role !== "ADMIN") {
        return NextResponse.redirect(new URL("/student/dashboard", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  matcher: ["/student/:path*", "/teacher/:path*", "/change-password"],
};
