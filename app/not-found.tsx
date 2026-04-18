import css from "@/app/Home.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not Found",
  description: "The page you are looking for could not be found.",
  openGraph: {
    title: "Not Found",
    description: "The page you are looking for could not be found.",
    url: "https://08-zustand-blush-eight.vercel.app/",
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
export default async function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}
