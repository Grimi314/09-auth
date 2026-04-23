import { NextRequest, NextResponse } from "next/server";
import { refreshSession } from "@/lib/api/serverApi";

const PUBLIC_ROUTES = ["/sign-in", "/sign-up"];
const PRIVATE_ROUTES = ["/profile", "/notes"];

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

  let newAccessToken = accessToken;


  if (!accessToken && refreshToken) {
    try {
      const data = await refreshSession(refreshToken);

      newAccessToken = data.accessToken;

      const response = NextResponse.next();

      response.cookies.set("accessToken", data.accessToken, {
        httpOnly: true,
        path: "/",
      });

      response.cookies.set("refreshToken", data.refreshToken, {
        httpOnly: true,
        path: "/",
      });

      return response;
    } catch (error) {
   
      const response = NextResponse.redirect(
        new URL("/sign-in", request.url)
      );

      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");

      return response;
    }
  }


  if (!newAccessToken && isPrivate) {
    return NextResponse.redirect(
      new URL("/sign-in", request.url)
    );
  }


  if (newAccessToken && isPublic) {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/notes/:path*", "/sign-in", "/sign-up"],
};