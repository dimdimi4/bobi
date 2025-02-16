import { useForm } from '@tanstack/react-form';
import { TelegramSendMessageTask } from '@/data/sources/api';

export function useTelegramSendMessage({
  task,
}: {
  task: TelegramSendMessageTask;
}) {
  const form = useForm<TelegramSendMessageTask>({
    defaultValues: task,
  });

  return {
    form,
  };
}
