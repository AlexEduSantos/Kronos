import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('connect.sid'); 

  if (!sessionCookie) {
    const protectedRoutes = [
      "/",
      "/dashboard",
      "/profile",
    ];

    if (protectedRoutes.includes(request.nextUrl.pathname)) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    // Continue for public pages
    return NextResponse.next();
  }

  try {
    const user = await fetch("http://localhost:3001/auth/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Cookie': `connect.sid=${sessionCookie.value}`
      },
    });

    const userData = await user.json();

    if (user.status !== 200) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

  } catch (error) {
    console.error("Erro ao validar sessão no middleware:", error);
    const url = request.nextUrl.clone();
    url.pathname = "/error";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}