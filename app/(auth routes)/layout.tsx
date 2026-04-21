import { redirect } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoggedIn = false; // тут буде перевірка cookie

  if (isLoggedIn) {
    redirect("/profile");
  }

  return <>{children}</>;
}
