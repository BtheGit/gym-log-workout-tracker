import { muscleGroups } from "../data/muscle-groups";
import { MuscleGroupTable } from "../constants";

export const create = `CREATE TABLE IF NOT EXISTS ${MuscleGroupTable.name}(${MuscleGroupTable.cols.id} TEXT PRIMARY KEY NOT NULL, ${MuscleGroupTable.cols.name} TEXT NOT NULL)`;

export const populateAll = `
BEGIN TRANSACTION;
${muscleGroups
  .map(
    (muscleGroup) =>
      `INSERT INTO ${MuscleGroupTable.name}(${MuscleGroupTable.cols.id}, ${MuscleGroupTable.cols.name}) VALUES ('${muscleGroup.id}', '${muscleGroup.name}');`
  )
  .join("\n")}
COMMIT;
`;
