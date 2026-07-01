import { Editor } from "@tiptap/react";

export function CharacterCounter({ editor }: { editor: Editor | null }) {
    return (
        <div className="flex justify-end px-3 pb-2">
            {editor?.getText().length ?? 0}
        </div>
    );
}