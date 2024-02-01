import { IProgramData } from "../data/programs";
import { insertProgram } from "../mutations/Program";
import { addWorkout } from "./workoutController";

export async function addProgram(program: IProgramData) {
  const programId = await insertProgram(program);

  if (!program.workouts) {
    return;
  }
  for await (const workout of program.workouts) {
    await addWorkout(workout, programId);
  }
}
