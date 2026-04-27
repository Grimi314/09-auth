
import type { Note } from "../../types/note";
import type { User, RegisterRequest } from "@/types/user";
import type { LoginRequest } from "@/types/login";
import type { CheckSessionResponse } from "@/types/checkSession";
import type { UserUpdate } from "@/types/user";
import { api } from "./api";





    interface FetchNotesProps {
        notes: Note[];
      
        totalPages: number;
}
    


export async function fetchNotes(searchText?: string, page?: number , perPage?: number , tag? : string ): Promise<FetchNotesProps>{
    const response = await api.get<FetchNotesProps>("/notes", {
        params: {
            search: searchText,
            page,
        perPage,
            tag
        },
        headers: {
        
             accept: "application/json",
            
        }
    });
    return response.data;
}




export async function createNote(
  payload: Pick<Note, "title" | "content" | "tag">,
) {
  const response = await api.post<Note>("/notes", payload);
  return response.data;
}

export async function deleteNote(noteId : string, ) : Promise<Note> {
    const deleteNote = await api.delete<Note>(`/notes/${noteId}`, {
        headers: {

            accept: "application/json",
        }
    });
    return deleteNote.data
}

export async function fetchNoteById(id : string) : Promise<Note> {
    const { data } = await api.get<Note>(`/notes/${id}`,
      
    );
  return data;
}


export async function register(data :RegisterRequest) {
    const response = await api.post<User>('/auth/register', data)
    return response.data
}

export async function login(data: LoginRequest) {
    const response = await api.post<User>('/auth/login', data);
    return response.data;
}

export async function logout(): Promise<void> {
    await api.post('/auth/logout')
}

export async function checkSession() {
    const response = await api.get<CheckSessionResponse>('/auth/session');
    return response.data
}

export async  function getMe(): Promise<User> {
    const response = await api.get<User>('/users/me')
    return response.data
}

export async function updateMe(data :  UserUpdate): Promise<User> {
    const response = await api.patch<User>('/users/me', data);

    return response.data;
}
