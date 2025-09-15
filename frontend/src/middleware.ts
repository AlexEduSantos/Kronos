// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("connect.sid");
  const protectedPaths = ["/", "/dashboard", "/profile"]; // Adicione todas as rotas protegidas

  const isProtectedRoute = protectedPaths.includes(request.nextUrl.pathname);

  // Se não há cookie e a rota é protegida, redirecionar.
  if (!sessionCookie && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Se há um cookie, validar a sessão no backend.
  if (sessionCookie) {
    try {
      const response = await fetch("http://localhost:3001/auth/profile", {
        method: "GET",
        headers: {
          Cookie: `connect.sid=${sessionCookie.value}`,
        },
      });

      // Se a sessão não for válida (401, 403), redirecione.
      if (!response.ok) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    } catch (error) {
      // Caso o backend esteja inacessível, redirecione para uma página de erro.
      console.error("Erro ao validar sessão:", error);
      return NextResponse.redirect(new URL("/error", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|login|auth|error).*)",
  ],
};
