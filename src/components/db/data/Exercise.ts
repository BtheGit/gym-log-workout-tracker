import { MuscleGroupName } from "./MuscleGroup";

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

export const values: ExerciseValue[] = [
  {
    name: "Overhead Cable Triceps Extension",
    description:
      "The overhead cable triceps extension is a single-joint exercise that targets the triceps while increasing stability throughout the core region. The triceps are a primary muscle group involved in elbow extension and elbow extension is a primary function of the triceps. The overhead cable triceps extension is a great exercise for developing the triceps and increasing strength and stability throughout the core region.",
    reps: true,
    weight: true,
    time: false,
    distance: false,
    muscleGroups: ["Triceps"],
  },
  {
    name: "Incline Dumbbell Press",
    description: `
      Incline Dumbbell Press is a single-joint exercise that targets the dumbbell press while increasing stability throughout the core region. The dumbbell press is a primary muscle group involved in elbow extension and elbow extension is a primary function of the dumbbell press. The incline dumbbell press is a great exercise for developing the dumbbell press and increasing strength and stability throughout the core region.`,
    reps: true,
    weight: true,
    time: false,
    distance: false,
    muscleGroups: ["Chest", "Front Deltoids", "Triceps"],
  },
];

// In order to create the many-many ExerciseMuscleGroup table, we need to know the id of each Exercise and it's related muscle groups.
export const populateEach = values.map((value) => ({
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
      '${value.description}',
      '${value.thumbnailUrl}',
      '${value.videoUrl}',
      ${Number(value.reps)},
      ${Number(value.weight)},
      ${Number(value.time)},
      ${Number(value.distance)}
    ) RETURNING id;`,
}));
