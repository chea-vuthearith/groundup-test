import { type NextRequest, NextResponse } from "next/server";
import { auth } from "~/server/auth";

const protectedRoutes = ["/api/trpc"];

export default async function middleware(req: NextRequest) {
  const session = await auth();
  const { pathname } = req.nextUrl;
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
