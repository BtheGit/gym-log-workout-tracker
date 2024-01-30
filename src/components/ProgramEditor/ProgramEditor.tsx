import { useForm, useFieldArray, Controller } from "react-hook-form";
import Select from "react-select";
import { useExercises } from "../../db/hooks";
import { useState } from "react";
import "./ProgramEditor.css";
// import { WorkoutEditor } from "./WorkoutEditor";

// Program Editor
// The program editor will wrap a multi component tree that will involve nested dynamic forms.
// Namely the workout editor, which will allow users to create and edit workouts in a program before saving.
// There will be 0 to many workout editors in a program editor. There is a button to add a new workout editor.
// Each workout editor will have a button to delete itself.
// There will be a button to save the program editor. At that point, the locally stored program will be saved to the database.
// The workout editor is a standalone component in so much as it can be used to create independent workouts that are not part of a program.
// As a result, the workout editor should have it's functionality passed in as props. In the case of being a program editor child it will update the program local state on submit/delete. In case of being a standalone workout editor, it will update the database on save/delete.

// NOTE: Manually syncing with definitions in the db/data files. Will need to obviously move to a source of truth later since the validation of form input and importing data shoud share the same shape.

// TODO: Figure out how to have sort_order work correctly with a draggable library (probably just a field update under the hood with built in tooling - may have to roll though)
type ProgramFormData = {
  program_name: string;
  program_description: string;
  program_author: string;
  workouts: WorkoutFormData[];
};

type WorkoutFormData = {
  week: number;
  day: number;
  workout_name: string;
  workout_description: string;
  exercises: WorkoutExerciseFormData[];
};

type WorkoutExerciseFormData = {
  exercise_id: string;
  sets: WorkoutExerciseSetFormData[];
};

type WorkoutExerciseSetFormData = {
  weight?: number;
  reps?: number;
  time?: number;
  distance?: number;
};

const newWorkoutValue = {
  week: 1,
  day: 1,
  workout_name: "",
  workout_description: "",
  exercises: [],
};

const newExerciseValue = {
  exercise_id: "",
  sets: [] as any,
};

export function ProgramEditor() {
  const { register, handleSubmit, control } = useForm<ProgramFormData>();
  const { fields, append, update } = useFieldArray({
    control,
    name: "workouts",
  });
  const onSubmit = handleSubmit(console.log);
  return (
    <>
      <form onSubmit={onSubmit} className="editor">
        <div>
          <div className="form-field">
            <label>Name</label>
            <input
              {...register("program_name", { required: true, maxLength: 250 })}
            />
          </div>
          <div className="form-field">
            <label>Author</label>
            <input {...register("program_author")} />
          </div>
          <div className="form-field">
            <label>Description</label>
            <textarea {...register("program_description")} />
          </div>
        </div>
        <div className="form-field">
          <p>Workouts</p>
          <ul className="editor-group">
            {fields.map((field, index) => (
              <li key={field.id} className="editor">
                <WorkoutEditor update={update} index={index} value={field} />
              </li>
            ))}
            <button
              type="button"
              onClick={() => {
                append({ ...newWorkoutValue });
              }}
            >
              Add Workout
            </button>
          </ul>
        </div>
        <button type="submit" className="button--save">
          Save Program
        </button>
      </form>
    </>
  );
}

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

export function WorkoutExerciseSetEditor() {
  return <></>;
}
