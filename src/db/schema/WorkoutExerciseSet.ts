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
