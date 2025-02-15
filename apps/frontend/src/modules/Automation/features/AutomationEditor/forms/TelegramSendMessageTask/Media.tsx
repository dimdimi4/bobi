import {
  Stack,
  Text,
  Paper,
  Group,
  Center,
  SegmentedControl,
} from '@mantine/core';
import {
  IconPhoto,
  IconX,
  IconUpload,
  IconVideo,
  IconMusic,
  IconFile,
} from '@tabler/icons-react';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useState } from 'react';

export function Media() {
  const [mediaType, setMediaType] = useState<string>('image');

  return (
    <Paper p="sm" withBorder>
      <Stack gap="xs">
        <Text size="lg" fw={500}>
          Media <br />
          <Text size="sm" c="dimmed" component="span">
            Choose a media file to send to the user.
          </Text>
        </Text>
        <SegmentedControl
          fullWidth
          value={mediaType}
          onChange={(value: string) => setMediaType(value)}
          data={[
            {
              value: 'image',
              label: (
                <Center style={{ gap: 10 }}>
                  <IconPhoto size={16} />
                  <span>Image</span>
                </Center>
              ),
            },
            {
              value: 'video',
              label: (
                <Center style={{ gap: 10 }}>
                  <IconVideo size={16} />
                  <span>Video</span>
                </Center>
              ),
            },
            {
              value: 'audio',
              label: (
                <Center style={{ gap: 10 }}>
                  <IconMusic size={16} />
                  <span>Audio</span>
                </Center>
              ),
            },
            {
              value: 'file',
              label: (
                <Center style={{ gap: 10 }}>
                  <IconFile size={16} />
                  <span>File</span>
                </Center>
              ),
            },
          ]}
        />
        <Dropzone
          onDrop={(files) => console.log('accepted files', files)}
          onReject={(files) => console.log('rejected files', files)}
          maxSize={5 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
        >
          <Group
            justify="center"
            gap="md"
            mih={40}
            style={{ pointerEvents: 'none' }}
          >
            <Dropzone.Accept>
              <IconUpload
                size={24}
                color="var(--mantine-color-blue-6)"
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                size={24}
                color="var(--mantine-color-red-6)"
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto
                size={24}
                color="var(--mantine-color-dimmed)"
                stroke={1.5}
              />
            </Dropzone.Idle>
            <div>
              <Text size="md" inline>
                Drag images here or click to select files
              </Text>
              <Text size="xs" c="dimmed" inline mt={7}>
                Attach as many files as you like, each file should not exceed
                5mb
              </Text>
            </div>
          </Group>
        </Dropzone>
      </Stack>
    </Paper>
  );
}
