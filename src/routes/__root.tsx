import { Link, Outlet, RootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import "./__root.css";

export const Route = new RootRoute({
  component: () => (
    <>
      <nav className="site-nav">
        <Link className="nav-link" to="/">
          Home
        </Link>
        <Link className="nav-link" to="/programs">
          Programs
        </Link>
        <Link className="nav-link" to="/workouts">
          Workouts
        </Link>
        <Link className="nav-link" to="/exercises">
          Exercises
        </Link>
        <Link className="nav-link" to="/muscle-groups">
          Muscle Groups
        </Link>
      </nav>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
