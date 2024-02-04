import { IProgramData } from "../data/programs";
import { insertProgram, updateProgram } from "../mutations/Program";
import { addWorkout } from "./workoutController";

export async function addProgram(program: IProgramData) {
  const programId = await insertProgram(program);

  if (program.workouts) {
    for await (const workout of program.workouts) {
      await addWorkout(workout, programId);
    }
  }

  return programId;
}

export async function editProgram(id: string, program: IProgramData) {
  return await updateProgram(id, program);
}
