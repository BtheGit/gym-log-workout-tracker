import { values } from "./Exercise";

export const name = "ExerciseMuscleGroup";

export const create = `  CREATE TABLE IF NOT EXISTS ExerciseMuscleGroup (
    ExerciseID INTEGER,
    MuscleGroupID INTEGER,
    FOREIGN KEY (ExerciseID) REFERENCES Exercise(id),
    FOREIGN KEY (MuscleGroupID) REFERENCES MuscleGroup(id),
    PRIMARY KEY (ExerciseID, MuscleGroupID)
);`;

// export const populate = `
// BEGIN TRANSACTION;
// ${values
//   .map(
//     (value) => `INSERT INTO ExerciseMuscleGroup (ExerciseID, MuscleGroupID)
// SELECT e.id AS ExerciseID, mg.id AS MuscleGroupID
// FROM Exercise e
// JOIN MuscleGroup mg ON mg.Name IN (${value.muscleGroups
//       .map((name) => `'${name}'`)
//       .join(",")})
// WHERE e.Name = '${value.name}';`
//   )
//   .join("\n")}
// COMMIT;`;
