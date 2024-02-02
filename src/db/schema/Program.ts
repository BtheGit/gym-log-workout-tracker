import { ProgramTable } from "../constants";

export type IProgram = {
  name: string;
  description: string;
  author: string;
};

export const create = `CREATE TABLE IF NOT EXISTS ${ProgramTable.name}(
    ${ProgramTable.cols.id} INTEGER PRIMARY KEY AUTOINCREMENT,
    ${ProgramTable.cols.name} TEXT NOT NULL,
    ${ProgramTable.cols.description} TEXT NOT NULL,
    ${ProgramTable.cols.author} TEXT NOT NULL
);`;
