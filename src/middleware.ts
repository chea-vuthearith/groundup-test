import { type NextRequest, NextResponse } from "next/server";
import { auth } from "~/server/auth";
import { ROUTE_PATHS } from "./utils/constants/route-paths";

const publicRoutes = [ROUTE_PATHS.LOGIN];

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const session = await auth();
  const { pathname } = req.nextUrl;
  const isPublic = publicRoutes.some((route) => pathname.startsWith(route));
  if (pathname === "/")
    return NextResponse.redirect(new URL(ROUTE_PATHS.APP.ALERTS, req.url));

  if (!isPublic && !session)
    return NextResponse.redirect(new URL(ROUTE_PATHS.LOGIN, req.url));

  return NextResponse.next();
}
