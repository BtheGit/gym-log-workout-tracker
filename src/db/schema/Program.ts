import { ProgramTable } from "../constants";

export const create = `CREATE TABLE IF NOT EXISTS ${ProgramTable.name}(
    ${ProgramTable.cols.id} INTEGER PRIMARY KEY AUTOINCREMENT,
    ${ProgramTable.cols.Name} TEXT NOT NULL,
    ${ProgramTable.cols.Description} TEXT NOT NULL,
    ${ProgramTable.cols.Author} TEXT NOT NULL
);`;

export type IProgram = {
  name: string;
  description: string;
  author: string;
};

export const insertReturningId = (program: IProgram) =>
  `INSERT INTO ${ProgramTable.name}(
    ${ProgramTable.cols.Name},
    ${ProgramTable.cols.Description},
    ${ProgramTable.cols.Author}
    ) VALUES (
      '${program.name}',
      '${program.description}',
      '${program.author}'
) RETURNING ${ProgramTable.cols.id};`;
