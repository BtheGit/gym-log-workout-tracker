import { useForm, useFieldArray } from "react-hook-form";
import {
  type WorkoutExerciseSetFormData,
  WorkoutExerciseSetEditor,
} from "./WorkoutExerciseSetEditor";

export type WorkoutExerciseFormData = {
  id: string;
  sets: WorkoutExerciseSetFormData[];
};

// Need to have access to all available exercises for populating select
export function WorkoutExerciseEditor({ value, setTemplate, updateSetsField }) {
  const { control, setValue, watch } = useForm<WorkoutExerciseFormData>({
    defaultValues: value,
  });
  const { fields, append } = useFieldArray({
    control,
    name: "sets",
  });
  const setsValue = watch("sets");

  // Not getting a value.exercise_id until actually updating, that's not ideal. We need to base our set editor off of the input instead of the value TODO:
  return (
    <>
      <div className="form-field">
        <ul className="editor-group">
          {fields.map((field, index) => (
            <li key={field.id}>
              <WorkoutExerciseSetEditor
                value={field}
                updateField={(
                  fieldName: "reps" | "weight" | "time" | "distance",
                  value
                ) => {
                  setValue(`sets.${index}.${fieldName}`, value);
                  // We cant use useeffect to watch this correctly since it's a mutated value
                  // https://github.com/react-hook-form/react-hook-form/issues/7068#issuecomment-972942342
                  updateSetsField(setsValue);
                }}
              />
            </li>
          ))}
          <button
            type="button"
            onClick={() => {
              append({ ...setTemplate });
            }}
          >
            Add Set
          </button>
        </ul>
      </div>
    </>
  );
}
