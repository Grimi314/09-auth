import css from "./CreateNote.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CreateNote",
  description: "Create new note",
  openGraph: {
    title: "CreateNote",
    description: "Create new note",
    url: "https://08-zustand-blush-eight.vercel.app/notes/action/create",
    images: [
      {
        url: "/notehub-og-meta.jpg",
        width: 1200,
        height: 600,
        alt: "image with app preview",
      },
    ],
    type: "article",
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
