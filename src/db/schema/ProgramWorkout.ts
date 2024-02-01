import { ProgramWorkoutTable, ProgramTable, WorkoutTable } from "../constants";

export type IProgramWorkout = {
  programId: number;
  workoutId: number;
  week: number;
  day: number;
};

export const create = `CREATE TABLE IF NOT EXISTS ${ProgramWorkoutTable.name}(
    ${ProgramWorkoutTable.cols.program_id} INTEGER NOT NULL,
    ${ProgramWorkoutTable.cols.workout_id} INTEGER NOT NULL,
    ${ProgramWorkoutTable.cols.week} INTEGER NOT NULL,
    ${ProgramWorkoutTable.cols.day} INTEGER NOT NULL,
    FOREIGN KEY (${ProgramWorkoutTable.cols.program_id}) REFERENCES ${ProgramTable.name}(${ProgramTable.cols.id}),
    FOREIGN KEY (${ProgramWorkoutTable.cols.workout_id}) REFERENCES ${WorkoutTable.name}(${WorkoutTable.cols.id}),
    PRIMARY KEY (${ProgramWorkoutTable.cols.program_id}, ${ProgramWorkoutTable.cols.workout_id})
)`;
