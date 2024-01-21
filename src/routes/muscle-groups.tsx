import { getMuscleGroups } from "../db/queries";
import { FileRoute, Link } from "@tanstack/react-router";

export const Route = new FileRoute("/muscle-groups").createRoute({
  component,
  loader,
});

export function component() {
  const muscleGroups = Route.useLoaderData(); // TODO: type this

  if (!muscleGroups) {
    return null;
  }

  return (
    <>
      <h1>Muscle Groups</h1>
      {muscleGroups.map((muscleGroup, idx) => (
        <div className="list-wrapper" key={idx}>
          <ul className="list">
            <li className="list-item">
              <div className="item-content">
                <Link to={`/muscle-group/$id`} params={{ id: muscleGroup.id }}>
                  <h2>{muscleGroup.name}</h2>
                </Link>
              </div>
            </li>
          </ul>
        </div>
      ))}
    </>
  );
}

export async function loader() {
  return await getMuscleGroups();
}
