import { create } from "zustand" 
import { persist } from "zustand/middleware";


export type NewNoteData = {
  title: string;
  content: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping'
}
 

  type NoteDraftStore = {
  draft: NewNoteData;
  setDraft: (note: NewNoteData) => void;
  clearDraft: () => void;
};


const initialDraft : NewNoteData  = {
  title: '',
  content: '',
  tag: 'Todo',
};


export const useNoteDraftStore = create<NoteDraftStore>()(
 persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
 
      name: 'note-draft',
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
)
