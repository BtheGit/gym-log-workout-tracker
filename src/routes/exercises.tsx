import { FileRoute, Link } from "@tanstack/react-router";
import { getExercises } from "../db/queries";
import "./exercises.css";

export const Route = new FileRoute("/exercises").createRoute({
  component,
  loader,
});

export function component() {
  const exercises = Route.useLoaderData();

  if (!exercises) {
    return null;
  }

  return (
    <>
      <h1>Exercises</h1>
      {exercises.map((exercise, idx) => (
        <div className="list-wrapper" key={idx}>
          <ul className="list">
            <li className="list-item">
              {exercise.ThumbnailUrl && (
                <img src={exercise.ThumbnailUrl} alt={exercise.ExerciseName} />
              )}

              <div className="item-content">
                <Link to={`/exercise/$id`} params={{ id: exercise.ExerciseID }}>
                  <h2>{exercise.ExerciseName}</h2>
                </Link>
                {/* Insert rendered description (md -> html) */}
                <h4>Muscle Groups</h4>
                <ul>
                  {exercise.MuscleGroups.map((muscleGroup, idx) => (
                    <Link
                      to={`/muscle-group/$id`}
                      params={{ id: muscleGroup.id }}
                      key={idx}
                    >
                      {muscleGroup.name}
                    </Link>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
      ))}
    </>
  );
}

export async function loader() {
  return await getExercises();
}
