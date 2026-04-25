
import { cookies } from "next/headers";
import { api } from "./api";
import type { CheckSessionResponse } from "@/types/checkSession";
import type { User } from "@/types/user";
import type { Note } from "@/types/note";
import { AxiosResponse } from "axios";



async function getHeaders() {
  const cookieStore = await cookies();

  return {
    Cookie: cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; "),
    accept: "application/json",
  };
}

export async function fetchNotes(
  searchText?: string,
  page?: number,
  perPage?: number,
  tag?: string
): Promise<Note[]> {
  const response = await api.get<Note[]>(`/notes`, {
    params: {
      search: searchText,
      page,
      perPage,
      tag,
    },
    headers: await getHeaders(),
  });

  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await api.get<Note>(`/notes/${id}`, {
    headers: await getHeaders(),
  });

  return response.data;
}

export async function getMe(): Promise<User> {
  const response = await api.get<User>("/users/me", {
    headers: await getHeaders(),
  });

  return response.data;
}




export async function checkSession(): Promise<
  AxiosResponse<CheckSessionResponse>
> {
  const response = await api.get<CheckSessionResponse>("/auth/session", {
    headers: await getHeaders(),
  });

  return response;
}

