import { promiser } from "./promiser";

// Based on https://sqlite.org/wasm/doc/tip/api-worker1.md open will store a record of dbId and we don't need to keep passing it
// TODO: Remove redundant uses of dbId
export const connectDB = async () => {
  let response = await promiser("open", {
    filename: "file:worker-promiser.sqlite3?vfs=opfs",
  });
  const { dbId } = response;
  console.log("Opened database with id: " + dbId);
  return {
    close: async () => {
      await promiser("close", { dbId });
    },
    export: async () => {
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
    },
  };
};

// Use custom event and promisified intermediary to create a pub/sub queue for all db operations that is framework-agnostic, so that we don't have to worry about race conditions or instatiating the db for every operation in each component.
