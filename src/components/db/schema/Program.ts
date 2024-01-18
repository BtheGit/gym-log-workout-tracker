import { tableNames } from "../constants";
import type { IWorkout } from "./Workout";

export const create = `CREATE TABLE IF NOT EXISTS ${tableNames.Program}(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    Description TEXT NOT NULL,
    Author TEXT NOT NULL
);`;

export type IProgram = {
  name: string;
  description: string;
  author: string;
};

export const insertReturningId = (program: IProgram) =>
  `INSERT INTO ${tableNames.Program}(
    Name,
    Description,
    Author
    ) VALUES (
      '${program.name}',
      '${program.description}',
      '${program.author}'
) RETURNING id;`;
