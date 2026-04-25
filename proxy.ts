import { NextRequest, NextResponse } from "next/server";
import { refreshSession } from "@/lib/api/serverApi";

const PUBLIC_ROUTES = ["/sign-in", "/sign-up"];
const PRIVATE_ROUTES = ["/notes", "/profile"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isPublic = PUBLIC_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  const isPrivate = PRIVATE_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  let currentAccess = accessToken;


  if (!accessToken && refreshToken) {
    try {
      const response = await refreshSession();

      const {
        accessToken: newAccess,
        refreshToken: newRefresh,
      } = response.data;

      currentAccess = newAccess;

      const nextResponse = NextResponse.next();

      nextResponse.cookies.set("accessToken", newAccess, {
        httpOnly: true,
        path: "/",
      });

      nextResponse.cookies.set("refreshToken", newRefresh, {
        httpOnly: true,
        path: "/",
      });

      if (isPublic) {
        return NextResponse.redirect(new URL("/", request.url));
      }

      return nextResponse;
    } catch {
      const response = NextResponse.redirect(
        new URL("/sign-in", request.url)
      );

      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");

      return response;
    }
  }

  
  if (!currentAccess && isPrivate) {
    return NextResponse.redirect(
      new URL("/sign-in", request.url)
    );
  }


  if (currentAccess && isPublic) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/notes/:path*",
    "/sign-in",
    "/sign-up",
  ],
};