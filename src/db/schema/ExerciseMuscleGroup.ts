import { exercises } from "../data/exercises";

import {
  ExerciseTable,
  MuscleGroupTable,
  ExerciseMuscleGroupTable,
} from "../constants";

export const create = `CREATE TABLE IF NOT EXISTS ${ExerciseMuscleGroupTable.name} (
    ${ExerciseMuscleGroupTable.cols.exercise_id} INTEGER NOT NULL,
    ${ExerciseMuscleGroupTable.cols.muscle_group_id} INTEGER NOT NULL,
    FOREIGN KEY (${ExerciseMuscleGroupTable.cols.exercise_id}) REFERENCES ${ExerciseTable.name}(${ExerciseTable.cols.id}),
    FOREIGN KEY (${ExerciseMuscleGroupTable.cols.muscle_group_id}) REFERENCES ${MuscleGroupTable.name}(${MuscleGroupTable.cols.id}),
    PRIMARY KEY (${ExerciseMuscleGroupTable.cols.exercise_id}, ${ExerciseMuscleGroupTable.cols.muscle_group_id})
);`;

export const populateAll = `
    BEGIN TRANSACTION;
    ${exercises
      .map((exercise) =>
        exercise.muscleGroupIds.map(
          (muscleGroup) =>
            `INSERT INTO ${ExerciseMuscleGroupTable.name}(${ExerciseMuscleGroupTable.cols.exercise_id}, ${ExerciseMuscleGroupTable.cols.muscle_group_id}) VALUES('${exercise.id}', '${muscleGroup}');`
        )
      )
      .flat()
      .join("\n")}
    COMMIT;
`;
