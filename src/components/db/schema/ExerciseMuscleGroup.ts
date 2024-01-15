import { exercises } from "../data/exercises";
import { muscleGroups } from "../data/muscle-groups";

export const tableName = "v1__ExerciseMuscleGroup";

export const create = `CREATE TABLE IF NOT EXISTS ${tableName} (
    ExerciseID INTEGER,
    MuscleGroupID INTEGER,
    FOREIGN KEY (ExerciseID) REFERENCES Exercise(id),
    FOREIGN KEY (MuscleGroupID) REFERENCES MuscleGroup(id),
    PRIMARY KEY (ExerciseID, MuscleGroupID)
);`;

export const populateAll = `
    BEGIN TRANSACTION;
    ${exercises
      .map((exercise) =>
        exercise.muscleGroups.map(
          (muscleGroup) =>
            `INSERT INTO ${tableName}(ExerciseID, MuscleGroupID) VALUES('${exercise.id}', '${muscleGroup}');`
        )
      )
      .flat()
      .join("\n")}
    COMMIT;
`;
