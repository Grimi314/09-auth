"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { api } from "@/lib/api/api";

const PRIVATE_ROUTES = ["/profile"];

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/session", {
          params: {
            credentials: "include",
          },
        });

        setIsAuth(true);
      } catch {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathname]);

  const isPrivate = PRIVATE_ROUTES.some((route) => pathname.startsWith(route));

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!isAuth && isPrivate) {
    router.push("/sign-in");
    return null;
  }

  return <>{children}</>;
}
