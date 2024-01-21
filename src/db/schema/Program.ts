import { ProgramTable } from "../constants";

export const create = `CREATE TABLE IF NOT EXISTS ${ProgramTable.name}(
    ${ProgramTable.cols.id} INTEGER PRIMARY KEY AUTOINCREMENT,
    ${ProgramTable.cols.name} TEXT NOT NULL,
    ${ProgramTable.cols.description} TEXT NOT NULL,
    ${ProgramTable.cols.author} TEXT NOT NULL
);`;

export type IProgram = {
  name: string;
  description: string;
  author: string;
};

export const insertReturningId = (program: IProgram) =>
  `INSERT INTO ${ProgramTable.name}(
    ${ProgramTable.cols.name},
    ${ProgramTable.cols.description},
    ${ProgramTable.cols.author}
    ) VALUES (
      '${program.name}',
      '${program.description}',
      '${program.author}'
) RETURNING ${ProgramTable.cols.id};`;
