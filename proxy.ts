import { NextResponse, NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/sign-in", "/sign-up"];
const PRIVATE_ROUTES = ["/profile"];


export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const token = request.cookies.get('token')?.value

    const isPublic = PUBLIC_ROUTES.some((route) => pathname.startsWith(route))
    const isPrivat = PRIVATE_ROUTES.some((route) => pathname.startsWith(route))
    
    if (!token && isPrivat) {
        return NextResponse.redirect(
            new URL('/sing-in', request.url)
        )
    }

    if (token && isPublic) {
        return NextResponse.redirect(new URL('/profile', request.url))
    }
    return NextResponse.next();
}

export const config = {
    matcher :['/profile', '/sing-in', '/sing-up']
}