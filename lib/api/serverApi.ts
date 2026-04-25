
import { cookies } from "next/headers";
import { api } from "./api";
import type { CheckSessionRequest } from "@/types/checkSession";
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

export async function checkSession(): Promise<
  AxiosResponse<CheckSessionRequest>
> {
  const response = await api.get<CheckSessionRequest>("/auth/session", {
    headers: await getHeaders(),
  });

  return response;
}

export async function getMe(): Promise<User> {
  const response = await api.get<User>("/users/me", {
    headers: await getHeaders(),
  });

  return response.data;
}


import type { RefreshSessionResponse } from "@/types/checkSession";

export async function refreshSession() {
  const response = await api.post<RefreshSessionResponse>(
    "/auth/refresh",
    {},
    {
      withCredentials: true,
    }
  );

  return response;
}





