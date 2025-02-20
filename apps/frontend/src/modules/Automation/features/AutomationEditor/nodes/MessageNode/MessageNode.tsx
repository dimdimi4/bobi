import Markdown, { ReactRenderer } from 'marked-react';
import { Anchor, Button, Code, Stack, Text } from '@mantine/core';
import { Node, NodeProps } from '@xyflow/react';

import { AutomationTask } from '@/data/sources/api';

import { EditorNode } from '../../ui/EditorNode';

type ActionsTypes = Pick<AutomationTask, 'action_telegram_sendMessage'>;
type MessageNode = Node<ActionsTypes, 'message'>;

const renderer: Partial<ReactRenderer> = {
  paragraph(children) {
    return <Text>{children}</Text>;
  },
  link(href, children) {
    return (
      <Anchor href={href} target="_blank">
        {children}
      </Anchor>
    );
  },
  codespan(children) {
    return <Code>{children}</Code>;
  },
};

export function MessageNode({ data }: NodeProps<MessageNode>) {
  return (
    <EditorNode>
      <Stack gap={6}>
        <EditorNode.Body>
          <EditorNode.BodyContainer>
            <EditorNode.InputHandle text="Send message" />
          </EditorNode.BodyContainer>
          <EditorNode.BodyContainer>
            <EditorNode.BodyContent>
              {data.action_telegram_sendMessage && (
                <Markdown renderer={renderer}>
                  {data.action_telegram_sendMessage?.message}
                </Markdown>
              )}
            </EditorNode.BodyContent>
          </EditorNode.BodyContainer>
          <EditorNode.OutputHandle
            text="If no replay, then"
            id="then"
            altHandle
          />
        </EditorNode.Body>
        {data.action_telegram_sendMessage?.quickReplyButtons?.map((button) => (
          <EditorNode.OutputHandle key={button.text} id={button.id}>
            <Button variant="light" size="xs" fullWidth>
              {button.text}
            </Button>
          </EditorNode.OutputHandle>
        ))}
      </Stack>
    </EditorNode>
  );
}
