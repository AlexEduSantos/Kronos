import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET); // Use sua chave secreta

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get("access_token")?.value;

  if (!token) {
    return false;
  }

  try {
    // Tenta verificar o JWT
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch (error) {
    console.error("JWT verification failed:", error);
    // Token inválido ou expirado
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const isUserAuthenticated = await isAuthenticated(request);
  const isLoginPage = request.nextUrl.pathname === "/login";

  if (!isUserAuthenticated && !isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (isUserAuthenticated && isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
