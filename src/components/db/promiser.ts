import { sqlite3Worker1Promiser } from "@sqlite.org/sqlite-wasm";

declare module "@sqlite.org/sqlite-wasm" {
  export function sqlite3Worker1Promiser(
    ...args: any
  ): (...args: any[]) => Promise<any>;
}

export const promiser: (...args: any[]) => Promise<any> = await new Promise(
  (resolve) => {
    const _promiser = sqlite3Worker1Promiser({
      onready: () => {
        resolve(_promiser);
      },
    });
  }
);

export const execWithReturn = async (promiserConfig) => {
  let returnValue;
  await promiser("exec", {
    ...promiserConfig,
    callback: (res) => {
      if (!res.row) return;
      returnValue = res.row[0];
    },
  });
  return returnValue;
};

export const checkValueExistenceByTableColumn = async (
  dbId,
  table,
  column,
  value
) => {
  let result = 0;
  await promiser("exec", {
    dbId,
    sql: `SELECT EXISTS (SELECT 1 FROM ${table} WHERE ${column} = '${value}');
        `,
    callback: (res) => {
      if (!res.row) return;
      result = res.row[0];
    },
  });
  return result === 1;
};
