import { WorkoutTable } from "../constants";

export type IWorkout = {
  name: string;
  description: string;
};

// TODO: Suport author (optional)
export const create = `CREATE TABLE IF NOT EXISTS ${WorkoutTable.name}(
    ${WorkoutTable.cols.id} INTEGER PRIMARY KEY AUTOINCREMENT,
    ${WorkoutTable.cols.Name} TEXT NOT NULL,
    ${WorkoutTable.cols.description} TEXT NOT NULL
);`;

export const insertReturningId = (workout: IWorkout) => `
  INSERT INTO ${WorkoutTable.name}(
    ${WorkoutTable.cols.Name},
    ${WorkoutTable.cols.description}
  ) VALUES (
    '${workout.name}',
    '${workout.description}'
  )
  RETURNING ${WorkoutTable.cols.id};
`;
