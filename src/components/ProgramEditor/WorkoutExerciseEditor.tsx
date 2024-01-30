import Select from "react-select";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useExercises } from "../../db/hooks";
import {
  type WorkoutExerciseSetFormData,
  WorkoutExerciseSetEditor,
} from "./WorkoutExerciseSetEditor";

export type WorkoutExerciseFormData = {
  exercise_id: string;
  sets: WorkoutExerciseSetFormData[];
};

// Need to have access to all available exercises for populating select
export function WorkoutExerciseEditor({ update, index, value }) {
  const { register, handleSubmit, control, watch } =
    useForm<WorkoutExerciseFormData>({
      defaultValues: value,
    });
  const exerciseIdValue = watch("exercise_id");
  const {
    fields,
    append,
    update: updateSet,
  } = useFieldArray({
    control,
    name: "sets",
  });
  const exercises = useExercises();
  const options = exercises.map(({ exercise_id, exercise_name }) => ({
    value: exercise_id,
    label: exercise_name,
  }));

  // Not getting a value.exercise_id until actually updating, that's not ideal. We need to base our set editor off of the input instead of the value TODO:
  return (
    <>
      <Controller
        name="exercise_id"
        control={control}
        render={({ field: { onChange, ref } }) => (
          <Select
            inputRef={ref}
            onChange={(val) => onChange(val?.value)}
            options={options}
            value={options.find((c) => c.value === value.exercise_id)}
          />
        )}
      />
      {exerciseIdValue && (
        <div className="form-field">
          {/* TODO: Unlike with other fields. Sets is dependent on exercise (for validation) so if exercise changes, we need to clear sets. (I think react-hook-form support this) */}
          <p>Sets</p>
          <ul className="editor-group">
            {fields.map((field, index) => (
              <li key={field.id}>
                <WorkoutExerciseSetEditor />
              </li>
            ))}
            <button
              type="button"
              onClick={() => {
                append({ ...newSetValue });
              }}
            >
              Add Set
            </button>
          </ul>
        </div>
      )}
      {exerciseIdValue && (
        <button
          type="button"
          className="button--save"
          onClick={handleSubmit((data) => update(index, data))}
        >
          Save Exercise
        </button>
      )}
    </>
  );
}
