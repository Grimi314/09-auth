
import { cookies } from "next/headers";
import { api } from "./api";
import type { CheckSessionRequest } from "@/types/checkSession";
import type { User } from "@/types/user";
import type { Note } from "@/types/note";


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

export async function fetchNotes(searchText?: string,
  page?: number,
  perPage?: number,
    tag?: string,): Promise<Note> {
    
    
    
   
 const response = await api.get<Note>(`/notes`, {
    params: {
      search: searchText,
      page: page,
      perPage: perPage,
      tag: tag,
    },
    headers: await getHeaders()
 });
  return response.data
}
  
export async  function fetchNoteById(id: string ): Promise<Note> {
  const response = await api.get<Note>(`/notes/${id}`, {
    headers: await getHeaders()
  }
  )
  return response.data
}

export async function getMe() {
  const response = await api.get<User>("/users/me", {
    headers: await getHeaders(),
  })
  return response.data
}

export async function checkSession() {
    const response = await api.get<CheckSessionRequest>('/auth/session', {
    headers: await getHeaders(),
  });
    return response.data
}





export async function refreshSession(refreshToken: string) {
  try {
    const response = await api.post("/auth/session", {
      refreshToken,
    });

    return response.data;
  } catch (error) {
   console.log(error)
  }
}