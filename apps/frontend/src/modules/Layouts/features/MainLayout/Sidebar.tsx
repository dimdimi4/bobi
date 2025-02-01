import { NavLink } from '@mantine/core';
import { IconAffiliate, IconHome2, IconInfoHexagon } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';

export function Sidebar() {
  return (
    <>
      <NavLink
        to="/"
        label="Home"
        leftSection={<IconHome2 size={16} stroke={1.5} />}
        component={Link}
      />
      <NavLink
        to="/about"
        label="About"
        leftSection={<IconInfoHexagon size={16} stroke={1.5} />}
        component={Link}
      />
      <NavLink
        to="/channels"
        label="Channels"
        leftSection={<IconAffiliate size={16} stroke={1.5} />}
        component={Link}
      />
    </>
  );
}
