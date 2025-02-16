import { RichTextEditor } from '@mantine/tiptap';

import { useEditor } from '@tiptap/react';

import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
// import Emoji, { gitHubEmojis } from '@tiptap-pro/extension-emoji';
// import emojisSuggestions from './emojis-suggestions';

export function TextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({ placeholder: 'Type your message here...' }),
      // TODO: Fix emoji extension
      // Emoji.configure({
      //   emojis: gitHubEmojis,
      //   enableEmoticons: true,
      //   suggestion: emojisSuggestions,
      // }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <RichTextEditor editor={editor} variant="subtle">
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.Underline />
          <RichTextEditor.Code />
          <RichTextEditor.ClearFormatting />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
