import { exercises } from "../data/exercises";

import { ExerciseTable } from "../constants";
// TODO: Move to queries
export type IExercise = {
  id: string;
  name: string;
  description?: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  reps: boolean;
  weight: boolean;
  time: boolean;
  distance: boolean;
  muscleGroupIds: string[];
};

export const create = `CREATE TABLE IF NOT EXISTS ${ExerciseTable.name} (
  ${ExerciseTable.cols.id} TEXT PRIMARY KEY NOT NULL,
  ${ExerciseTable.cols.name} TEXT NOT NULL,
  ${ExerciseTable.cols.description} TEXT,
  ${ExerciseTable.cols.thumbnail_url} TEXT,
  ${ExerciseTable.cols.video_url} TEXT,
  ${ExerciseTable.cols.reps} INTEGER NOT NULL,
  ${ExerciseTable.cols.weight} INTEGER NOT NULL,
  ${ExerciseTable.cols.time} INTEGER NOT NULL,
  ${ExerciseTable.cols.distance} INTEGER NOT NULL
);
`;

// In order to create the many-many ExerciseMuscleGroup table, we need to know the id of each Exercise and it's related muscle groups.
export const populateEach = exercises.map((value) => ({
  value,
  sql: `
  INSERT INTO ${ExerciseTable.name}(
    ${ExerciseTable.cols.id},
    ${ExerciseTable.cols.name},
    ${ExerciseTable.cols.description},
    ${ExerciseTable.cols.thumbnail_url},
    ${ExerciseTable.cols.video_url},
    ${ExerciseTable.cols.reps},
    ${ExerciseTable.cols.weight},
    ${ExerciseTable.cols.time},
    ${ExerciseTable.cols.distance}
    ) VALUES (
      '${value.id}',
      '${value.name}',
      '${value.description ?? ""}',
      '${value.thumbnailUrl ?? ""}',
      '${value.videoUrl ?? ""}',
      ${Number(value.reps)},
      ${Number(value.weight)},
      ${Number(value.time)},
      ${Number(value.distance)}
    ) RETURNING id;`,
}));

export const populateAll = `
  BEGIN TRANSACTION;
  ${exercises
    .map(
      (exercise) => `INSERT INTO ${ExerciseTable.name}(
        ${ExerciseTable.cols.id},
        ${ExerciseTable.cols.name},
        ${ExerciseTable.cols.description},
        ${ExerciseTable.cols.thumbnail_url},
        ${ExerciseTable.cols.video_url},
        ${ExerciseTable.cols.reps},
        ${ExerciseTable.cols.weight},
        ${ExerciseTable.cols.time},
        ${ExerciseTable.cols.distance}
      ) VALUES (
        '${exercise.id}',
        '${exercise.name}',
        '${exercise.description ?? ""}',
        '${exercise.thumbnailUrl ?? ""}',
        '${exercise.videoUrl ?? ""}',
        ${Number(exercise.reps)},
        ${Number(exercise.weight)},
        ${Number(exercise.time)},
        ${Number(exercise.distance)}
      );`
    )
    .join("\n")}
      COMMIT;
`;

export const getAll = `SELECT * FROM ${ExerciseTable.name};`;
// export const getAllViews = `CREATE VIEW IF NOT EXISTS ExerciseView(Name, Description) AS
// SELECT * FROM ${ExerciseTable.name};`;
