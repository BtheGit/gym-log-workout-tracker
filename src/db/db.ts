import { promiser } from "./promiser";

// TODO: Use custom event and promisified intermediary to create a pub/sub queue for all db operations that is framework-agnostic, so that we don't have to worry about race conditions or instatiating the db for every operation in each component.

export type IExecReturn = {
  columnNames: string[];
  row: any[];
  rowNumber: number;
  type: string;
};

/**
 * The Database Service is responsible for exposing a single pint of contact for all database operations.
 * It is also responsible for managing the database connection and ensuring that all operations are executed in the correct order and without any parallel requests.
 *
 */
export class DatabaseService {
  dbId: string | null = null;
  // requestQueue: any[] = [];

  static instantiate = async () => {
    const instance = new DatabaseService();
    await instance.open();
    return instance;
  };

  open = async () => {
    const response: { dbId: string } = await promiser("open", {
      filename: "file:worker-promiser.sqlite3?vfs=opfs",
    });
    const { dbId } = response;
    console.log("Opened database with id: " + dbId);
    // Based on https://sqlite.org/wasm/doc/tip/api-worker1.md open will store a record of dbId and we don't need to keep passing it, except for non-exec methods.
    this.dbId = dbId;
  };

  close = async () => {
    await promiser("close", { dbId: this.dbId });
  };

  export = async () => {
    // https://sqlite.org/wasm/doc/trunk/api-worker1.md#promiser
    // https://sqlite.org/wasm/doc/trunk/cookbook.md#uldl
    console.log("Exporting database to file...");
    const file = await promiser("export", {
      dbId: this.dbId,
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

  exec = async (promiserConfig) => {
    const returnValue: IExecReturn[] = [];
    await promiser("exec", {
      ...promiserConfig,
      dbId: this.dbId,
      callback: (res: IExecReturn) => {
        if (!res.row) return;
        returnValue.push(res);
      },
    });
    return returnValue;
  };
}

// Singleton to ensure that all requests will go through the same DB connection and there will be no parallelizing of requests (since sqlite in wasm is single-threaded and synchronous (though workers aren't))
let instance: DatabaseService | null = null;

export const getDatabaseService = async () => {
  if (!instance) {
    instance = await DatabaseService.instantiate();
  }
  return instance;
};

export const db = await getDatabaseService();
