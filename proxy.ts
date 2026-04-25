import { NextRequest, NextResponse } from "next/server";
import { checkSession } from "@/lib/api/serverApi";

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

  let newAccessToken = accessToken;


  if (!accessToken && refreshToken) {
    try {
      const response = await checkSession();

      const {
        accessToken: newAccess,
        refreshToken: newRefresh,
      } = response.data;

      newAccessToken = newAccess;

      // 🔴 якщо публічний маршрут → редірект на /
      if (isPublic) {
        const redirectResponse = NextResponse.redirect(
          new URL("/", request.url)
        );

        redirectResponse.cookies.set("accessToken", newAccess, {
          httpOnly: true,
          path: "/",
        });

        redirectResponse.cookies.set("refreshToken", newRefresh, {
          httpOnly: true,
          path: "/",
        });

        return redirectResponse;
      }

      // ✅ інакше просто next()
      const nextResponse = NextResponse.next();

      nextResponse.cookies.set("accessToken", newAccess, {
        httpOnly: true,
        path: "/",
      });

      nextResponse.cookies.set("refreshToken", newRefresh, {
        httpOnly: true,
        path: "/",
      });

      return nextResponse;
    } catch (error) {
      const response = NextResponse.redirect(
        new URL("/sign-in", request.url)
      );

      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");

      return response;
    }
  }

  // 🔒 Неавторизований → приватні сторінки заборонені
  if (!newAccessToken && isPrivate) {
    return NextResponse.redirect(
      new URL("/sign-in", request.url)
    );
  }

  // 🚫 Авторизований → не можна на sign-in / sign-up
  if (newAccessToken && isPublic) {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};