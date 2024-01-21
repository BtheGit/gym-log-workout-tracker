import { FileRoute, Link } from "@tanstack/react-router";
import { getExerciseById } from "../../db/queries";

export const Route = new FileRoute("/exercise/$id").createRoute({
  component,
  loader,
});

export function component() {
  const exercise = Route.useLoaderData();

  if (!exercise) {
    return null;
  }

  return (
    <>
      {exercise.thumbnail_url && (
        <img src={exercise.thumbnail_url} alt={exercise.exercise_name} />
      )}

      <div className="item-content">
        <h2>{exercise.exercise_name}</h2>
        {/* Insert rendered description (md -> html) */}
        <h4>Muscle Groups</h4>
        <ul>
          {exercise.muscle_groups.map(
            (muscleGroup: { id: string; name: string }) => (
              <li key={muscleGroup.id}>
                <Link to={`/muscle-group/$id`} params={{ id: muscleGroup.id }}>
                  {muscleGroup.name}
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
    </>
  );
}

export async function loader({ params: { id } }) {
  return await getExerciseById(id);
}
