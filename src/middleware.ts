import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE_NAME } from "./modules/auth/types";
import { verifySessionToken } from "./modules/auth/token";

const publicRoutes = [
    { path: "/sign-in", whenauthenticated: "redirect" },
    { path: "/", whenauthenticated: "next" },
    { path: "/random-movie", whenauthenticated: "next" },
    { path: "/changelog", whenauthenticated: "next" },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/sign-in";

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const publicRoute = publicRoutes.find((route) => route.path === path);
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    const session = token ? await verifySessionToken(token) : null;

    if (!session && publicRoute) {
        return NextResponse.next();
    }

    if (!session && !publicRoute) {
        const redirectUrl = request.nextUrl.clone();

        redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

        return NextResponse.redirect(redirectUrl);
    }

    if (session && publicRoute && publicRoute.whenauthenticated === "redirect") {
        const redirectUrl = request.nextUrl.clone();

        redirectUrl.pathname = "/";

        return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
}

export const config: MiddlewareConfig = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|assets).*)",
    ],
};
