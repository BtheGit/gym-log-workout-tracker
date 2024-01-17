import { execWithFullReturns } from "../promiser";

// NOTE: This is more of a controller than a base query (maybe a custom hook?)
export const getExercises = async () => {
  const rows = await execWithFullReturns({
    sql: `SELECT
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
`,
  });
  const exercises = rows.map(({ columnNames, row }) =>
    row.reduce((acc, curr, idx) => {
      if (columnNames[idx] === "MuscleGroups") {
        curr = JSON.parse(curr);
      }
      acc[columnNames[idx]] = curr;
      return acc;
    }, {})
  );
  return exercises;
};

export const getExercise = async (id) => {
  const rows = await execWithFullReturns({
    sql: `SELECT
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
        ExerciseID = '${id}'
        ;
    `,
  });
  const exercises = rows.map(({ columnNames, row }) =>
    row.reduce((acc, curr, idx) => {
      if (columnNames[idx] === "MuscleGroups") {
        curr = JSON.parse(curr);
      }
      acc[columnNames[idx]] = curr;
      return acc;
    }, {})
  );
  return exercises[0];
};
