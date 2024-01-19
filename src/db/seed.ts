import { tableNames } from "./constants";
import {
  programs,
  type IProgramData,
  type IProgramWorkoutData,
} from "./data/programs";
import { workouts, type IWorkoutData } from "./data/workouts";
import * as Exercise from "./schema/Exercise";
import * as MuscleGroup from "./schema/MuscleGroup";
import * as ExerciseMuscleGroup from "./schema/ExerciseMuscleGroup";
import * as Program from "./schema/Program";
import * as Workout from "./schema/Workout";
import * as ProgramWorkout from "./schema/ProgramWorkout";
import * as WorkoutExercise from "./schema/WorkoutExercise";
import * as WorkoutExerciseSet from "./schema/WorkoutExerciseSet";
import type { DatabaseService } from "./db";

export const addWorkout = async (
  db: DatabaseService,
  workout: IWorkoutData,
  programId?: number
) => {
  // ## Workout
  const insertWorkoutResult = await db.exec({
    sql: Workout.insertReturningId(workout),
  });
  const workoutId: number = insertWorkoutResult?.[0]?.row?.[0];

  if (!workoutId) {
    throw new Error("Failed to capture workoutId");
  }

  if (programId) {
    // ## ProgramWorkout
    await db.exec({
      sql: ProgramWorkout.insert(
        programId,
        workoutId,
        // TODO: Ensure this is required in creating a program workout!
        (workout as IProgramWorkoutData).week,
        (workout as IProgramWorkoutData).day
      ),
    });
  }

  // ## WorkoutExercise
  // NOTE: This will not support creating new exercises on the fly. Future feature.
  if (!workout?.exercises?.length) {
    return;
  }
  for await (const [
    exerciseIndex,
    workoutExercise,
  ] of workout.exercises.entries()) {
    const insertResult = await db.exec({
      sql: WorkoutExercise.insertReturningInstanceId(
        workoutId,
        workoutExercise.id,
        exerciseIndex
      ),
    });

    const workoutExerciseInstanceId = insertResult?.[0]?.row?.[0];
    if (!workoutExerciseInstanceId) {
      throw new Error("Failed to capture workoutExerciseInstanceId");
    }

    // ## WorkoutExerciseSet
    // TODO: FUTURE FEATURE = Validate that the set matches the exercise (eg. reps, weight vs time, distance)
    if (!workoutExercise?.sets?.length) {
      return;
    }
    for await (const [
      setIndex,
      workoutExerciseSet,
    ] of workoutExercise.sets.entries()) {
      await db.exec({
        sql: WorkoutExerciseSet.insert(
          workoutExerciseInstanceId,
          setIndex,
          workoutExerciseSet.reps,
          workoutExerciseSet.weight,
          workoutExerciseSet.time,
          workoutExerciseSet.distance
        ),
      });
    }
  }
};

export const addProgram = async (
  db: DatabaseService,
  program: IProgramData
) => {
  // ## Program
  const programInsertResult = await db.exec({
    sql: Program.insertReturningId(program),
  });
  const programId = programInsertResult?.[0]?.row?.[0];
  if (!programId) {
    throw new Error("Failed to capture programID");
  }
  if (!program.workouts) {
    return;
  }
  for await (const workout of program.workouts) {
    await addWorkout(db, workout, programId);
  }
};

export const seedDB = async (db: DatabaseService) => {
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
    await addProgram(db, program);
  }

  for await (const workout of workouts) {
    await addWorkout(db, workout);
  }

  // ## Add Workouts

  // ## TODO: Separate Table For Custom Exercises (lots of logic to join with built-ins. Todo later)
};
