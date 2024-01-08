export const name = "MuscleGroup";

export const create =
  "CREATE TABLE IF NOT EXISTS MuscleGroup(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)";
export const muscleGroupNames = [
  "Abs",
  "Obliques",
  "Tibialis Anterior",
  "Calves",
  "Hip Flexor",
  "Forearm Extensors",
  "Forearm Flexors",
  "Quads",
  "Neck",
  "Rear Deltoids",
  "Front Deltoids",
  "Rotator Cuff",
  "Middle Deltoids",
  "Chest",
  "Triceps",
  "Hamstrings",
  "Adductors",
  "Lower Back",
  "Lats",
  "Trapezius",
  "Biceps",
  "Glutes",
  "Abductors",
];

export type MuscleGroupName = (typeof muscleGroupNames)[number];

export const values = muscleGroupNames.map((name) => ({ name }));

export const populate = `
BEGIN TRANSACTION;
${muscleGroupNames
  .map(
    (name) => `INSERT INTO MuscleGroup(name) VALUES ('${name}
');`
  )
  .join("\n")}
COMMIT;
`;
