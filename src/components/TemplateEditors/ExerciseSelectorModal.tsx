import { DialogTrigger, Button, Modal, Dialog } from "react-aria-components";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";

export type ExerciseSelectorFormData = {
  exercise_id: string;
};

export function ExerciseSelectorModal({ options, onSubmit: _onSubmit }) {
  const { handleSubmit, control, reset, watch } =
    useForm<ExerciseSelectorFormData>();
  const exerciseIdValue = watch("exercise_id");
  const onSubmit = handleSubmit(({ exercise_id }) => {
    _onSubmit(exercise_id);
    reset();
  });
  return (
    <DialogTrigger>
      <Button>Add Exercise</Button>
      <Modal>
        <Dialog>
          {({ close }) => (
            <form
              onSubmit={() => {
                onSubmit();
                close();
              }}
            >
              <Controller
                name="exercise_id"
                control={control}
                render={({ field: { onChange, ref, value } }) => (
                  <Select
                    ref={ref}
                    onChange={(val) => onChange(val?.value)}
                    options={options}
                    value={options.find((c) => c.value === value)}
                  />
                )}
              />
              <button
                type="button"
                onClick={() => {
                  close();
                  reset();
                }}
              >
                Cancel
              </button>
              <button type="submit" disabled={!exerciseIdValue}>
                Add
              </button>
            </form>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
}
