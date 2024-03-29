import { WorkoutExerciseSetTable } from "../constants";
import { db } from "../db";

export const insertWorkoutExerciseSet = async (
  workoutExerciseInstanceId: number,
  sortOrder: number,
  reps: number | undefined,
  weight: number | undefined,
  time: number | undefined,
  distance: number | undefined
) => {
  // TODO: Validate set values for correct numerical type against exercise type
  // TODO: Everything can be an int (time in MS or S, distance in meters/1000s of a mile or something (obviously in one, converted back and forth to the other. Might need to be more granular to avoid issues with conversion rounding))
  const result = await db.exec({
    sql: `INSERT INTO ${WorkoutExerciseSetTable.name}(
      ${WorkoutExerciseSetTable.cols.workout_exercise_instance_id},
      ${WorkoutExerciseSetTable.cols.sort_order},
      ${WorkoutExerciseSetTable.cols.reps},
      ${WorkoutExerciseSetTable.cols.weight},
      ${WorkoutExerciseSetTable.cols.time},
      ${WorkoutExerciseSetTable.cols.distance}
    ) VALUES(
      ${workoutExerciseInstanceId},
      ${sortOrder},
      ${Number.isInteger(reps) ? reps : "NULL"},
      ${typeof weight === "number" ? weight : "NULL"},
      ${Number.isInteger(time) ? time : "NULL"},
      ${typeof distance === "number" ? distance : "NULL"}
    )
    RETURNING ${WorkoutExerciseSetTable.cols.workout_exercise_instance_id};`,
  });

  const workoutExerciseSetId = result?.[0]?.row?.[0];
  if (!workoutExerciseSetId) {
    throw new Error("Failed to capture Workout Exercise Set Id");
  }

  return workoutExerciseSetId;
};
