// export type WorkoutExerciseSetValue = {
//   reps?: number;
//   weight?: number;
//   time?: string;
//   distance?: string;
//   isComplete: boolean;
// };

import { WorkoutExerciseSetTable, WorkoutExerciseTable } from "../constants";

export const create = `
CREATE TABLE IF NOT EXISTS ${WorkoutExerciseSetTable.name}(
  ${WorkoutExerciseSetTable.cols.id} INTEGER PRIMARY KEY AUTOINCREMENT,
  ${WorkoutExerciseSetTable.cols.workout_exercise_instance_id} INTEGER NOT NULL,
  ${WorkoutExerciseSetTable.cols.sort_order} INTEGER NOT NULL,
  ${WorkoutExerciseSetTable.cols.reps} INTEGER,
  ${WorkoutExerciseSetTable.cols.weight} REAL,
  ${WorkoutExerciseSetTable.cols.time} REAL,
  ${WorkoutExerciseSetTable.cols.distance} REAL,
  FOREIGN KEY (${WorkoutExerciseSetTable.cols.workout_exercise_instance_id}) REFERENCES ${WorkoutExerciseTable.name}(${WorkoutExerciseTable.cols.id})
);
`;

export const insert = (
  workoutExerciseInstanceId: number,
  sortOrder: number,
  reps: number | undefined,
  weight: number | undefined,
  time: number | undefined,
  distance: number | undefined
) => {
  // TODO: Validate set values for correct numerical type against exercise type
  return `INSERT INTO ${WorkoutExerciseSetTable.name}(
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
  );`;
};
