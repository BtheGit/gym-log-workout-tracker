import { useMuscleGroups } from "./hooks";

export const MuscleGroups = () => {
  const muscleGroups = useMuscleGroups();

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
                <a href={`/muscle-group/${muscleGroup.id}`}>
                  <h2>{muscleGroup.name}</h2>
                </a>
              </div>
            </li>
          </ul>
        </div>
      ))}
    </>
  );
};
