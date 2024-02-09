import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "sonner";
import { App } from "./app";
import { NoteContextProvider } from "./contexts/note-context";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NoteContextProvider>
      <App />
      <Toaster richColors />
    </NoteContextProvider>
  </React.StrictMode>,
);
