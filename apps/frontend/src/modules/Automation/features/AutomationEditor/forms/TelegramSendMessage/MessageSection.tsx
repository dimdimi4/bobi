import { UseFormReturnType } from '@mantine/form';

import { TelegramSendMessageTask } from '@/data/sources/api';

import { TextEditor } from '../../ui/TextEditor';
import { TaskSection } from '../../ui/TaskSection';

export function MessageSection({
  form,
}: {
  form: UseFormReturnType<TelegramSendMessageTask>;
}) {
  return (
    <TaskSection
      title="Message"
      description="Message that will be sent to the user"
    >
      <TextEditor
        key={form.key('message')}
        {...form.getInputProps('message')}
        placeholder="Type your message here..."
      />
    </TaskSection>
  );
}
