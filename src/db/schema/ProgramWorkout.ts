import { ProgramWorkoutTable, ProgramTable, WorkoutTable } from "../constants";

export type IProgramWorkout = {
  programId: number;
  workoutId: number;
  week: number;
  day: number;
};

export const create = `CREATE TABLE IF NOT EXISTS ${ProgramWorkoutTable.name}(
    ${ProgramWorkoutTable.cols.ProgramID} INTEGER NOT NULL,
    ${ProgramWorkoutTable.cols.WorkoutID} INTEGER NOT NULL,
    ${ProgramWorkoutTable.cols.Week} INTEGER NOT NULL,
    ${ProgramWorkoutTable.cols.Day} INTEGER NOT NULL,
    FOREIGN KEY (${ProgramWorkoutTable.cols.ProgramID}) REFERENCES ${ProgramTable.name}(${ProgramTable.cols.id}),
    FOREIGN KEY (${ProgramWorkoutTable.cols.WorkoutID}) REFERENCES ${WorkoutTable.name}(${WorkoutTable.cols.id}),
    PRIMARY KEY (${ProgramWorkoutTable.cols.ProgramID}, ${ProgramWorkoutTable.cols.WorkoutID})
)`;

export const insert = (
  programId: number,
  workoutId: number,
  week: number,
  day: number
) => `
  INSERT INTO ${ProgramWorkoutTable.name}(
    ${ProgramWorkoutTable.cols.ProgramID}, 
    ${ProgramWorkoutTable.cols.WorkoutID}, 
    ${ProgramWorkoutTable.cols.Week}, 
    ${ProgramWorkoutTable.cols.Day}
    ) VALUES(
      ${programId},
      ${workoutId},
      ${week},
      ${day}
  );
`;
