import { FileRoute, Outlet } from "@tanstack/react-router";

export const Route = new FileRoute("/workout/$id").createRoute({
  component,
});

export function component() {
  return <Outlet />;
}
