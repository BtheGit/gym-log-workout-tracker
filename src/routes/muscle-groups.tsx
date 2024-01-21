import { getMuscleGroups } from "../db/queries";
import { useLoaderData, Link } from "react-router-dom";

export const component = () => {
  const muscleGroups = useLoaderData(); // TODO: type this

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
                <Link to={`/muscle-group/${muscleGroup.id}`}>
                  <h2>{muscleGroup.name}</h2>
                </Link>
              </div>
            </li>
          </ul>
        </div>
      ))}
    </>
  );
};

export const loader = async () => {
  return await getMuscleGroups();
};
