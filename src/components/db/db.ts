import { sqlite3Worker1Promiser } from "@sqlite.org/sqlite-wasm";
import * as MuscleGroup from "./data/MuscleGroup";
import * as Exercise from "./data/Exercise";
import * as ExerciseMuscleGroup from "./data/ExerciseMuscleGroup";

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

let response = await promiser("open", {
  filename: "file:worker-promiser.sqlite3?vfs=opfs",
});

const { dbId } = response;
console.log("Opened database with id: " + dbId);

const exportDB = async () => {
  // https://sqlite.org/wasm/doc/trunk/api-worker1.md#promiser
  // https://sqlite.org/wasm/doc/trunk/cookbook.md#uldl
  console.log("Exporting database to file...");
  const file = await promiser("export", {
    dbId,
    filename: "file:worker-promiser-export.sqlite3?vfs=opfs",
  });
  console.log(file);
  // Initiate download of the exported file
  const a = document.createElement("a");
  const blob = new Blob([file.result.byteArray.buffer], {
    type: file.result.mimeType,
  });
  a.href = URL.createObjectURL(blob);
  a.download = "worker-promiser-export.sqlite3";
  a.click();
};

// Clear Old Tables
await promiser("exec", {
  dbId,
  sql: `DROP TABLE IF EXISTS ${MuscleGroup.name}`,
});
await promiser("exec", {
  dbId,
  sql: `DROP TABLE IF EXISTS ${Exercise.name}`,
});
await promiser("exec", {
  dbId,
  sql: `DROP TABLE IF EXISTS ${ExerciseMuscleGroup.name}`,
});

// Create Tables Anew
await promiser("exec", {
  dbId,
  sql: MuscleGroup.create,
});
await promiser("exec", {
  dbId,
  sql: Exercise.create,
});
await promiser("exec", {
  dbId,
  sql: ExerciseMuscleGroup.create,
});

// Populate Tables
await promiser("exec", {
  dbId,
  sql: MuscleGroup.populate,
});

for (const exercise of Exercise.populateEach) {
  let exerciseId;
  await promiser("exec", {
    dbId,
    sql: exercise.sql,
    callback: async (res) => {
      if (!res.row) return;
      exerciseId = res.row[0];
    },
  });
  const sql = `BEGIN TRANSACTION;
  ${exercise.value.muscleGroups
    .map((muscleGroup) => {
      return `INSERT INTO ExerciseMuscleGroup(ExerciseID, MuscleGroupID) VALUES (${exerciseId}, (SELECT id FROM MuscleGroup WHERE Name = '${muscleGroup}'));`;
    })
    .join("\n")}
  COMMIT;`;
  await promiser("exec", {
    dbId,
    sql,
  });
}

await promiser("exec", {
  dbId,
  sql: "SELECT sql FROM sqlite_schema WHERE TYPE = 'table'",
  callback: (res) => console.log(res.row),
});

await exportDB();

await promiser("close", { dbId });
