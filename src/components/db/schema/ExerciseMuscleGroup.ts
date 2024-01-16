import { exercises } from "../data/exercises";

import { tableNames } from "../constants.ts";
export const create = `CREATE TABLE IF NOT EXISTS ${tableNames.ExerciseMuscleGroup} (
    ExerciseID INTEGER NOT NULL,
    MuscleGroupID INTEGER NOT NULL,
    FOREIGN KEY (ExerciseID) REFERENCES ${tableNames.Exercise}(id),
    FOREIGN KEY (MuscleGroupID) REFERENCES ${tableNames.MuscleGroup}(id),
    PRIMARY KEY (ExerciseID, MuscleGroupID)
);`;

export const populateAll = `
    BEGIN TRANSACTION;
    ${exercises
      .map((exercise) =>
        exercise.muscleGroups.map(
          (muscleGroup) =>
            `INSERT INTO ${tableNames.ExerciseMuscleGroup}(ExerciseID, MuscleGroupID) VALUES('${exercise.id}', '${muscleGroup}');`
        )
      )
      .flat()
      .join("\n")}
    COMMIT;
`;
