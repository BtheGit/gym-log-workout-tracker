/**
 * WorkoutEditor.tsx
 *
 * A resusable component wrapping a form that will allow users to create and edit workouts.
 */

import { useForm, useFieldArray } from "react-hook-form";
import {
  type WorkoutExerciseFormData,
  WorkoutExerciseEditor,
} from "./WorkoutExerciseEditor";

export type WorkoutFormData = {
  week: number;
  day: number;
  workout_name: string;
  workout_description: string;
  exercises: WorkoutExerciseFormData[];
};

const newExerciseValue = {
  exercise_id: "",
  sets: [] as any,
};

export function WorkoutEditor({ update, index, value }) {
  const { register, handleSubmit, control } = useForm<WorkoutFormData>({
    defaultValues: value,
  });
  const {
    fields,
    append,
    update: updateExercise,
  } = useFieldArray({
    control,
    name: "exercises",
  });
  return (
    <>
      <div className="form-field">
        <label>Name</label>
        <input
          {...register("workout_name", { required: true, maxLength: 250 })}
        />
      </div>
      <div className="form-field">
        <label>Description</label>
        <textarea {...register("workout_description")} />
      </div>
      <div className="form-field">
        <p>Exercises</p>
        <ul className="editor-group">
          {fields.map((field, index) => (
            <li key={field.id} className="editor">
              <WorkoutExerciseEditor
                update={updateExercise}
                index={index}
                value={field}
              />
            </li>
          ))}
          <button
            type="button"
            onClick={() => {
              append({ ...newExerciseValue });
            }}
          >
            Add Exercise
          </button>
        </ul>
      </div>
      <button
        type="button"
        className="button--save"
        onClick={handleSubmit((data) => update(index, data))}
      >
        Save Workout
      </button>
    </>
  );
}
