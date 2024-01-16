import * as MuscleGroup from "./schema/MuscleGroup";
import * as Exercise from "./schema/Exercise";
import * as ExerciseMuscleGroup from "./schema/ExerciseMuscleGroup";
import * as Program from "./schema/Program";
import * as Workout from "./schema/Workout";
import * as ProgramWorkout from "./schema/ProgramWorkout";
import * as WorkoutExercise from "./schema/WorkoutExercise";
import * as WorkoutExerciseSet from "./schema/WorkoutExerciseSet";
import { promiser, execWithReturn } from "./promiser";
import { tableNames } from "./constants";
import { programs } from "./data/programs";
import { workouts } from "./data/workouts";

// Based on https://sqlite.org/wasm/doc/tip/api-worker1.md open will store a record of dbId and we don't need to keep passing it
// TODO: Remove redundant uses of dbId
let response = await promiser("open", {
  filename: "file:worker-promiser.sqlite3?vfs=opfs",
});

const { dbId } = response;
console.log("Opened database with id: " + dbId);

const exportDB = async () => {
  // https://sqlite.org/wasm/doc/trunk/api-worker1.md#promiser
  // https://sqlite.org/wasm/doc/trunk/cookbook.md#uldl
  console.log("Exporting database to file...");
  const file = await promiser("export", {
    dbId,
    filename: "file:worker-promiser-export.sqlite3?vfs=opfs",
  });
  console.log(file);
  // Initiate download of the exported file
  const a = document.createElement("a");
  const blob = new Blob([file.result.byteArray.buffer], {
    type: file.result.mimeType,
  });
  a.href = URL.createObjectURL(blob);
  a.download = "worker-promiser-export.sqlite3";
  a.click();
};

export const addWorkout = async (workout, programId?) => {
  // ## Workout
  const workoutId = await execWithReturn({
    dbId,
    sql: Workout.insertReturningId(workout),
  });

  if (programId) {
    // ## ProgramWorkout
    await promiser("exec", {
      dbId,
      sql: ProgramWorkout.insert(
        programId,
        workoutId,
        // TODO: Ensure this is required in creating a program workout!
        workout.week,
        workout.day
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
    const workoutExerciseInstanceId = await execWithReturn({
      dbId,
      sql: WorkoutExercise.insertReturningInstanceId(
        workoutId,
        workoutExercise.id,
        exerciseIndex
      ),
    });

    // ## WorkoutExerciseSet
    // TODO: FUTURE FEATURE = Validate that the set matches the exercise (eg. reps, weight vs time, distance)
    if (!workoutExercise?.sets?.length) {
      return;
    }
    for await (const [
      setIndex,
      workoutExerciseSet,
    ] of workoutExercise.sets.entries()) {
      await promiser("exec", {
        dbId,
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

export const addProgram = async (program) => {
  // ## Program
  const programId = await execWithReturn({
    dbId,
    sql: Program.insertReturningId(program),
  });
  for await (const workout of program.workouts) {
    await addWorkout(workout, programId);
  }
};

// Clear Old Tables
await Promise.all(
  Object.values(tableNames).map((tableName) =>
    promiser("exec", { dbId, sql: `DROP TABLE IF EXISTS ${tableName}` })
  )
);

// Create Tables Anew
await promiser("exec", {
  dbId,
  sql: MuscleGroup.create,
});
await promiser("exec", {
  dbId,
  sql: Exercise.create,
});
await promiser("exec", {
  dbId,
  sql: ExerciseMuscleGroup.create,
});
await promiser("exec", {
  dbId,
  sql: Program.create,
});
await promiser("exec", {
  dbId,
  sql: Workout.create,
});
await promiser("exec", {
  dbId,
  sql: ProgramWorkout.create,
});
await promiser("exec", {
  dbId,
  sql: WorkoutExercise.create,
});
await promiser("exec", {
  dbId,
  sql: WorkoutExerciseSet.create,
});

// Populate Tables

// ## Muscle Groups
await promiser("exec", {
  dbId,
  sql: MuscleGroup.populateAll,
});

// ## Built-In Exercises
await promiser("exec", {
  dbId,
  sql: Exercise.populateAll,
});

// Built-In ExerciseMuscleGroups
await promiser("exec", {
  dbId,
  sql: ExerciseMuscleGroup.populateAll,
});

/**
 * TODO:
 * - Add createdAt values to applicable tables (program, workout)
 */

// ## Add Programs
for await (const program of programs) {
  await addProgram(program);
}

for await (const workout of workouts) {
  await addWorkout(workout);
}

// ## Add Workouts

// ## TODO: Separate Table For Custom Exercises (lots of logic to join with built-ins. Todo later)

// await promiser("exec", {
//   dbId,
//   sql: "SELECT sql FROM sqlite_schema WHERE TYPE = 'table'",
//   callback: (res) => console.log(res.row),
// });

// await exportDB();

await promiser("close", { dbId });
