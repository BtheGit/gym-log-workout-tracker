import { useForm, useFieldArray } from "react-hook-form";
import "./ProgramEditor.css";
import { type WorkoutFormData, WorkoutEditor } from "./WorkoutEditor";
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

const newWorkoutValue = {
  week: 1,
  day: 1,
  workout_name: "",
  workout_description: "",
  exercises: [],
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
