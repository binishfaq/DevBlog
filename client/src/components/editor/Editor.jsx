
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link as LinkIcon,
  Heading1,
  Heading2,
  Quote,
  Code,
  Undo,
  Redo,
  Eye,
  Calendar,
} from "lucide-react";
import { useState, useEffect } from "react";

const Editor = ({ title, setTitle, content, setContent }) => {
  const [isPreview, setIsPreview] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Configure StarterKit to not include link since we're adding it separately
        link: false,
      }),
      Image,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline",
        },
      }),
      Placeholder.configure({
        placeholder: "Write your blog content here...",
      }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none focus:outline-none min-h-[400px] px-4 py-6",
      },
    },
  });

  useEffect(() => {
    if (editor) {
      setContent(editor.getHTML());
    }
  }, [editor, setContent]);

  const ToolbarButton = ({ onClick, isActive, icon: Icon, label }) => (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg transition ${
        isActive
          ? "bg-blue-100 text-blue-600"
          : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
      }`}
      title={label}
    >
      <Icon size={18} />
    </button>
  );

  return (
    <>
      {/* Title Input */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Blog Title..."
          className="w-full text-3xl font-bold outline-none placeholder:text-gray-300"
        />
        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Calendar size={14} />
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="text-xs text-gray-300">|</span>
          <span className="text-xs text-gray-400">
            {editor?.getText().length || 0} characters
          </span>
        </div>
      </div>

      {/* Editor Toolbar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-100 p-3 flex flex-wrap gap-1">
          <ToolbarButton
            onClick={() => editor?.chain().focus().toggleBold().run()}
            isActive={editor?.isActive("bold")}
            icon={Bold}
            label="Bold"
          />
          <ToolbarButton
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            isActive={editor?.isActive("italic")}
            icon={Italic}
            label="Italic"
          />
          <div className="w-px h-6 bg-gray-200 mx-1" />
          <ToolbarButton
            onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
            isActive={editor?.isActive("heading", { level: 1 })}
            icon={Heading1}
            label="Heading 1"
          />
          <ToolbarButton
            onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor?.isActive("heading", { level: 2 })}
            icon={Heading2}
            label="Heading 2"
          />
          <div className="w-px h-6 bg-gray-200 mx-1" />
          <ToolbarButton
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            isActive={editor?.isActive("bulletList")}
            icon={List}
            label="Bullet List"
          />
          <ToolbarButton
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            isActive={editor?.isActive("orderedList")}
            icon={ListOrdered}
            label="Numbered List"
          />
          <div className="w-px h-6 bg-gray-200 mx-1" />
          <ToolbarButton
            onClick={() => editor?.chain().focus().toggleBlockquote().run()}
            isActive={editor?.isActive("blockquote")}
            icon={Quote}
            label="Quote"
          />
          <ToolbarButton
            onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
            isActive={editor?.isActive("codeBlock")}
            icon={Code}
            label="Code Block"
          />
          <div className="w-px h-6 bg-gray-200 mx-1" />
          <ToolbarButton
            onClick={() => {
              const url = prompt("Enter URL:");
              if (url) {
                editor?.chain().focus().setLink({ href: url }).run();
              }
            }}
            isActive={editor?.isActive("link")}
            icon={LinkIcon}
            label="Add Link"
          />
          <div className="w-px h-6 bg-gray-200 mx-1" />
          <ToolbarButton
            onClick={() => editor?.chain().focus().undo().run()}
            icon={Undo}
            label="Undo"
          />
          <ToolbarButton
            onClick={() => editor?.chain().focus().redo().run()}
            icon={Redo}
            label="Redo"
          />
          <div className="ml-auto flex gap-1">
            <button
              onClick={() => setIsPreview(!isPreview)}
              className={`p-2 rounded-lg transition ${
                isPreview
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              title="Preview"
            >
              <Eye size={18} />
            </button>
          </div>
        </div>

        {/* Editor Content */}
        {isPreview ? (
          <div className="prose prose-lg max-w-none p-8 min-h-[400px] bg-gray-50">
            <h1>{title || "Untitled"}</h1>
            <div
              dangerouslySetInnerHTML={{
                __html: content || "<p>No content yet...</p>",
              }}
            />
          </div>
        ) : (
          <EditorContent editor={editor} className="min-h-[400px]" />
        )}
      </div>
    </>
  );
};

export default Editor;