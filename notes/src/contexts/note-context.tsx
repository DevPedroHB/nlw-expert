import { ReactNode, createContext, useState } from "react";

export type TNote = {
  id: string;
  date: Date;
  content: string;
};

interface INoteContext {
  notes: TNote[];
  search: (query: string) => TNote[];
  createNote: (note: TNote) => void;
  deleteNote: (noteId: string) => void;
}

export const NoteContext = createContext({} as INoteContext);

interface INotesContextProvider {
  children: ReactNode;
}

const localStoragePrefix = "notes:1.0.0:";

export function NoteContextProvider({ children }: INotesContextProvider) {
  const [notes, setNotes] = useState<TNote[]>(() => {
    const notesOnStorage = localStorage.getItem(`${localStoragePrefix}notes`);

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage);
    }

    return [];
  });

  function search(query: string) {
    return notes.filter((note) =>
      note.content.toLowerCase().includes(query.toLowerCase()),
    );
  }

  function createNote(note: TNote) {
    setNotes((prev) => {
      const newNotes = [note, ...prev];

      localStorage.setItem(
        `${localStoragePrefix}notes`,
        JSON.stringify(newNotes),
      );

      return newNotes;
    });
  }

  function deleteNote(noteId: string) {
    const newNotes = notes.filter((note) => note.id !== noteId);

    setNotes(newNotes);

    localStorage.setItem(
      `${localStoragePrefix}notes`,
      JSON.stringify(newNotes),
    );
  }

  return (
    <NoteContext.Provider value={{ notes, search, createNote, deleteNote }}>
      {children}
    </NoteContext.Provider>
  );
}
