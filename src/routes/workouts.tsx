import { FileRoute, Link } from "@tanstack/react-router";
import { getWorkouts } from "../db/queries";
import "./exercises.css";

export const Route = new FileRoute("/workouts").createRoute({
  component,
  loader,
});

export function component() {
  const workouts = Route.useLoaderData();

  if (!workouts) {
    return null;
  }

  return (
    <>
      <h1>Workouts</h1>
      <ul>
        {workouts.map((workout) => (
          <li key={workout.workout_id}>
            <Link to={`/workout/$id`} params={{ id: workout.workout_id }}>
              <h3>{workout.workout_name}</h3>
              <p>{workout.workout_description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function loader() {
  // TODO: ensure default sorting here. (Obviously to support more sorting later)
  return await getWorkouts();
}
