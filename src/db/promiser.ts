import { sqlite3Worker1Promiser } from "@sqlite.org/sqlite-wasm";

declare module "@sqlite.org/sqlite-wasm" {
  export function sqlite3Worker1Promiser(
    ...args: unknown[]
  ): (...args: unknown[]) => Promise<unknown>;
}

// https://sqlite.org/wasm/doc/tip/api-worker1.md#promiser
export const promiser: (...args: unknown[]) => Promise<unknown> =
  await new Promise((resolve) => {
    const _promiser = sqlite3Worker1Promiser({
      onready: () => {
        resolve(_promiser);
      },
    });
  });

// export const execWithReturn = async (promiserConfig) => {
//   let returnValue;
//   await promiser("exec", {
//     ...promiserConfig,
//     callback: (res) => {
//       if (!res.row) return;
//       returnValue = res.row[0];
//     },
//   });
//   return returnValue;
// };

// export const execWithReturns = async (promiserConfig) => {
//   let returnValues: any[] = [];
//   await promiser("exec", {
//     ...promiserConfig,
//     callback: (res) => {
//       if (!res.row) return;
//       returnValues.push(res.row);
//     },
//   });
//   return returnValues;
// };

// export const execWithFullReturns = async (promiserConfig) => {
//   let returns: any[] = [];
//   await promiser("exec", {
//     ...promiserConfig,
//     callback: (res) => {
//       if (!res.row) return;
//       returns.push(res);
//     },
//   });
//   return returns;
// };
