import { type NextRequest, NextResponse } from "next/server";
import { auth } from "~/server/auth";
import { ROUTE_PATHS } from "./utils/constants/route-paths";

const protectedRoutes: string[] = [];

export default async function middleware(req: NextRequest) {
  const session = await auth();
  const { pathname } = req.nextUrl;
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtected && !session) {
    return NextResponse.redirect(new URL(ROUTE_PATHS.LOGIN, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
