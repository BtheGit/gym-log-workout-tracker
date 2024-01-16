// import { workouts } from "../data/workouts";

import { tableNames } from "../constants";

// TODO: Suport author (optional)
export const create = `CREATE TABLE IF NOT EXISTS ${tableNames.Workout}(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    Description TEXT NOT NULL
);`;

export type WorkoutValue = {
  name: string;
  description: string;
};

export const insertReturningId = (workout) => `
  INSERT INTO ${tableNames.Workout}(
    Name,
    Description
    ) VALUES (
      '${workout.name}',
      '${workout.description}'
) RETURNING id;
`;
