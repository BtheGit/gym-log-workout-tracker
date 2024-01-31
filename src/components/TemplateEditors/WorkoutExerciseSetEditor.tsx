import { useForm, Controller } from "react-hook-form";

export type WorkoutExerciseSetFormData = {
  weight?: number;
  reps?: number;
  time?: number;
  distance?: number;
};

// How do I update the parent fields array without manually having to call handleSubmit (instead on each value change?)

export function WorkoutExerciseSetEditor({ updateField, value }) {
  const { control } = useForm<WorkoutExerciseSetFormData>({
    defaultValues: value,
  });
  return (
    <>
      {value.hasOwnProperty("reps") && (
        <Controller
          control={control}
          name="reps"
          render={({ field: { onChange, value, ref } }) => (
            <div className="form-field">
              <label>Reps</label>
              <input
                ref={ref}
                type="number"
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                  updateField("reps", e.target.value);
                }}
              ></input>
            </div>
          )}
        />
      )}
      {value.hasOwnProperty("weight") && (
        <Controller
          control={control}
          name="weight"
          render={({ field: { onChange, value, ref } }) => (
            <div className="form-field">
              <label>Weight</label>
              <input
                ref={ref}
                type="number"
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                  updateField("weight", e.target.value);
                }}
              ></input>
            </div>
          )}
        />
      )}
      {value.hasOwnProperty("time") && (
        <Controller
          control={control}
          name="time"
          render={({ field: { onChange, value, ref } }) => (
            <div className="form-field">
              <label>Time</label>
              <input
                ref={ref}
                type="number"
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                  updateField("time", e.target.value);
                }}
              ></input>
            </div>
          )}
        />
      )}
      {value.hasOwnProperty("distance") && (
        <Controller
          control={control}
          name="distance"
          render={({ field: { onChange, value, ref } }) => (
            <div className="form-field">
              <label>Distance</label>
              <input
                ref={ref}
                type="number"
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                  updateField("distance", e.target.value);
                }}
              ></input>
            </div>
          )}
        />
      )}
    </>
  );
}
