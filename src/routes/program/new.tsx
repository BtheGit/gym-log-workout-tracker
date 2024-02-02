import { FileRoute } from "@tanstack/react-router";
import { ProgramEditor } from "../../components/TemplateEditors/ProgramEditor";

export const Route = new FileRoute("/program/new").createRoute({
  component,
});

export function component() {
  return (
    <>
      <h1>Create New Program</h1>
      <ProgramEditor />
    </>
  );
}
