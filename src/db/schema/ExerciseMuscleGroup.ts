import { exercises } from "../data/exercises";

import {
  ExerciseTable,
  MuscleGroupTable,
  ExerciseMuscleGroupTable,
} from "../constants";

export const create = `CREATE TABLE IF NOT EXISTS ${ExerciseMuscleGroupTable.name} (
    ${ExerciseMuscleGroupTable.cols.ExerciseID} INTEGER NOT NULL,
    ${ExerciseMuscleGroupTable.cols.MuscleGroupID} INTEGER NOT NULL,
    FOREIGN KEY (${ExerciseMuscleGroupTable.cols.ExerciseID}) REFERENCES ${ExerciseTable.name}(${ExerciseTable.cols.id}),
    FOREIGN KEY (${ExerciseMuscleGroupTable.cols.MuscleGroupID}) REFERENCES ${MuscleGroupTable.name}(${MuscleGroupTable.cols.id}),
    PRIMARY KEY (${ExerciseMuscleGroupTable.cols.ExerciseID}, ${ExerciseMuscleGroupTable.cols.MuscleGroupID})
);`;

export const populateAll = `
    BEGIN TRANSACTION;
    ${exercises
      .map((exercise) =>
        exercise.muscleGroupIds.map(
          (muscleGroup) =>
            `INSERT INTO ${ExerciseMuscleGroupTable.name}(${ExerciseMuscleGroupTable.cols.ExerciseID}, ${ExerciseMuscleGroupTable.cols.MuscleGroupID}) VALUES('${exercise.id}', '${muscleGroup}');`
        )
      )
      .flat()
      .join("\n")}
    COMMIT;
`;
