import { Menu } from '@mantine/core';

import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

export const EmojiList = forwardRef((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index) => {
    const item = props.items[index];

    if (item) {
      props.command({ name: item.name });
    }
  };

  const upHandler = () => {
    setSelectedIndex(
      (selectedIndex + props.items.length - 1) % props.items.length
    );
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => {
    return {
      onKeyDown: (x) => {
        if (x.event.key === 'ArrowUp') {
          upHandler();
          return true;
        }

        if (x.event.key === 'ArrowDown') {
          downHandler();
          return true;
        }

        if (x.event.key === 'Enter') {
          enterHandler();
          return true;
        }

        return false;
      },
    };
  }, [upHandler, downHandler, enterHandler]);

  return (
    <Menu opened withinPortal={false}>
      <Menu.Dropdown>
        {props.items.map((item, index) => (
          <Menu.Item
            key={index}
            leftSection={
              item.fallbackImage ? <img src={item.fallbackImage} /> : item.emoji
            }
            onClick={() => selectItem(index)}
          >
            :{item.name}:
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
});

{
  /*
          // className={index === selectedIndex ? 'is-selected' : ''}
  <Menu.Item leftSection={<IconSettings size={14} />}>
          Settings
        </Menu.Item> */
}
