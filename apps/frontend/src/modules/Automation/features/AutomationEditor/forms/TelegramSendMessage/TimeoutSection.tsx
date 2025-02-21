import { TelegramSendMessageTask } from '@/data/sources/api';
import { UseFormReturnType } from '@mantine/form';
import { TaskSection } from '../../ui/TaskSection';
import { Group, NumberInput, Select, Switch } from '@mantine/core';
import { useState } from 'react';

export function TimeoutSection({
  form,
}: {
  form: UseFormReturnType<TelegramSendMessageTask>;
}) {
  const [isEnabled, setIsEnabled] = useState(Boolean(form.getValues().timeout));

  const handleToggle = () => {
    if (isEnabled) {
      form.setFieldValue('timeout', undefined);
      setIsEnabled(false);
    } else {
      form.setFieldValue('timeout', { duration: 5, unit: 'minutes' });
      setIsEnabled(true);
    }
  };

  return (
    <TaskSection
      title="No response settings"
      description="If user doesn't respond, in..."
      actions={
        <Switch
          size="lg"
          onLabel="ON"
          offLabel="OFF"
          checked={isEnabled}
          onChange={handleToggle}
        />
      }
    >
      {isEnabled && <TimeoutSectionInner form={form} />}
    </TaskSection>
  );
}

function TimeoutSectionInner({
  form,
}: {
  form: UseFormReturnType<TelegramSendMessageTask>;
}) {
  return (
    <Group gap="xs" grow>
      <NumberInput
        key={form.key('timeout.duration')}
        {...form.getInputProps('timeout.duration')}
        label="Duration"
        placeholder="5"
      />
      <Select
        key={form.key('timeout.unit')}
        data={[
          { value: 'seconds', label: 'Seconds' },
          { value: 'minutes', label: 'Minutes' },
          { value: 'hours', label: 'Hours' },
          { value: 'days', label: 'Days' },
        ]}
        {...form.getInputProps('timeout.unit')}
        label="Unit"
        placeholder="Minutes"
      />
    </Group>
  );
}
