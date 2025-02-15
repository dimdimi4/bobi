import { Paper, Stack, Title } from '@mantine/core';
import { useState } from 'react';

import { TextEditor } from './ui/TextEditor';

const initialMessage = `
<p>Привет! На связи Катя Каменецки.</p>
<p>Если ты здесь, значит, тебе интересно развиваться и расти в продажах
в 2025 году.</p>
<p>Ты попала в нужное место в нужное время 😍</p>
<p>Я записала для тебя супер актуальный урок: "Как вести блог и
продавать психологам, эзотерикам и креаторам в 2025 году" 🌟</p>
<p>Но прежде чем я отправлю тебе его, ответь, пожалуйста, на несколько
вопросов, чтобы мы поближе познакомились 👇</p>
`;

export function SendMessageForm() {
  const [message, setMessage] = useState(initialMessage);

  return (
    <Stack>
      <Paper p="md">
        <Stack gap="xs">
          <Title order={4}>Message</Title>
          <TextEditor
            value={message}
            onChange={setMessage}
            placeholder="Type your message here..."
          />
        </Stack>
      </Paper>
      <Paper p="md">
        <pre>{message}</pre>
      </Paper>
    </Stack>
  );
}
