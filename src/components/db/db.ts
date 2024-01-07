import { sqlite3Worker1Promiser } from "@sqlite.org/sqlite-wasm";

declare module "@sqlite.org/sqlite-wasm" {
  export function sqlite3Worker1Promiser(
    ...args: any
  ): (...args: any[]) => Promise<any>;
}

console.log("Loading and initializing SQLite3 module...");

const promiser: (...args: any[]) => Promise<any> = await new Promise(
  (resolve) => {
    const _promiser = sqlite3Worker1Promiser({
      onready: () => {
        resolve(_promiser);
      },
    });
  }
);

console.log("Done initializing. Running demo...");

let response;

response = await promiser("config-get", {});
console.log("Running SQLite3 version", response.result.version.libVersion);

response = await promiser("open", {
  filename: "file:worker-promiser.sqlite3?vfs=opfs",
});
const { dbId } = response;
console.log(dbId);
console.log(
  "OPFS is available, created persisted database at",
  response.result.filename.replace(/^file:(.*?)\?vfs=opfs$/, "$1")
);

await promiser("exec", {
  dbId,
  sql: "DROP TABLE IF EXISTS t",
});
console.log("Creating a table...");

await promiser("exec", {
  dbId,
  sql: "CREATE TABLE IF NOT EXISTS t(a TEXT,b INTEGER,c INTEGER)",
});
console.log("Creating a table...");

console.log("Insert some data using exec()...");
for (let i = 20; i <= 25; ++i) {
  await promiser("exec", {
    dbId,
    sql: "INSERT INTO t(a,b) VALUES (?,?)",
    bind: [i, i * 2],
  });
}

console.log("Query data with exec()");
await promiser("exec", {
  dbId,
  sql: "SELECT a FROM t ORDER BY a LIMIT 3",
  callback: (result) => {
    if (!result.row) {
      return;
    }
    console.log(result.row);
  },
});

console.log("Query all data with exec()");
await promiser("exec", {
  dbId,
  sql: "SELECT * FROM T",
  callback: (result) => {
    if (!result.row) {
      return;
    }
    console.log(result.row);
  },
});

await promiser("close", { dbId });
