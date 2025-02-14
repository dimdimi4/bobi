import {
  Button,
  Card,
  Container,
  Group,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@tanstack/react-form';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/channels/add-channel')({
  component: RouteComponent,
});

const formSchema = z.object({
  name: z.string().min(12, { message: 'Name must be at least 12 characters' }),
  type: z.string().min(12, { message: 'Type must be at least 12 characters' }),
  token: z
    .string()
    .min(12, { message: 'Token must be at least 12 characters' }),
});

function RouteComponent() {
  const form = useForm({
    defaultValues: {
      name: '',
      type: '',
      token: '',
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value);
    },
    validators: {
      onChange: formSchema,
    },
  });

  return (
    <Container size="sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <Stack gap="md">
          <Title order={3}>Add Channel</Title>
          <Card withBorder shadow="xs">
            <Stack gap="sm">
              <form.Field
                name="name"
                children={(field) => (
                  <TextInput
                    label="Name"
                    placeholder="Name"
                    defaultValue={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    error={field.state.meta.errors.join(', ')}
                  />
                )}
              />
              <form.Field
                name="type"
                children={(field) => (
                  <TextInput
                    label="Type"
                    placeholder="Type"
                    defaultValue={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    error={field.state.meta.errors.join(', ')}
                    onBlur={field.handleBlur}
                  />
                )}
              />
              <form.Field
                name="token"
                children={(field) => (
                  <TextInput
                    label="Token"
                    placeholder="Token"
                    defaultValue={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    error={field.state.meta.errors.join(', ')}
                    onBlur={field.handleBlur}
                  />
                )}
              />
            </Stack>
          </Card>
          {!form.state.isValid && (
            <Text size="sm">Please fill in all fields correctly.</Text>
          )}
          <Group gap="sm" align="flex-start">
            <Button
              type="submit"
              variant="filled"
              disabled={!form.state.canSubmit}
            >
              Create
            </Button>
            <Button variant="subtle" color="gray">
              Discard
            </Button>
          </Group>
        </Stack>
        <pre>{JSON.stringify(form.state.values, null, 2)}</pre>
      </form>
    </Container>
  );
}
