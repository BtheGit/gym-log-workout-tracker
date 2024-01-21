import { db } from "../db";

type IExerciseView = {
  ExerciseID: string;
  ExerciseName: string;
  ExerciseDescription: string;
  ThumbnailUrl: string;
  VideoUrl: string;
  Reps: number;
  Weight: number;
  Time: number;
  Distance: number;
  MuscleGroups: {
    id: string;
    name: string;
  }[];
};

// TODO: Probably combine data shaping callbacks into one function
export const getExercises = async () => {
  const result = await db.exec({
    sql: `
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
  `,
  });
  const exercises: IExerciseView[] = result.map(({ columnNames, row }) =>
    row.reduce((acc, curr, idx) => {
      if (columnNames[idx] === "MuscleGroups") {
        curr = JSON.parse(curr);
      }
      acc[columnNames[idx]!] = curr;
      return acc;
    }, {})
  );
  return exercises;
};

export const getExerciseById = async (id: string) => {
  const result = await db.exec({
    sql: `
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
    `,
  });

  const exercises: IExerciseView[] = result.map(({ columnNames, row }) =>
    row.reduce(
      (acc: { [key: string]: unknown }, curr: unknown, idx: number) => {
        // TODO: Figure out how to parse JSON arbitrarily
        if (columnNames[idx] === "MuscleGroups") {
          curr = JSON.parse(curr as string);
        }
        acc[columnNames[idx]!] = curr;
        return acc as IExerciseView;
      },
      {} as IExerciseView
    )
  );
  if (exercises[0]) {
    return exercises[0];
  }
};

type IMuscleGroupWithExercisesView = {
  id: string;
  name: string;
  exercises: { ExerciseID: string; ExerciseName: string }[];
};

export const getMuscleGroups = async () => {
  const result = await db.exec({
    sql: `
    SELECT
      MuscleGroupID as id,
      MuscleGroupName as name,
      json_extract(Exercises, '$') AS exercises
    FROM
        MuscleGroupWithExercises;
    `,
  });
  const muscleGroups: IMuscleGroupWithExercisesView[] = result.map(
    ({ columnNames, row }) =>
      row.reduce((acc, curr, idx) => {
        if (columnNames[idx] === "exercises") {
          curr = JSON.parse(curr);
        }
        acc[columnNames[idx]!] = curr;
        return acc;
      }, {})
  );
  return muscleGroups;
};

export const getMuscleGroupById = async (id: string) => {
  const result = await db.exec({
    sql: `
    SELECT
        MuscleGroupID as id,
        MuscleGroupName as name,
        json_extract(Exercises, '$') AS exercises
    FROM
        MuscleGroupWithExercises
    WHERE
        MuscleGroupID = '${id}';
    `,
  });

  const muscleGroups: IMuscleGroupWithExercisesView[] = result.map(
    ({ columnNames, row }) =>
      row.reduce(
        (acc: { [key: string]: unknown }, curr: unknown, idx: number) => {
          if (columnNames[idx] === "exercises") {
            curr = JSON.parse(curr as string);
          }
          acc[columnNames[idx]!] = curr;
          return acc as IMuscleGroupWithExercisesView;
        },
        {} as IMuscleGroupWithExercisesView
      )
  );

  if (muscleGroups[0]) {
    return muscleGroups[0];
  }
};
