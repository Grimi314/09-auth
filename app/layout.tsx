import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "NoteHub, it's an app for creating your notes",
  openGraph: {
    title: "NoteHub",
    description: "NoteHub, it's an app for creating your notes",
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

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable}`}>
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header></Header>
          {children}
          {modal}
          <Footer></Footer>
        </TanStackProvider>
      </body>
    </html>
  );
}
