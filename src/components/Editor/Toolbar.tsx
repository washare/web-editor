
import React from 'react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Link,
  Image as ImageIcon,
  Type,
  Palette
} from 'lucide-react';

interface ToolbarProps {
  editor: any;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ editor, onImageUpload }) => {
  if (!editor) {
    return null;
  }

  const handleHeadingClick = (level: number) => {
    editor?.chain().focus().toggleHeading({ level }).run();
  };

  const handleLinkAdd = (url: string) => {
    if (url) {
      editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  };

  const handleColorChange = (color: string) => {
    editor?.chain().focus().setColor(color).run();
  };

  const handleFontSizeChange = (size: string) => {
    const sizeValue = size.replace('px', '');
    editor?.chain().focus().setFontSize(sizeValue + 'px').run();
  };
  
  const fontSizes = ['12px', '14px', '16px', '18px', '20px', '24px', '32px', '48px'];
  const colorOptions = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', 
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080',
    '#008000', '#800000', '#008080', '#000080', '#808080'
  ];

  return (
    <div className="border border-border rounded-md p-1 sticky top-0 bg-background z-10 flex flex-wrap gap-1 items-center">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'bg-muted' : ''}
      >
        <Bold className="h-4 w-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'bg-muted' : ''}
      >
        <Italic className="h-4 w-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'bg-muted' : ''}
      >
        <Underline className="h-4 w-4" />
      </Button>

      {/* Headings Dropdown */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon">
            <Type className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2">
          <div className="flex flex-col gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleHeadingClick(1)}
              className={editor.isActive('heading', { level: 1 }) ? 'bg-muted' : ''}
            >
              <Heading1 className="h-4 w-4 mr-2" /> Heading 1
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleHeadingClick(2)}
              className={editor.isActive('heading', { level: 2 }) ? 'bg-muted' : ''}
            >
              <Heading2 className="h-4 w-4 mr-2" /> Heading 2
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleHeadingClick(3)}
              className={editor.isActive('heading', { level: 3 }) ? 'bg-muted' : ''}
            >
              <Heading3 className="h-4 w-4 mr-2" /> Heading 3
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleHeadingClick(4)}
              className={editor.isActive('heading', { level: 4 }) ? 'bg-muted' : ''}
            >
              <Heading4 className="h-4 w-4 mr-2" /> Heading 4
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleHeadingClick(5)}
              className={editor.isActive('heading', { level: 5 }) ? 'bg-muted' : ''}
            >
              <Heading5 className="h-4 w-4 mr-2" /> Heading 5
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleHeadingClick(6)}
              className={editor.isActive('heading', { level: 6 }) ? 'bg-muted' : ''}
            >
              <Heading6 className="h-4 w-4 mr-2" /> Heading 6
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* Font Size Dropdown */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="px-2 text-xs gap-1">
            <span>Size</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-40 p-2">
          <div className="flex flex-col gap-1">
            {fontSizes.map((size) => (
              <Button
                key={size}
                variant="ghost"
                size="sm"
                onClick={() => handleFontSizeChange(size)}
                className="justify-start"
              >
                {size}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {/* Color Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon">
            <Palette className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-2">
          <div className="grid grid-cols-5 gap-1">
            {colorOptions.map((color) => (
              <button
                key={color}
                onClick={() => handleColorChange(color)}
                className="w-8 h-8 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {/* Link Button */}
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            className={editor.isActive('link') ? 'bg-muted' : ''}
          >
            <Link className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4">
          <div className="space-y-4">
            <h4 className="font-medium text-sm">Insert Link</h4>
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <div className="flex gap-2">
                <Input 
                  id="url" 
                  placeholder="https://example.com"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleLinkAdd((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = '';
                      document.dispatchEvent(new MouseEvent('click'));
                    }
                  }}
                />
                <Button 
                  onClick={() => {
                    const input = document.getElementById('url') as HTMLInputElement;
                    handleLinkAdd(input.value);
                    input.value = '';
                    document.dispatchEvent(new MouseEvent('click'));
                  }}
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Image Upload Button */}
      <Button variant="ghost" size="icon" className="relative" asChild>
        <label>
          <ImageIcon className="h-4 w-4" />
          <input 
            type="file" 
            className="sr-only" 
            accept="image/*"
            onChange={onImageUpload}
          />
        </label>
      </Button>
    </div>
  );
};

export default Toolbar;
