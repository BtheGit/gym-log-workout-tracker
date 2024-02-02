import { tableNames } from "./constants";
import { programs } from "./data/programs";
import { workouts } from "./data/workouts";
import * as Exercise from "./schema/Exercise";
import * as MuscleGroup from "./schema/MuscleGroup";
import * as ExerciseMuscleGroup from "./schema/ExerciseMuscleGroup";
import * as Program from "./schema/Program";
import * as Workout from "./schema/Workout";
import * as ProgramWorkout from "./schema/ProgramWorkout";
import * as WorkoutExercise from "./schema/WorkoutExercise";
import * as WorkoutExerciseSet from "./schema/WorkoutExerciseSet";
import { db } from "./db";
import { addProgram } from "./controllers/programController";
import { addWorkout } from "./controllers/workoutController";

export const seedDB = async () => {
  // Clear Old Tables
  await Promise.all(
    Object.values(tableNames).map((tableName) =>
      db.exec({ sql: `DROP TABLE IF EXISTS ${tableName}` })
    )
  );

  // Create Tables Anew
  await db.exec({
    sql: MuscleGroup.create,
  });
  await db.exec({
    sql: Exercise.create,
  });
  await db.exec({
    sql: ExerciseMuscleGroup.create,
  });
  await db.exec({
    sql: Program.create,
  });
  await db.exec({
    sql: Workout.create,
  });
  await db.exec({
    sql: ProgramWorkout.create,
  });
  await db.exec({
    sql: WorkoutExercise.create,
  });
  await db.exec({
    sql: WorkoutExerciseSet.create,
  });

  // Populate Tables

  // ## Muscle Groups
  await db.exec({
    sql: MuscleGroup.populateAll,
  });

  // ## Built-In Exercises
  await db.exec({
    sql: Exercise.populateAll,
  });

  // Built-In ExerciseMuscleGroups
  await db.exec({
    sql: ExerciseMuscleGroup.populateAll,
  });

  /**
   * TODO:
   * - Add createdAt values to applicable tables (program, workout)
   */

  // ## Add Programs
  for await (const program of programs) {
    try {
      await addProgram(program);
    } catch (err) {
      console.error(err);
    }
  }

  for await (const workout of workouts) {
    try {
      await addWorkout(workout);
    } catch (err) {
      console.error(err);
    }
  }

  // ## Add Workouts

  // ## TODO: Separate Table For Custom Exercises (lots of logic to join with built-ins. Todo later)
};
