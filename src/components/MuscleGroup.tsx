import { useQueryStringValue, useMuscleGroup } from "./React/hooks";

export const MuscleGroup = () => {
  const id = useQueryStringValue("id");
  const muscleGroup = useMuscleGroup(id);

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
