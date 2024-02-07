import { FileRoute, Link } from "@tanstack/react-router";
import { getProgramById } from "../../../db/queries";

export const Route = new FileRoute("/program/$id/").createRoute({
  component,
  loader,
});

export function component() {
  const program = Route.useLoaderData();

  if (!program) {
    return null;
  }

  // TODO: Group and order workouts by day and week

  return (
    <>
      <h1>{program.program_name}</h1>
      <p>{program.program_author}</p>
      <p>{program.program_description}</p>
      <br />
      <Link to={`/program/$id/edit`} params={{ id: program.program_id }}>
        <p>Edit Program</p>
      </Link>
      <hr />
      <h2>Workouts</h2>
      <ul>
        {program.workouts.length > 0 &&
          program.workouts.map((workout) => (
            <li key={workout.workout_id}>
              <p>{workout.workout_name}</p>
              <p>{workout.workout_description}</p>
              <p>Week: {workout.week}</p>
              <p>Day: {workout.day}</p>
            </li>
          ))}
      </ul>
    </>
  );
}

export async function loader({ params: { id } }) {
  return await getProgramById(id);
}
