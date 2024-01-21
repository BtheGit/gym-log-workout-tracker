import { muscleGroups } from "../data/muscle-groups";
import { tableNames } from "../constants";

export const columns = {
  id: "id",
  name: "name",
};

export const schema = {
  [columns.id]: "TEXT PRIMARY KEY NOT NULL",
  [columns.name]: "TEXT NOT NULL",
};

export const create = `CREATE TABLE IF NOT EXISTS ${tableNames.MuscleGroup}(${
  columns.id
} ${schema[columns.id]}, ${columns.name} ${schema[columns.name]})`;

export const populateAll = `
BEGIN TRANSACTION;
${muscleGroups
  .map(
    (muscleGroup) =>
      `INSERT INTO ${tableNames.MuscleGroup}(${columns.id}, ${columns.name}) VALUES ('${muscleGroup.id}', '${muscleGroup.name}');`
  )
  .join("\n")}
COMMIT;
`;
