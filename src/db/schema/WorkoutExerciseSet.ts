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
  ${WorkoutExerciseSetTable.cols.WorkoutExerciseInstanceID} INTEGER NOT NULL,
  ${WorkoutExerciseSetTable.cols.SortOrder} INTEGER NOT NULL,
  ${WorkoutExerciseSetTable.cols.Reps} INTEGER,
  ${WorkoutExerciseSetTable.cols.Weight} REAL,
  ${WorkoutExerciseSetTable.cols.Time} REAL,
  ${WorkoutExerciseSetTable.cols.Distance} REAL,
  FOREIGN KEY (${WorkoutExerciseSetTable.cols.WorkoutExerciseInstanceID}) REFERENCES ${WorkoutExerciseTable.name}(${WorkoutExerciseTable.cols.id})
);
`;

export const insert = (
  workoutExerciseInstanceId: number,
  sortOrder: number,
  reps: number,
  weight: number,
  time: number,
  distance: number
) => {
  // TODO: Validate set values for correct numerical type against exercise type
  return `INSERT INTO ${WorkoutExerciseSetTable.name}(
    ${WorkoutExerciseSetTable.cols.WorkoutExerciseInstanceID},
    ${WorkoutExerciseSetTable.cols.SortOrder},
    ${WorkoutExerciseSetTable.cols.Reps},
    ${WorkoutExerciseSetTable.cols.Weight},
    ${WorkoutExerciseSetTable.cols.Time},
    ${WorkoutExerciseSetTable.cols.Distance}
  ) VALUES(
    ${workoutExerciseInstanceId},
    ${sortOrder},
    ${Number.isInteger(reps) ? reps : "NULL"},
    ${typeof weight === "number" ? weight : "NULL"},
    ${Number.isInteger(time) ? time : "NULL"},
    ${typeof distance === "number" ? distance : "NULL"}
  );`;
};
