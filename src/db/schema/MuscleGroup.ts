import { muscleGroups } from "../data/muscle-groups";
import { tableNames } from "../constants";

export const create = `CREATE TABLE IF NOT EXISTS ${tableNames.MuscleGroup}(id TEXT PRIMARY KEY NOT NULL, name TEXT NOT NULL)`;

export type MuscleGroupName = (typeof muscleGroups)[number];

export const populateAll = `
BEGIN TRANSACTION;
${muscleGroups
  .map(
    (muscleGroup) =>
      `INSERT INTO ${tableNames.MuscleGroup}(id, name) VALUES ('${muscleGroup.id}', '${muscleGroup.name}');`
  )
  .join("\n")}
COMMIT;
`;
