import { muscleGroups } from "../data/muscle-groups";

export const tableName = "v1__MuscleGroup";

export const create = `CREATE TABLE IF NOT EXISTS ${tableName}(id TEXT PRIMARY KEY NOT NULL, name TEXT NOT NULL)`;

export type MuscleGroupName = (typeof muscleGroups)[number];

export const populateAll = `
BEGIN TRANSACTION;
${muscleGroups
  .map(
    (muscleGroup) =>
      `INSERT INTO ${tableName}(id, name) VALUES ('${muscleGroup.id}', '${muscleGroup.name}');`
  )
  .join("\n")}
COMMIT;
`;
