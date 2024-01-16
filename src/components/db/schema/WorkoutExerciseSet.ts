// export type WorkoutExerciseSetValue = {
//   reps?: number;
//   weight?: number;
//   time?: string;
//   distance?: string;
//   isComplete: boolean;
// };

import { tableNames } from "../constants";

export const create = `
CREATE TABLE IF NOT EXISTS ${tableNames.WorkoutExerciseSet}(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  WorkoutExerciseInstanceID INTEGER NOT NULL,
  SortOrder INTEGER NOT NULL,
  Reps INTEGER,
  Weight REAL,
  Time REAL,
  Distance REAL,
  FOREIGN KEY (WorkoutExerciseInstanceID) REFERENCES ${tableNames.WorkoutExercise}(id)
);
`;

export const insert = (
  workoutExerciseInstanceId,
  sortOrder,
  reps,
  weight,
  time,
  distance
) => {
  // TODO: Validate set values for correct numerical type against exercise type
  return `INSERT INTO ${tableNames.WorkoutExerciseSet}(
    WorkoutExerciseInstanceID,
    SortOrder,
    Reps,
    Weight,
    Time,
    Distance
  ) VALUES(
    ${workoutExerciseInstanceId},
    ${sortOrder},
    ${Number.isInteger(reps) ? reps : "NULL"},
    ${typeof weight === "number" ? weight : "NULL"},
    ${Number.isInteger(time) ? time : "NULL"},
    ${typeof distance === "number" ? distance : "NULL"}
  );`;
};
