import { db } from "../db";
import {
  ExerciseWithMuscleGroupsView,
  MuscleGroupWithExercisesView,
} from "../constants";

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
    ${ExerciseWithMuscleGroupsView.cols.ExerciseID},
    ${ExerciseWithMuscleGroupsView.cols.ExerciseName},
    ${ExerciseWithMuscleGroupsView.cols.ExerciseDescription},
    ${ExerciseWithMuscleGroupsView.cols.ThumbnailUrl},
    ${ExerciseWithMuscleGroupsView.cols.VideoUrl},
    ${ExerciseWithMuscleGroupsView.cols.Reps},
    ${ExerciseWithMuscleGroupsView.cols.Weight},
    ${ExerciseWithMuscleGroupsView.cols.Time},
    ${ExerciseWithMuscleGroupsView.cols.Distance},
    json_extract(${ExerciseWithMuscleGroupsView.cols.MuscleGroups.name}, '$') AS ${ExerciseWithMuscleGroupsView.cols.MuscleGroups.name}
  FROM
    ${ExerciseWithMuscleGroupsView.name};
  `,
  });
  const exercises: IExerciseView[] = result.map(({ columnNames, row }) =>
    row.reduce((acc, curr, idx) => {
      if (
        columnNames[idx] === ExerciseWithMuscleGroupsView.cols.MuscleGroups.name
      ) {
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
      ${ExerciseWithMuscleGroupsView.cols.ExerciseID},
      ${ExerciseWithMuscleGroupsView.cols.ExerciseName},
      ${ExerciseWithMuscleGroupsView.cols.ExerciseDescription},
      ${ExerciseWithMuscleGroupsView.cols.ThumbnailUrl},
      ${ExerciseWithMuscleGroupsView.cols.VideoUrl},
      ${ExerciseWithMuscleGroupsView.cols.Reps},
      ${ExerciseWithMuscleGroupsView.cols.Weight},
      ${ExerciseWithMuscleGroupsView.cols.Time},
      ${ExerciseWithMuscleGroupsView.cols.Distance},
      json_extract(${ExerciseWithMuscleGroupsView.cols.MuscleGroups.name}, '$') AS ${ExerciseWithMuscleGroupsView.cols.MuscleGroups.name}
    FROM
      ${ExerciseWithMuscleGroupsView.name}
    WHERE
      ${ExerciseWithMuscleGroupsView.cols.ExerciseID} = '${id}';
    `,
  });

  const exercises: IExerciseView[] = result.map(({ columnNames, row }) =>
    row.reduce(
      (acc: { [key: string]: unknown }, curr: unknown, idx: number) => {
        // TODO: Figure out how to parse JSON arbitrarily
        if (
          columnNames[idx] ===
          ExerciseWithMuscleGroupsView.cols.MuscleGroups.name
        ) {
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
  Exercises: { ExerciseID: string; ExerciseName: string }[];
};

export const getMuscleGroups = async () => {
  const result = await db.exec({
    sql: `
    SELECT
      ${MuscleGroupWithExercisesView.cols.MuscleGroupID} as id,
      ${MuscleGroupWithExercisesView.cols.MuscleGroupName} as name,
      json_extract(${MuscleGroupWithExercisesView.cols.Exercises.name}, '$') AS ${MuscleGroupWithExercisesView.cols.Exercises.name}
    FROM
      ${MuscleGroupWithExercisesView.name};
    `,
  });
  const muscleGroups: IMuscleGroupWithExercisesView[] = result.map(
    ({ columnNames, row }) =>
      row.reduce((acc, curr, idx) => {
        if (
          columnNames[idx] === MuscleGroupWithExercisesView.cols.Exercises.name
        ) {
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
      ${MuscleGroupWithExercisesView.cols.MuscleGroupID} as id,
      ${MuscleGroupWithExercisesView.cols.MuscleGroupName} as name,
      json_extract(${MuscleGroupWithExercisesView.cols.Exercises.name}, '$') AS ${MuscleGroupWithExercisesView.cols.Exercises.name}
    FROM
      ${MuscleGroupWithExercisesView.name}
    WHERE
      ${MuscleGroupWithExercisesView.cols.MuscleGroupID} = '${id}';
    `,
  });

  const muscleGroups: IMuscleGroupWithExercisesView[] = result.map(
    ({ columnNames, row }) =>
      row.reduce(
        (acc: { [key: string]: unknown }, curr: unknown, idx: number) => {
          if (
            columnNames[idx] ===
            MuscleGroupWithExercisesView.cols.Exercises.name
          ) {
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
