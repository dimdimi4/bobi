import { RichTextEditor } from '@mantine/tiptap';
import TurndownService from 'turndown';
import * as marked from 'marked';

import { useEditor } from '@tiptap/react';

import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import { Text } from '@mantine/core';
// import Emoji, { gitHubEmojis } from '@tiptap-pro/extension-emoji';
// import emojisSuggestions from './emojis-suggestions';

export function TextEditor({
  defaultValue,
  placeholder,
  error,
  onChange,
  onBlur,
}: {
  defaultValue?: string;
  placeholder?: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({ placeholder: placeholder }),
      // TODO: Fix emoji extension
      // Emoji.configure({
      //   emojis: gitHubEmojis,
      //   enableEmoticons: true,
      //   suggestion: emojisSuggestions,
      // }),
    ],
    content: defaultValue ? marked.parse(defaultValue) : '',
    onUpdate: ({ editor }) => {
      onChange(new TurndownService().turndown(editor.getHTML()));
    },
    onBlur: () => {
      onBlur?.();
    },
  });

  return (
    <>
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
      {error && (
        <Text size="sm" c="red">
          {error}
        </Text>
      )}
    </>
  );
}
