import { ProgramTable } from "../constants";
import { IProgramData } from "../data/programs";
import { db } from "../db";

export const insertProgram = async (program: IProgramData) => {
  const result = await db.exec({
    sql: `INSERT INTO ${ProgramTable.name}(
      ${ProgramTable.cols.name},
      ${ProgramTable.cols.description},
      ${ProgramTable.cols.author}
      ) VALUES (
        '${program.name}',
        '${program.description}',
        '${program.author}'
  ) RETURNING ${ProgramTable.cols.id};`,
  });

  const programId = result?.[0]?.row?.[0];

  if (!programId) {
    throw new Error("Failed to capture Program Id");
  }

  return programId;
};
