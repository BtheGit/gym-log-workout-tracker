import { sqlite3Worker1Promiser } from "@sqlite.org/sqlite-wasm";

declare module "@sqlite.org/sqlite-wasm" {
  export function sqlite3Worker1Promiser(
    ...args: unknown[]
  ): (...args: unknown[]) => Promise<any>;
}

// https://sqlite.org/wasm/doc/tip/api-worker1.md#promiser
export const promiser: (...args: unknown[]) => Promise<any> = await new Promise(
  (resolve) => {
    const _promiser = sqlite3Worker1Promiser({
      onready: () => {
        resolve(_promiser);
      },
    });
  }
);
