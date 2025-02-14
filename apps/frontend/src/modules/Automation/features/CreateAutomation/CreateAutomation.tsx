import {
  Button,
  Group,
  SegmentedControl,
  Stack,
  TagsInput,
  TextInput,
  Title,
} from '@mantine/core';
import { useCreateAutomation } from './hooks/use-create-automation';
import { CreateAutomationProps } from './types';

export function CreateAutomation({ onSuccess }: CreateAutomationProps) {
  const { form, triggerConditions } = useCreateAutomation({ onSuccess });

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
              autoFocus={true}
              defaultValue={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field.state.meta.errors.join(', ')}
            />
          )}
        />
        <Title order={4}>Trigger on message</Title>
        <form.Field
          name="trigger.condition"
          children={(field) => (
            <SegmentedControl
              fullWidth
              data={triggerConditions}
              defaultValue={field.state.value}
              onChange={(e) => field.handleChange(e)}
            />
          )}
        />
        <form.Field
          name="trigger.templates"
          children={(field) => (
            <TagsInput
              label="Type message and press Enter"
              placeholder="Enter message"
              value={field.state.value}
              onChange={(e) => field.handleChange(e)}
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
