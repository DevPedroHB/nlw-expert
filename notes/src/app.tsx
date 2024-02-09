import { ChangeEvent, useState } from "react";
import { NewNoteCard } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";
import { useNote } from "./hooks/use-note";

export function App() {
  const { search } = useNote();
  const [query, setQuery] = useState("");

  function handleQueryChanged(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  const filteredNotes = search(query);

  return (
    <div className="mx-auto my-12 max-w-6xl space-y-6 px-5">
      <img src="/images/logo-nlw-expert.svg" alt="Logotipo NWL Expert" />
      <form className="w-full">
        <input
          type="search"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
          value={query}
          onChange={handleQueryChanged}
        />
      </form>
      <div className="h-px bg-slate-700" />
      <div className="grid auto-rows-[250px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <NewNoteCard />
        {filteredNotes.map((note) => {
          return <NoteCard key={note.id} note={note} />;
        })}
      </div>
    </div>
  );
}
