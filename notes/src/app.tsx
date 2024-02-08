import { NewNoteCard } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";

export function App() {
  return (
    <div className="mx-auto my-12 max-w-6xl space-y-6">
      <img src="/images/logo-nlw-expert.svg" alt="Logotipo NWL Expert" />
      <form className="w-full">
        <input
          type="search"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
        />
      </form>
      <div className="h-px bg-slate-700" />
      <div className="grid auto-rows-[250px] grid-cols-3 gap-6">
        <NewNoteCard />
        {Array.from({ length: 5 }).map((_, i) => {
          return (
            <NoteCard
              key={i}
              note={{
                date: new Date(),
                content: `Hello Word ${i}`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
