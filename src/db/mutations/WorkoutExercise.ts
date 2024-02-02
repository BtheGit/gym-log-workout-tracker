import { WorkoutExerciseTable } from "../constants";
import { db } from "../db";

// TODO: Validate that exercise exists
export const insertWorkoutExercise = async (
  workoutId: number,
  exerciseId: string,
  sortOrder: number
) => {
  const result = await db.exec({
    sql: `
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
`,
  });

  const workoutExerciseInstanceId = result?.[0]?.row?.[0];
  if (!workoutExerciseInstanceId) {
    throw new Error("Failed to capture workoutExerciseInstanceId");
  }

  return workoutExerciseInstanceId;
};
