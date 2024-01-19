import { tableNames } from "../constants";

export type IWorkout = {
  name: string;
  description: string;
};

// TODO: Suport author (optional)
export const create = `CREATE TABLE IF NOT EXISTS ${tableNames.Workout}(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    Description TEXT NOT NULL
);`;

export const insertReturningId = (workout: IWorkout) => `
  INSERT INTO ${tableNames.Workout}(
    Name,
    Description
    ) VALUES (
      '${workout.name}',
      '${workout.description}'
) RETURNING id;
`;
