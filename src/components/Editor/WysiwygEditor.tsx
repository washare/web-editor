
import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import FontSize from '@/components/Editor/extensions/FontSize';
import Toolbar from './Toolbar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const WysiwygEditor = () => {
  const [content, setContent] = useState('<p>Start typing here...</p>');
  const { toast } = useToast();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Image,
      TextStyle,
      Color,
      FontSize,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result && editor) {
        editor.chain().focus().setImage({ src: event.target.result as string }).run();
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>WYSIWYG Editor</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="edit">
            <TabsList className="mb-4">
              <TabsTrigger value="edit">Edit</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="edit">
              <div className="space-y-4">
                <Toolbar editor={editor} onImageUpload={handleImageUpload} />
                <div className="border rounded-md p-4 min-h-[300px]">
                  <EditorContent editor={editor} className="prose max-w-none" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="preview">
              <div className="border rounded-md p-4 min-h-[300px] max-h-[600px] overflow-y-auto prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default WysiwygEditor;
