import { MuscleGroupName } from "./MuscleGroup";
import { exercises } from "../data/exercises";

export const name = "Exercise";

export const create = `CREATE TABLE Exercise (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
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
  name: string;
  description?: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  reps: boolean;
  weight: boolean;
  time: boolean;
  distance: boolean;
  muscleGroups: MuscleGroupName[];
};

// In order to create the many-many ExerciseMuscleGroup table, we need to know the id of each Exercise and it's related muscle groups.
export const populateEach = exercises.map((value) => ({
  value,
  sql: `INSERT INTO Exercise(
      Name,
      Description,
      ThumbnailUrl,
      VideoUrl,
      Reps,
      Weight,
      Time,
      Distance
    ) VALUES (
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
