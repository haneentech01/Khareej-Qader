"use client";

import { ToolbarButtonProps, EditorToolbarProps } from "@/types";

function ToolbarButton({
    onClick,
    isActive,
    children,
    title,
}: ToolbarButtonProps) {
    return (
        <button
            type="button"
            title={title}
            aria-label={title}
            onClick={onClick}
            className={`
            p-2 transition-colors
            flex items-center justify-center
            min-w-[32px] text-sm md:text-base 
        ${isActive
                    ? "bg-emerald-100 text-brand-primary"
                    : "hover:bg-brand-light text-brand-muted hover:text-brand-primary"
                }
      `}
        >
            {children}
        </button>
    );
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
    if (!editor) return null;

    const toolbarItems = [
        {
            title: "Bold",
            isActive: editor.isActive("bold"),
            action: () =>
                editor.chain().focus().toggleBold().run(),
            icon: <strong>B</strong>,
        },

        {
            title: "Italic",
            isActive: editor.isActive("italic"),
            action: () =>
                editor.chain().focus().toggleItalic().run(),
            icon: <em>I</em>,
        },

        {
            title: "Strike",
            isActive: editor.isActive("strike"),
            action: () =>
                editor.chain().focus().toggleStrike().run(),
            icon: <s>S</s>,
        },

        {
            title: "Bullet List",
            isActive: editor.isActive("bulletList"),
            action: () =>
                editor.chain().focus().toggleBulletList().run(),
            icon: <span>• List</span>,
        },

        {
            title: "Ordered List",
            isActive: editor.isActive("orderedList"),
            action: () =>
                editor.chain().focus().toggleOrderedList().run(),
            icon: <span>1. List</span>,
        },

        {
            title: "Quote",
            isActive: editor.isActive("blockquote"),
            action: () =>
                editor.chain().focus().toggleBlockquote().run(),
            icon: <span>"</span>,
        },

        {
            title: "Code",
            isActive: editor.isActive("code"),
            action: () =>
                editor.chain().focus().toggleCode().run(),
            icon: <code>{`</>`}</code>,
        },

        {
            title: "Undo",
            isActive: editor.isActive("undo"),
            action: () =>
                editor.chain().focus().undo().run(),
            icon: <span>{` ↩`}</span>,
        },

        {
            title: "Redo",
            isActive: editor.isActive("redo"),
            action: () =>
                editor.chain().focus().redo().run(),
            icon: <span>{` ↪`}</span>,
        },
    ];

    return (
        <div className="bg-zinc-100 border-b border-slate-200 px-4 py-2.5 flex items-center gap-2 flex-wrap">
            {toolbarItems.map((item) => (
                <ToolbarButton
                    key={item.title}
                    title={item.title}
                    onClick={item.action}
                    isActive={item.isActive}
                >
                    {item.icon}
                </ToolbarButton>
            ))}
        </div>
    );
}