import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CreateNote } from "@/types/note";

type NoteStore = {
  draft: CreateNote;
  setDraft: (note: CreateNote) => void;
  clearDraft: () => void;
};

const initialDraft: CreateNote = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => {
      return {
        draft: initialDraft,
        setDraft: (note: CreateNote) => {
          return set({
            draft: note,
          });
        },
        clearDraft: () => {
          return set({
            draft: initialDraft,
          });
        },
      };
    },
    {
      name: "draft",
      partialize: (store) => {
        return { draft: store.draft };
      },
    },
  ),
);