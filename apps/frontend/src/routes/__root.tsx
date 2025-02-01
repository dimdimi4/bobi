import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: () => (
    <>
      <ul>
        <li>
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="[&.active]:font-bold">
            About
          </Link>
        </li>
        <li>
          <Link to="/channels" className="[&.active]:font-bold">
            Channels
          </Link>
        </li>
      </ul>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
