import { getMuscleGroupById } from "../../db/queries";
import { FileRoute, Link } from "@tanstack/react-router";

export const Route = new FileRoute("/muscle-group/$id").createRoute({
  component,
  loader,
});

export function component() {
  const muscleGroup = Route.useLoaderData();

  // NOTE: It might make sense to just query muscle groups and find by id, however, with the DB local and built in caching, hard to really care too much until we hit issues.
  if (!muscleGroup) {
    return null;
  }

  return (
    <>
      <h1>{muscleGroup.name}</h1>
      <h4>Exercises</h4>
      <ul>
        {muscleGroup.exercises.map((exercise) => (
          <li key={exercise.exercise_id}>
            <Link to={`/exercise/$id`} params={{ id: exercise.exercise_id }}>
              {exercise.exercise_name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function loader({ params: { id } }) {
  return await getMuscleGroupById(id);
}
