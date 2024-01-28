import { FileRoute, Link } from "@tanstack/react-router";
import { getWorkoutByID } from "../../db/queries";

export const Route = new FileRoute("/workout/$id").createRoute({
  component,
  loader,
});

export function component() {
  const workout = Route.useLoaderData();

  if (!workout) {
    return null;
  }

  return (
    <>
      <h1>{workout.workout_name}</h1>
      <p>{workout.workout_description}</p>
      <div>
        <h2>Exercises</h2>
        <ul>
          {workout.exercises?.length &&
            workout.exercises.map((exercise) => (
              <li key={exercise.workout_exercise_id}>
                <h4>{exercise.exercise_name}</h4>
                <ul>
                  {exercise.sets?.length &&
                    exercise.sets.map((set) => (
                      <li key={set.set_id}>
                        {set.reps && <p>Reps: {set.reps}</p>}
                        {set.weight && <p>Weight: {set.weight}</p>}
                        {set.distance && <p>Distance: {set.distance}</p>}
                        {set.time && <p>Time: {set.time}</p>}
                      </li>
                    ))}
                </ul>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export async function loader({ params: { id } }) {
  return await getWorkoutByID(id);
}
