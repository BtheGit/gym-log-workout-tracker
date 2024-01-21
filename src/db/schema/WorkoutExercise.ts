import {
  WorkoutExerciseTable,
  WorkoutTable,
  ExerciseTable,
} from "../constants";

export const create = `CREATE TABLE IF NOT EXISTS ${WorkoutExerciseTable.name}(
    ${WorkoutExerciseTable.cols.id} INTEGER PRIMARY KEY AUTOINCREMENT,
    ${WorkoutExerciseTable.cols.workout_id} INTEGER NOT NULL,
    ${WorkoutExerciseTable.cols.exercise_id} TEXT NOT NULL,
    ${WorkoutExerciseTable.cols.sort_order} INTEGER NOT NULL,
    FOREIGN KEY (${WorkoutExerciseTable.cols.workout_id}) REFERENCES ${WorkoutTable.name}(${WorkoutTable.cols.id}),
    FOREIGN KEY (${WorkoutExerciseTable.cols.exercise_id}) REFERENCES ${ExerciseTable.name}(${ExerciseTable.cols.id})
);`;

// TODO: Validate that exercise exists
export const insertReturningInstanceId = (
  workoutId: number,
  exerciseId: string,
  sortOrder: number
) => `
    INSERT INTO ${WorkoutExerciseTable.name}(
      ${WorkoutExerciseTable.cols.workout_id}, 
      ${WorkoutExerciseTable.cols.exercise_id}, 
      ${WorkoutExerciseTable.cols.sort_order}
    ) 
    VALUES(
      ${workoutId}, 
      '${exerciseId}', 
      ${sortOrder}
    ) 
    RETURNING ${WorkoutExerciseTable.cols.id};
`;
