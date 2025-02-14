import { Button, Group, Stack, TextInput } from '@mantine/core';
import { useCreateAutomation } from './hooks/use-create-automation';
import { CreateAutomationProps } from './types';

export function CreateAutomation({ onSuccess }: CreateAutomationProps) {
  const { form } = useCreateAutomation({ onSuccess });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <Stack>
        <form.Field
          name="name"
          children={(field) => (
            <TextInput
              placeholder="Give your automation a name"
              label="Name"
              defaultValue={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              error={field.state.meta.errors.join(', ')}
            />
          )}
        />
        <Group justify="flex-end">
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                disabled={!canSubmit}
                loading={isSubmitting}
              >
                Submit
              </Button>
            )}
          />
        </Group>
      </Stack>
    </form>
  );
}
