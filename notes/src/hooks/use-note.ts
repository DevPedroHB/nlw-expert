import { useContext } from "react";
import { NoteContext } from "../contexts/note-context";

export function useNote() {
  const context = useContext(NoteContext);

  return context;
}
