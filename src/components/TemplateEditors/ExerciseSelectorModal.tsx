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
  // NOTE: We can't use a proper form here because (due to react-aria-components implementation, this form is nested in the outer form TODO: Find a better library solution for modals?)
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
            <div>
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
              <button
                type="button"
                disabled={!exerciseIdValue}
                onClick={() => {
                  onSubmit();
                  close();
                }}
              >
                Add
              </button>
            </div>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
}
