import { EditorContent } from "@tiptap/react";
import { EditorToolbar } from "./EditorToolbar";
import { CharacterCounter } from "./CharacterCounter";
import { Editor } from "@tiptap/react";

type Props = {
    editor: Editor | null;
};

export function RichTextEditor({ editor }: Props) {
    return (
        <>
            <div className="border border-gray-100 rounded-xl">
                <EditorToolbar editor={editor} />
                <EditorContent editor={editor} />
            </div>

            <CharacterCounter editor={editor} />
        </>
    );
}