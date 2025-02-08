import { Node, NodeProps } from '@xyflow/react';

import { EditorNode } from '../../ui/EditorNode';
import { Button, Group, Image, Text } from '@mantine/core';

type MessageNode = Node<{ label: string }, 'message'>;

export function MessageNode({ data }: NodeProps<MessageNode>) {
  return (
    <EditorNode>
      <EditorNode.InputHandle text="Send message" />
      <EditorNode.BodyContainer>
        <Group gap="xs">
          <Image
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
            height={140}
            alt="Norway"
          />
          <Text fz="xs" lh="xs">
            Привет! На связи Катя Каменецки.{' '}
          </Text>
          <Text fz="xs" lh="xs" p={0}>
            Если ты здесь, значит, тебе интересно развиваться и расти в продажах
            в 2025 году.
          </Text>
          <Text fz="xs" lh="xs">
            Ты попала в нужное место в нужное время 😍
          </Text>
          <Text fz="xs" lh="xs">
            Я записала для тебя супер актуальный урок: "Как вести блог и
            продавать психологам, эзотерикам и креаторам в 2025 году" 🌟
          </Text>
          <Text fz="xs" lh="xs">
            Но прежде чем я отправлю тебе его, ответь, пожалуйста, на несколько
            вопросов, чтобы мы поближе познакомились 👇
          </Text>
        </Group>
      </EditorNode.BodyContainer>
      <EditorNode.OutputHandle id="then2">
        <Button.Group>
          <Button.GroupSection variant="default" size="xs" w="100%">
            Хорошо
          </Button.GroupSection>
        </Button.Group>
      </EditorNode.OutputHandle>
      <EditorNode.OutputHandle text="If no replay, then" id="then" altHandle />
    </EditorNode>
  );
}
