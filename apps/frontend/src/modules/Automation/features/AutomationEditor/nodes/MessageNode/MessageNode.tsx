import Markdown, { ReactRenderer } from 'marked-react';
import { Anchor, Code, Stack, Text, Tooltip } from '@mantine/core';
import { Node, NodeProps, Position } from '@xyflow/react';
import { v4 as uuidv4 } from 'uuid';
import { AutomationTask, TelegramQuickReplyButton } from '@/data/sources/api';

import styles from './MessageNode.module.css';

import { EditorNode } from '../../ui/EditorNode';
import { IconExternalLink } from '@tabler/icons-react';

type ActionsTypes = Pick<AutomationTask, 'action_telegram_sendMessage'>;
type MessageNode = Node<ActionsTypes, 'message'>;

const renderer: Partial<ReactRenderer> = {
  paragraph(children) {
    return <Text key={uuidv4()}>{children}</Text>;
  },
  link(href, children) {
    return (
      <Anchor href={href} target="_blank" key={uuidv4()}>
        {children}
      </Anchor>
    );
  },
  codespan(children) {
    return <Code key={uuidv4()}>{children}</Code>;
  },
};

export function MessageNode({
  data: { action_telegram_sendMessage },
}: NodeProps<MessageNode>) {
  if (!action_telegram_sendMessage) {
    return null;
  }

  const { message, quickReplyButtons, timeout } = action_telegram_sendMessage;

  return (
    <EditorNode>
      <EditorNode.HandleContainer padded input>
        <EditorNode.InputHandle position={Position.Left} />
        <Text fw={500} size="sm" c="gray" component="div">
          Send message
        </Text>
      </EditorNode.HandleContainer>
      <EditorNode.Section>
        <EditorNode.Body>
          <Markdown renderer={renderer} key="send-message">
            {message}
          </Markdown>
        </EditorNode.Body>
      </EditorNode.Section>
      <Stack gap="xs">
        {quickReplyButtons?.map((button) => (
          <EditorNode.HandleContainer
            padded={{ x: true }}
            key={button.id}
            output
          >
            <QuickReplyButton button={button} />
            <EditorNode.OutputHandle id={button.id} position={Position.Right} />
          </EditorNode.HandleContainer>
        ))}
      </Stack>
      <EditorNode.HandleContainer padded justify="flex-end" output>
        <Text fw={600} size="sm" c="dimmed" component="div">
          {timeout
            ? `If no reply in ${timeout.duration} ${timeout.unit}`
            : 'Then'}
        </Text>
        <EditorNode.OutputHandle position={Position.Right} />
      </EditorNode.HandleContainer>
    </EditorNode>
  );
}

function QuickReplyButton({ button }: { button: TelegramQuickReplyButton }) {
  const prefix = button.url ? (
    <Tooltip label={button.url} withArrow>
      <IconExternalLink size={20} stroke={1.5} />
    </Tooltip>
  ) : null;

  return (
    <div className={styles.quickReplyButton}>
      <div className={styles.quickReplyButtonPrefix}>{prefix}</div>
      <div className={styles.quickReplyButtonText}>{button.text}</div>
    </div>
  );
}
