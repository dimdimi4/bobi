import { useEffect } from 'react';
import { useCreateAutomationMutation } from '@/data/repositories/automations-repository';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';

import { CreateAutomationProps } from '../types';

const formSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
    })
    .min(3, { message: 'Name must be at least 3 characters' })
    .max(255, { message: 'Name must be less than 255 characters' }),
});

export function useCreateAutomation({ onSuccess }: CreateAutomationProps) {
  const form = useForm({
    defaultValues: {
      name: '',
    },
    onSubmit: ({ value }) => mutate(value),
    validators: {
      onChange: formSchema,
    },
  });

  const { mutate, data, isSuccess } = useCreateAutomationMutation();

  useEffect(() => {
    if (isSuccess && data) {
      onSuccess?.(data.automation);
    }
  }, [data, onSuccess, isSuccess]);

  return { form };
}
