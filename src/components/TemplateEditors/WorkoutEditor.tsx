/**
 * WorkoutEditor.tsx
 *
 * A resusable component wrapping a form that will allow users to create and edit workouts.
 */

import { useForm, useFieldArray } from "react-hook-form";
import { ExerciseSelectorModal } from "./ExerciseSelectorModal";
import {
  type WorkoutExerciseFormData,
  WorkoutExerciseEditor,
} from "./WorkoutExerciseEditor";
import { useExercises } from "../../db/hooks";
import { WorkoutExerciseSetFormData } from "./WorkoutExerciseSetEditor";

export type WorkoutFormData = {
  week: number;
  day: number;
  workout_name: string;
  workout_description: string;
  exercises: WorkoutExerciseFormData[];
};

export function WorkoutEditor({ update, index, value }) {
  const { register, handleSubmit, control, setValue } =
    useForm<WorkoutFormData>({
      defaultValues: value,
    });
  const { fields, append } = useFieldArray({
    control,
    name: "exercises",
  });

  const [exercises, exercisesMap] = useExercises();

  const getSetTemplate = (exercise_id: string) => {
    const newSetValue = {} as WorkoutExerciseSetFormData;
    const exerciseDefinition = exercisesMap[exercise_id];

    if (!exerciseDefinition) {
      return newSetValue;
    }

    const settingKeys = ["reps", "weight", "time", "distance"];

    for (const setting of settingKeys) {
      // NOTE: Not Boolean because right now it's still the raw (not coerced) form from SQLite
      if (exerciseDefinition[setting] === 1) {
        newSetValue[setting] = 0;
      }
    }

    return newSetValue;
  };

  const options = exercises.map(({ exercise_id, exercise_name }) => ({
    value: exercise_id,
    label: exercise_name,
  }));
  const exerciseSelectHandler = (exercise_id: string) => {
    append({ exercise_id, sets: [getSetTemplate(exercise_id)] });
  };
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
              <p>{exercisesMap[field.exercise_id]?.exercise_name}</p>
              <WorkoutExerciseEditor
                value={field}
                setTemplate={getSetTemplate(field.exercise_id)}
                updateSetsField={(value) => {
                  setValue(`exercises.${index}.sets`, value);
                }}
              />
            </li>
          ))}
          <ExerciseSelectorModal
            options={options}
            onSubmit={exerciseSelectHandler}
          />
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
