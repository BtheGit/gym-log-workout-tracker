import { muscleGroups } from "../data/muscle-groups";

export const name = "MuscleGroup";

export const create =
  "CREATE TABLE IF NOT EXISTS MuscleGroup(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)";

export type MuscleGroupName = (typeof muscleGroups)[number];

export const populate = `
BEGIN TRANSACTION;
${muscleGroups
  .map((name) => `INSERT INTO MuscleGroup(name) VALUES ('${name}');`)
  .join("\n")}
COMMIT;
`;
