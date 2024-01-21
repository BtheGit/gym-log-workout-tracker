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
      {exercise.ThumbnailUrl && (
        <img src={exercise.ThumbnailUrl} alt={exercise.ExerciseName} />
      )}

      <div className="item-content">
        <h2>{exercise.ExerciseName}</h2>
        {/* Insert rendered description (md -> html) */}
        <h4>Muscle Groups</h4>
        <ul>
          {exercise.MuscleGroups.map(
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
