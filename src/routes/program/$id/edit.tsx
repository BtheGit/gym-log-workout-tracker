import { FileRoute } from "@tanstack/react-router";
import { getProgramById } from "../../../db/queries";
import { ProgramEditor } from "../../../components/TemplateEditors/ProgramEditor";

export const Route = new FileRoute("/program/$id/edit").createRoute({
  component,
  loader,
});

export function component() {
  const program = Route.useLoaderData();

  if (!program) {
    return null;
  }

  return (
    <>
      <h1>Edit Program</h1>
      <ProgramEditor program={program} />
    </>
  );
}

export async function loader({ params: { id } }) {
  return await getProgramById(id);
}
