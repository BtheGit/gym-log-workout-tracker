import { FileRoute, Link } from "@tanstack/react-router";
import { getPrograms } from "../db/queries";
import "./exercises.css";

export const Route = new FileRoute("/programs").createRoute({
  component,
  loader,
});

export function component() {
  const programs = Route.useLoaderData();

  if (!programs) {
    return null;
  }

  return (
    <>
      <h1>Programs</h1>
      <ul>
        <li key="add-new">
          <Link to={"/program/new"}>+ Add New Program</Link>
        </li>
        {programs.map((program) => (
          <li key={program.program_id}>
            <Link to={`/program/$id`} params={{ id: program.program_id }}>
              <h2>{program.program_name}</h2>
              <h4>{program.program_author}</h4>
              {/* TODO: Parse MD to html */}
              <p>{program.program_description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function loader() {
  // TODO: ensure default sorting here. (Obviously to support more sorting later)
  return await getPrograms();
}
