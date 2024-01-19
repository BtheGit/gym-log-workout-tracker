import { useQueryStringValue, useMuscleGroup } from "./React/hooks";

export const MuscleGroup = () => {
  const id = useQueryStringValue("id");
  const muscleGroup = useMuscleGroup(id);

  // NOTE: It might make sense to just query muscle groups and find by id, however, with the DB local and built in caching, hard to really care too much until we hit issues.
  console.log(muscleGroup);
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
            <a href={`/exercise?id=${exercise.ExerciseID}`}>
              {exercise.ExerciseName}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};
