import { FileRoute } from "@tanstack/react-router";
import { WorkoutEditor } from "../../../components/TemplateEditors/WorkoutEditor";
import { getWorkoutByID } from "../../../db/queries";

export const Route = new FileRoute("/workout/$id/edit").createRoute({
  component,
  loader,
});

export function component() {
  const workout = Route.useLoaderData();

  if (!workout) {
    // TODO: 404 kinds of stuff
    return null;
  }

  return (
    <>
      <h1>Edit Workout</h1>
      <WorkoutEditor workout={workout} />
    </>
  );
}

export async function loader({ params: { id } }) {
  return await getWorkoutByID(id);
}
