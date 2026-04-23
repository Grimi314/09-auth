"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { api } from "@/lib/api/api";
import { useAuthStore } from "@/lib/store/authStore";

const PRIVATE_ROUTES = ["/profile"];

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const { setUser, setIsAuthenticated, clearAuth } = useAuthStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/auth/session", {
          withCredentials: true,
        });

        const res = await api.get("/users/me", {
          withCredentials: true,
        });

        setUser(res.data);
        setIsAuthenticated(true);
      } catch {
        clearAuth();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathname, setUser, setIsAuthenticated, clearAuth]);

  const isPrivate = PRIVATE_ROUTES.some((route) => pathname.startsWith(route));

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated && isPrivate) {
    router.push("/sign-in");
    return null;
  }

  return <>{children}</>;
}
