"use client";

import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export function useEvaluationEditor() {
  return useEditor({
    extensions: [StarterKit],

    content: "",

    editorProps: {
      attributes: {
        class: "min-h-[140px] p-4 outline-none",
        dir: "rtl",
      },
    },

    immediatelyRender: false,
  });
}
