'use client';

import { forwardRef, useImperativeHandle } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Redo,
  Table as TableIcon,
  Underline as UnderlineIcon,
  Undo,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { uploadMedia } from '@/features/projects/services/projects-api';

export type RichTextEditorHandle = {
  getHtml: () => string;
};

type RichTextEditorProps = {
  content: string;
  onChange: (html: string) => void;
  className?: string;
};

function ToolbarButton({
  onClick,
  active,
  children,
  title,
}: {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={cn(
        'rounded p-2 hover:bg-slate-100',
        active && 'bg-sky-100 text-primary'
      )}
    >
      {children}
    </button>
  );
}

export const RichTextEditor = forwardRef<RichTextEditorHandle, RichTextEditorProps>(
  function RichTextEditor({ content, onChange, className }, ref) {
    const editor = useEditor({
      immediatelyRender: false,
      extensions: [
        StarterKit,
        Underline,
        Link.configure({ openOnClick: false }),
        Image,
        TextAlign.configure({ types: ['heading', 'paragraph'] }),
        Placeholder.configure({ placeholder: 'Viết nội dung dự án...' }),
        Table.configure({ resizable: true }),
        TableRow,
        TableHeader,
        TableCell,
      ],
      content,
      onUpdate: ({ editor: e }) => onChange(e.getHTML()),
      editorProps: {
        attributes: {
          class:
            'prose-content min-h-[320px] max-w-none px-4 py-3 focus:outline-none',
        },
      },
    });

    useImperativeHandle(ref, () => ({
      getHtml: () => editor?.getHTML() ?? content,
    }));

    if (!editor) return null;

    const addImage = async () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = async () => {
        const file = input.files?.[0];
        if (!file) return;
        try {
          const result = await uploadMedia(file);
          editor.chain().focus().setImage({ src: result.fullUrl }).run();
        } catch {
          alert('Upload ảnh thất bại');
        }
      };
      input.click();
    };

    const setLink = () => {
      const url = window.prompt('URL');
      if (url) {
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
      }
    };

    return (
      <div className={cn('overflow-hidden rounded-xl border border-border', className)}>
        <div className="flex flex-wrap gap-1 border-b border-border bg-slate-50 p-2">
          <ToolbarButton
            title="Undo"
            onClick={() => editor.chain().focus().undo().run()}
          >
            <Undo className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            title="Redo"
            onClick={() => editor.chain().focus().redo().run()}
          >
            <Redo className="h-4 w-4" />
          </ToolbarButton>
          <span className="mx-1 w-px bg-border" />
          <ToolbarButton
            title="H1"
            active={editor.isActive('heading', { level: 1 })}
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          >
            <Heading1 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            title="H2"
            active={editor.isActive('heading', { level: 2 })}
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          >
            <Heading2 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            title="Bold"
            active={editor.isActive('bold')}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            title="Italic"
            active={editor.isActive('italic')}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            title="Underline"
            active={editor.isActive('underline')}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <UnderlineIcon className="h-4 w-4" />
          </ToolbarButton>
          <span className="mx-1 w-px bg-border" />
          <ToolbarButton
            title="Bullet list"
            active={editor.isActive('bulletList')}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <List className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            title="Ordered list"
            active={editor.isActive('orderedList')}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            title="Quote"
            active={editor.isActive('blockquote')}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <Quote className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton title="Link" onClick={setLink}>
            <LinkIcon className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton title="Image" onClick={addImage}>
            <ImageIcon className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            title="Table"
            onClick={() =>
              editor
                .chain()
                .focus()
                .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                .run()
            }
          >
            <TableIcon className="h-4 w-4" />
          </ToolbarButton>
          <span className="mx-1 w-px bg-border" />
          <ToolbarButton
            title="Align left"
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
          >
            <AlignLeft className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            title="Align center"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
          >
            <AlignCenter className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            title="Align right"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
          >
            <AlignRight className="h-4 w-4" />
          </ToolbarButton>
        </div>
        <EditorContent editor={editor} className="bg-white" />
      </div>
    );
  }
);
