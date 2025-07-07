import type { Note, CreateNote } from "../types/note";
import axios from "axios";

const API_URL = "https://notehub-public.goit.study/api";
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

if (!token) {
  throw new Error("Environment variable NEXT_PUBLIC_NOTEHUB_TOKEN is not set");
}

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
interface FetchParams {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}

function errorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const msg = error.response?.data?.message || error.message;
    return `Axios error: ${msg}`;
  }
  return `Unexpected error: ${(error as Error).message}`;
}

export async function fetchNotes(
  searchText: string,
  page: number,
  perPage?: number,
  tag?: string,
): Promise<FetchNotesResponse> {
  try {
    const params: FetchParams = {
      ...(searchText.trim() !== "" && { search: searchText.trim() }),
      page,
      perPage,
      tag,
    };
    const res = await axiosInstance.get<FetchNotesResponse>("/notes", {
      params,
    });
    return res.data;
  } catch (error) {
    console.error(`Failed to fetch notes: ${errorMessage(error)}`);
    throw new Error("Could not fetch notes. Please try again later.");
  }
}

export async function createNote(newNote: CreateNote): Promise<Note> {
  try {
    const res = await axiosInstance.post<Note>("/notes", newNote);
    return res.data;
  } catch (error) {
    console.error(`Failed to create note: ${errorMessage(error)}`);
    throw new Error("Could not create note. Please try again.");
  }
}

export async function deleteNote(noteId: number): Promise<Note> {
  try {
    const res = await axiosInstance.delete<Note>(`/notes/${noteId}`);
    return res.data;
  } catch (error) {
    console.error(
      `Failed to delete note with ID ${noteId}: ${errorMessage(error)}`,
    );
    throw new Error("Could not delete the note.");
  }
}

export async function fetchNoteById(noteId: number): Promise<Note> {
  try {
    const res = await axiosInstance.get<Note>(`/notes/${noteId}`);
    return res.data;
  } catch (error) {
    console.error(
      `Failed to fetch note with ID ${noteId}: ${errorMessage(error)}`,
    );
    throw new Error("Could not fetch note details.");
  }
}