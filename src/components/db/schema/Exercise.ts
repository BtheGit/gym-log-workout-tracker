import { exercises } from "../data/exercises";

import { tableNames } from "../constants";

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

export const create = `CREATE TABLE IF NOT EXISTS ${tableNames.Exercise} (
  id TEXT PRIMARY KEY NOT NULL,
  Name TEXT NOT NULL,
  Description TEXT,
  ThumbnailUrl TEXT,
  VideoUrl TEXT,
  Reps INTEGER NOT NULL,
  Weight INTEGER NOT NULL,
  Time INTEGER NOT NULL,
  Distance INTEGER NOT NULL
);
`;

// In order to create the many-many ExerciseMuscleGroup table, we need to know the id of each Exercise and it's related muscle groups.
export const populateEach = exercises.map((value) => ({
  value,
  sql: `INSERT INTO ${tableNames.Exercise}(
      id,
      Name,
      Description,
      ThumbnailUrl,
      VideoUrl,
      Reps,
      Weight,
      Time,
      Distance
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
      (exercise) => `INSERT INTO ${tableNames.Exercise}(
      id,
      Name,
      Description,
      ThumbnailUrl,
      VideoUrl,
      Reps,
      Weight,
      Time,
      Distance
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

export const getAll = `SELECT * FROM ${tableNames.Exercise};`;
// export const getAllViews = `CREATE VIEW IF NOT EXISTS ExerciseView(Name, Description) AS
// SELECT * FROM ${tableNames.Exercise};`;
