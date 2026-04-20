"use client";

import css from "./NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../lib/api/clientApi";
import { useNoteDraftStore } from "@/lib/store/noteStore";
import { useRouter } from "next/navigation";
import { NewNoteData } from "@/lib/store/noteStore";
import { useState } from "react";

interface FormValues {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

export default function NoteForm() {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();
  const [errors, setErrors] = useState<Partial<FormValues>>({});

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.push("/notes/filter/all");
    },
  });

  const validate = () => {
    const newErrors: Partial<FormValues> = {};

    if (!draft.title) {
      newErrors.title = "Title is required";
    } else if (draft.title.length < 3) {
      newErrors.title = "Minimum 3 characters";
    } else if (draft.title.length > 50) {
      newErrors.title = "Maximum 50 characters";
    }

    if (draft.content.length > 500) {
      newErrors.content = "Maximum 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({
      ...draft,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (formData: FormData) => {
    if (!validate()) return;

    const values = Object.fromEntries(formData) as NewNoteData;
    mutation.mutate(values);
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <label>
        Title
        <input
          name="title"
          type="text"
          value={draft.title}
          onChange={handleChange}
        />
        {errors.title && <span>{errors.title}</span>}
      </label>

      <label>
        Content
        <textarea
          name="content"
          value={draft.content}
          onChange={handleChange}
        />
        {errors.content && <span>{errors.content}</span>}
      </label>

      <label>
        Tag
        <select name="tag" value={draft.tag} onChange={handleChange}>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        {errors.tag && <span>{errors.tag}</span>}
      </label>

      <div className={css.actions}>
        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Creating..." : "Create"}
        </button>

        <button type="button" onClick={() => router.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
}
