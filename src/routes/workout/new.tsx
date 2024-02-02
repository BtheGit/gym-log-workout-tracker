import { FileRoute, useSearch } from "@tanstack/react-router";
import { WorkoutEditor } from "../../components/TemplateEditors/WorkoutEditor";

type IWorkoutEditorSearchParams = {
  programId: string | undefined;
};

export const Route = new FileRoute("/workout/new").createRoute({
  component,
  validateSearch: (
    search: Record<string, unknown>
  ): IWorkoutEditorSearchParams => {
    return {
      programId: (search.programId as string) ?? undefined,
    };
  },
});

export function component() {
  const { programId } = useSearch({ from: "/workout/new" });
  return (
    <>
      <h1>New Workout</h1>
      <WorkoutEditor programId={programId} />
    </>
  );
}
