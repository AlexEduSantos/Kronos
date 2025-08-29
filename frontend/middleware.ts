import { updateSession } from "@/_utils/auth/middleware";
import { type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  console.log("Middleware" + updateSession(request));
  return await updateSession(request);
}

export const config = {
  matcher: [    
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
