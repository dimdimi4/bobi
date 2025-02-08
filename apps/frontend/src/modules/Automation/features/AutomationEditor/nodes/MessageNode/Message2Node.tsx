import { Node, NodeProps } from '@xyflow/react';

import { EditorNode } from '../../ui/EditorNode';
import { Button, Group, Text } from '@mantine/core';

type MessageNode = Node<{ label: string }, 'message'>;

export function Message2Node({ data }: NodeProps<MessageNode>) {
  return (
    <EditorNode>
      <EditorNode.InputHandle text="Send message" />
      <EditorNode.BodyContainer>
        <Group gap="xs">
          <Text fz="xs" lh="xs">
            1️⃣ Чем ты занимаешься? Из какой ты ниши?
          </Text>
          <Text fz="xs" lh="xs" p={0}>
            Выбери один вариант:
          </Text>
        </Group>
      </EditorNode.BodyContainer>
      <EditorNode.OutputHandle id="a">
        <Button.Group>
          <Button.GroupSection variant="default" size="xs" w="100%">
            Коучинг
          </Button.GroupSection>
        </Button.Group>
      </EditorNode.OutputHandle>
      <EditorNode.OutputHandle id="b">
        <Button.Group>
          <Button.GroupSection variant="default" size="xs" w="100%">
            Психолог
          </Button.GroupSection>
        </Button.Group>
      </EditorNode.OutputHandle>
      <EditorNode.OutputHandle id="c">
        <Button.Group>
          <Button.GroupSection variant="default" size="xs" w="100%">
            Креатор / Артист
          </Button.GroupSection>
        </Button.Group>
      </EditorNode.OutputHandle>
      <EditorNode.OutputHandle id="d">
        <Button.Group>
          <Button.GroupSection variant="default" size="xs" w="100%">
            Эзотерик
          </Button.GroupSection>
        </Button.Group>
      </EditorNode.OutputHandle>
      <EditorNode.OutputHandle id="e">
        <Button.Group>
          <Button.GroupSection variant="default" size="xs" w="100%">
            Другое
          </Button.GroupSection>
        </Button.Group>
      </EditorNode.OutputHandle>
      <EditorNode.OutputHandle text="If no replay, then" id="then" altHandle />
    </EditorNode>
  );
}
