import {
  WorkoutExerciseTable,
  WorkoutTable,
  ExerciseTable,
} from "../constants";

export const create = `CREATE TABLE IF NOT EXISTS ${WorkoutExerciseTable.name}(
    ${WorkoutExerciseTable.cols.id} INTEGER PRIMARY KEY AUTOINCREMENT,
    ${WorkoutExerciseTable.cols.WorkoutID} INTEGER NOT NULL,
    ${WorkoutExerciseTable.cols.ExerciseID} TEXT NOT NULL,
    ${WorkoutExerciseTable.cols.SortOrder} INTEGER NOT NULL,
    FOREIGN KEY (${WorkoutExerciseTable.cols.WorkoutID}) REFERENCES ${WorkoutTable.name}(${WorkoutTable.cols.id}),
    FOREIGN KEY (${WorkoutExerciseTable.cols.ExerciseID}) REFERENCES ${ExerciseTable.name}(${ExerciseTable.cols.id})
);`;

// TODO: Validate that exercise exists
export const insertReturningInstanceId = (
  workoutId: number,
  exerciseId: string,
  sortOrder: number
) => `
    INSERT INTO ${WorkoutExerciseTable.name}(
      ${WorkoutExerciseTable.cols.WorkoutID}, 
      ${WorkoutExerciseTable.cols.ExerciseID}, 
      ${WorkoutExerciseTable.cols.SortOrder}
    ) 
    VALUES(
      ${workoutId}, 
      '${exerciseId}', 
      ${sortOrder}
    ) 
    RETURNING ${WorkoutExerciseTable.cols.id};
`;
