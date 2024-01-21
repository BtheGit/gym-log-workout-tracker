import { seedDB } from "../db/seed";
import { createViews } from "../db/views/index";
import { db } from "../db/db";
import { FileRoute } from "@tanstack/react-router";

export const Route = new FileRoute("/").createRoute({
  component,
});

export function component() {
  const onSeedHandler = async () => {
    const start = performance.now();
    await seedDB(db);
    await createViews(db);
    const end = performance.now();
    console.log(`Database reseeded in ${end - start}ms`);
  };

  const onExportHandler = async () => {
    const start = performance.now();
    await db.export();
    const end = performance.now();
    console.log(`Database exported in ${end - start}ms`);
  };

  return (
    <>
      <button onClick={onSeedHandler}>Seed DB</button>
      <button onClick={onExportHandler}>Export DB</button>
    </>
  );
}
