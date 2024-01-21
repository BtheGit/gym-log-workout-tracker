import { getMuscleGroupById } from "../../db/queries";
import { useLoaderData, Link } from "react-router-dom";

export const component = () => {
  const muscleGroup = useLoaderData();

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
          <li key={exercise.ExerciseID}>
            <Link to={`/exercise/${exercise.ExerciseID}`}>
              {exercise.ExerciseName}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export const loader = async (id) => {
  return await getMuscleGroupById(id);
};
