import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

interface INewNoteCard extends Dialog.DialogTriggerProps {}

export function NewNoteCard({ ...props }: INewNoteCard) {
  const [shouldShowOnBoarding, setShouldShowOnBoarding] = useState(true);
  const [content, setContent] = useState("");

  function handleStartEditor() {
    setShouldShowOnBoarding(false);
  }

  function handleContentChanged(e: ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);

    if (e.target.value === "") {
      setShouldShowOnBoarding(true);
    }
  }

  function handleSaveNote(e: FormEvent) {
    e.preventDefault();

    console.log(content);

    toast.success("Nota criada com sucesso!");
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger
        className="flex flex-col gap-3 rounded-md bg-slate-700 p-5 text-left outline-none transition-all hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400"
        {...props}
      >
        <span className="text-sm font-medium text-slate-200">
          Adicionar nota
        </span>
        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em áudio que será convertida para texto
          automaticamente.
        </p>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 grid place-items-center bg-black/50">
          <Dialog.Content className="relative flex h-[60vh] w-full max-w-[640px] flex-col overflow-hidden rounded-md bg-slate-700 outline-none">
            <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 transition-all hover:text-slate-100">
              <X className="size-5" />
            </Dialog.Close>
            <form onSubmit={handleSaveNote} className="flex flex-1 flex-col">
              <div className="flex flex-1 flex-col gap-3 p-5">
                <span className="text-sm font-medium text-slate-300">
                  Adicionar nota
                </span>
                {shouldShowOnBoarding ? (
                  <p className="text-sm leading-6 text-slate-400">
                    Comece{" "}
                    <button
                      type="button"
                      className="font-medium text-lime-400 hover:underline"
                    >
                      gravando uma nota
                    </button>{" "}
                    em áudio ou se preferir{" "}
                    <button
                      type="button"
                      onClick={handleStartEditor}
                      className="font-medium text-lime-400 hover:underline"
                    >
                      utilize apenas texto
                    </button>
                    .
                  </p>
                ) : (
                  <textarea
                    autoFocus
                    className="flex-1 resize-none bg-transparent text-sm leading-6 text-slate-400 outline-none"
                    value={content}
                    onChange={handleContentChanged}
                  />
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-lime-400 py-4 text-center text-sm font-medium text-lime-950 outline-none transition-all hover:bg-lime-500"
              >
                Salvar nota
              </button>
            </form>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
