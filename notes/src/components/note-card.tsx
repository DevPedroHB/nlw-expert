import * as Dialog from "@radix-ui/react-dialog";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { X } from "lucide-react";

interface INoteCard extends Dialog.DialogTriggerProps {
  note: {
    date: Date;
    content: string;
  };
}

export function NoteCard({ note, ...props }: INoteCard) {
  const dateFormatted = formatDistanceToNow(note.date, {
    locale: ptBR,
    addSuffix: true,
  });

  return (
    <Dialog.Root>
      <Dialog.Trigger
        className="relative flex flex-col gap-3 overflow-hidden rounded-md bg-slate-800 p-5 outline-none transition-all hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400"
        {...props}
      >
        <span className="text-sm font-medium text-slate-300">
          {dateFormatted}
        </span>
        <p className="text-sm leading-6 text-slate-400">{note.content}</p>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 grid place-items-center bg-black/50">
          <Dialog.Content className="relative flex h-[60vh] w-full max-w-[640px] flex-col overflow-hidden rounded-md bg-slate-700 outline-none">
            <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 transition-all hover:text-slate-100">
              <X className="size-5" />
            </Dialog.Close>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-300">
                {dateFormatted}
              </span>
              <p className="text-sm leading-6 text-slate-400">{note.content}</p>
            </div>
            <button
              type="button"
              className="group w-full bg-slate-800 py-4 text-center text-sm font-medium text-slate-300 outline-none"
            >
              Deseja{" "}
              <span className="text-red-400 group-hover:underline">
                apagar essa nota
              </span>
              ?
            </button>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}