// NOTE: This is more of a controller than a base query (maybe a custom hook?)
export const getExercises = () => `
SELECT
  ExerciseID,
  ExerciseName,
  ExerciseDescription,
  ThumbnailUrl,
  VideoUrl,
  Reps,
  Weight,
  Time,
  Distance,
  json_extract(MuscleGroups, '$') AS MuscleGroups
FROM
  ExerciseWithMuscleGroups;
`;

export const getExercise = (id: string) => `
SELECT
  ExerciseID,
  ExerciseName,
  ExerciseDescription,
  ThumbnailUrl,
  VideoUrl,
  Reps,
  Weight,
  Time,
  Distance,
  json_extract(MuscleGroups, '$') AS MuscleGroups
FROM
  ExerciseWithMuscleGroups
WHERE
  ExerciseID = '${id}';
`;

export const getMuscleGroups = () => `
SELECT
  MuscleGroupID as id,
  MuscleGroupName as name,
  json_extract(Exercises, '$') AS exercises
FROM
    MuscleGroupWithExercises;
`;

export const getMuscleGroup = (id: string) => `
SELECT
    MuscleGroupID as id,
    MuscleGroupName as name,
    json_extract(Exercises, '$') AS exercises
FROM
    MuscleGroupWithExercises
WHERE
    MuscleGroupID = '${id}';
`;
