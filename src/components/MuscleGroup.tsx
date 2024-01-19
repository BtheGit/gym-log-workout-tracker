import { useMuscleGroup } from "./hooks";
import { useParams } from "react-router-dom";

export const MuscleGroup = () => {
  const id = useParams<{ id: string }>().id!;
  const muscleGroup = useMuscleGroup(id);

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
            <a href={`/exercise/${exercise.ExerciseID}`}>
              {exercise.ExerciseName}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};
