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
import { addWorkout } from "../../db/controllers/workoutController";
import { useNavigate } from "@tanstack/react-router";

export type WorkoutFormData = {
  // week: number;
  // day: number;
  name: string;
  description: string;
  exercises: WorkoutExerciseFormData[];
};

export function WorkoutEditor({ programId }) {
  const navigate = useNavigate({ from: "/workout/new" });
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<WorkoutFormData>();
  const { fields, append } = useFieldArray({
    control,
    name: "exercises",
    keyName: "fieldId", // NOTE: To avoid name collision with id key from data
    rules: {
      required: {
        value: true,
        message: "At least one exercise is required to create a new workout",
      },
      minLength: 1,
    },
  });

  const [exercises, exercisesMap] = useExercises();

  const onSubmit = handleSubmit(async (data) => {
    if (programId) {
      await addWorkout(data, programId);
      reset();
      navigate({ to: "/program/$id", params: { id: programId } });
    } else {
      const workoutId = await addWorkout(data);
      reset();
      navigate({ to: "/workout/$id", params: { id: workoutId } });
    }
  });

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

  const exerciseSelectHandler = (id: string) => {
    append({ id, sets: [getSetTemplate(id)] });
  };

  return (
    <>
      <form onSubmit={onSubmit} className="editor">
        <div className="form-field">
          <label>Name</label>
          <input
            {...register("name", {
              required: { value: true, message: "Field is required" },
              maxLength: {
                value: 250,
                message: "Name cannot be longer than 250 characters",
              },
            })}
          />
          {errors.name?.message && <p>{errors.name.message}</p>}
        </div>
        <div className="form-field">
          <label>Description</label>
          <textarea {...register("description")} />
        </div>
        <div className="form-field">
          <p>Exercises</p>
          <ul className="editor-group">
            {fields.map((field, index) => (
              <li key={field.fieldId} className="editor">
                <p>{exercisesMap[field.id]?.exercise_name}</p>
                <WorkoutExerciseEditor
                  value={field}
                  setTemplate={getSetTemplate(field.id)}
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
          {errors.exercises?.root?.message && (
            <p>{errors.exercises?.root?.message}</p>
          )}
        </div>
        <button type="submit" className="button--save">
          Save Workout
        </button>
      </form>
    </>
  );
}
