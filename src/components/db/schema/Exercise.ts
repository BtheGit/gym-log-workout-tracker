import { MuscleGroupName } from "./MuscleGroup";
import { exercises } from "../data/exercises";

export const tableName = "v1__Exercise";

export const create = `CREATE TABLE ${tableName} (
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

export type ExerciseValue = {
  id: string;
  name: string;
  description?: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  reps: boolean;
  weight: boolean;
  time: boolean;
  distance: boolean;
  muscleGroups: string[];
};

// In order to create the many-many ExerciseMuscleGroup table, we need to know the id of each Exercise and it's related muscle groups.
export const populateEach = exercises.map((value) => ({
  value,
  sql: `INSERT INTO ${tableName}(
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
      (exercise) => `INSERT INTO ${tableName}(
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
