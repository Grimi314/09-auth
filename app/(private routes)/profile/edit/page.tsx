"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import css from "./EditProfilePage.module.css";
import { User } from "@/types/user";
import { getMe, updateMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function EditProfile() {
  const [user, setUser] = useState<null | User>(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const setAuthUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getMe();
        setUser(data);
        setUsername(data?.username ?? "");
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  const handleSubmit = async (formData: FormData) => {
    try {
      const username = formData.get("username") as string;

      const updatedUser = await updateMe({
        username: username,
      });

      setUser(updatedUser);

      setAuthUser(updatedUser);

      router.push("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    router.push("/profile");
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found</p>;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user.avatar ?? ""}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} action={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>

            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
