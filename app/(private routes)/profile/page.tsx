import css from "./ProfilePage.module.css";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { getMe } from "@/lib/api/clientApi";

export const metadata: Metadata = {
  title: "Profile Page",
  description: "User profile page with personal information",
  openGraph: {
    title: "Profile Page",
    description: "View and edit your profile information",
    url: "https://09-auth-blush-eight.vercel.app/profile",
    images: [
      {
        url: "/notehub-og-meta.jpg",
        width: 1200,
        height: 600,
        alt: "image with app preview",
      },
    ],
  },
};

export default function Profile() {
  const user = getMe();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src="Avatar"
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {}</p>
          <p>Email: your_email@example.com</p>
        </div>
      </div>
    </main>
  );
}
