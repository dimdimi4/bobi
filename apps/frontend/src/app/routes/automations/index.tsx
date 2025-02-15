import { Button, Container, Group, Modal, Title } from '@mantine/core';
import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { automationsQueryOptions } from '@/data/repositories/automations-repository';
import { CreateAutomation } from '@/modules/Automation/features/CreateAutomation';
import { useDisclosure } from '@mantine/hooks';
import { AutomationDto } from '@/data/sources/api';

export const Route = createFileRoute('/automations/')({
  component: RouteComponent,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(automationsQueryOptions),
});

function RouteComponent() {
  const data = Route.useLoaderData();
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);

  const onAutomationCreated = (automation: AutomationDto) => {
    router.invalidate();
    router.navigate({
      to: '/automation-editor/$id',
      params: { id: automation.id },
    });
  };

  return (
    <Container size="sm">
      <Group justify="space-between">
        <Title order={3}>Automations</Title>
        <Button variant="outline" size="xs" onClick={open}>
          Create Automation
        </Button>
      </Group>
      <ul>
        {data.results.map((automation) => (
          <li key={automation.id}>
            <Link to={`/automations/$id/view`} params={{ id: automation.id }}>
              {automation.name}
            </Link>
          </li>
        ))}
      </ul>
      <Modal opened={opened} onClose={close} title="Create Automation">
        <CreateAutomation onSuccess={onAutomationCreated} />
      </Modal>
    </Container>
  );
}
