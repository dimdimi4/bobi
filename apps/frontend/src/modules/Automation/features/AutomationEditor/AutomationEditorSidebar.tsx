import { TelegramSendMessage } from './forms/TelegramSendMessage';

import { useEditorStore } from './store';
import { useUpdateStateTask } from './hooks/use-update-state-task';

export function AutomationEditorSidebar() {
  const { selectedNode } = useEditorStore((s) => s);
  const { handleUpdateStateTask } = useUpdateStateTask();

  if (selectedNode?.data.action_telegram_sendMessage) {
    return (
      <TelegramSendMessage
        key={selectedNode.id}
        initialValues={selectedNode?.data.action_telegram_sendMessage}
        onSubmit={(value) => {
          handleUpdateStateTask({
            action_telegram_sendMessage: value,
          });
        }}
      />
    );
  }
}
