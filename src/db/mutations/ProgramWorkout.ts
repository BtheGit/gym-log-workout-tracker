import { ProgramWorkoutTable } from "../constants";
import { db } from "../db";

// NOTE: This table has no unique id to return (just a tuple of programid and workoutid)
export const insertProgramWorkout = async (programId, workoutId, week, day) => {
  await db.exec({
    sql: `
    INSERT INTO ${ProgramWorkoutTable.name}(
      ${ProgramWorkoutTable.cols.program_id}, 
      ${ProgramWorkoutTable.cols.workout_id}, 
      ${ProgramWorkoutTable.cols.week}, 
      ${ProgramWorkoutTable.cols.day}
      ) VALUES(
        ${programId},
        ${workoutId},
        ${week},
        ${day}
      );
  `,
  });
};
