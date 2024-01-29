import { FileRoute } from "@tanstack/react-router";
import { WorkoutEditor } from "../../components/ProgramEditor/WorkoutEditor";

export const Route = new FileRoute("/workout/new").createRoute({
  component,
});

export function component() {
  return (
    <>
      <h1>New Workout</h1>
      <WorkoutEditor />
    </>
  );
}
