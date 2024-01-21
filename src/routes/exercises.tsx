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
              {exercise.thumbnail_url && (
                <img
                  src={exercise.thumbnail_url}
                  alt={exercise.exercise_name}
                />
              )}

              <div className="item-content">
                <Link
                  to={`/exercise/$id`}
                  params={{ id: exercise.exercise_id }}
                >
                  <h2>{exercise.exercise_name}</h2>
                </Link>
                {/* Insert rendered description (md -> html) */}
                <h4>Muscle Groups</h4>
                <ul>
                  {exercise.muscle_groups.map((muscleGroup, idx) => (
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
