import { IWorkoutData } from "../data/workouts";
import { db } from "../db";
import { WorkoutTable } from "../constants";

export const insertWorkout = async (workout: IWorkoutData) => {
  // ## Workout
  const result = await db.exec({
    sql: `
    INSERT INTO ${WorkoutTable.name}(
      ${WorkoutTable.cols.name},
      ${WorkoutTable.cols.description}
    ) VALUES (
      '${workout.name}',
      '${workout.description}'
    )
    RETURNING ${WorkoutTable.cols.id};
  `,
  });
  const workoutId: number = result?.[0]?.row?.[0];

  if (!workoutId) {
    throw new Error("Failed to capture workoutId");
  }

  return workoutId;
};
