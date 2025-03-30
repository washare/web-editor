
import React from 'react';
import { EditorContent as TiptapEditorContent } from '@tiptap/react';

interface EditorContentProps {
  editor: any;
}

const EditorContent: React.FC<EditorContentProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-md p-4 min-h-[300px] max-h-[600px] overflow-y-auto">
      <TiptapEditorContent editor={editor} className="prose max-w-none" />
    </div>
  );
};

export default EditorContent;
