import { tableNames } from "../constants";

export const create = `CREATE TABLE IF NOT EXISTS ${tableNames.Program}(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    Description TEXT NOT NULL,
    Author TEXT NOT NULL
);`;

export type ProgramValue = {
  name: string;
  description: string;
  author: string;
};

export const insertReturningId = (program) =>
  `INSERT INTO ${tableNames.Program}(
    Name,
    Description,
    Author
    ) VALUES (
      '${program.name}',
      '${program.description}',
      '${program.author}'
) RETURNING id;`;
