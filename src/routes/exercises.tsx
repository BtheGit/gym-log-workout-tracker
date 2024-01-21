import { useLoaderData, Link } from "react-router-dom";
import { getExercises } from "../db/queries";
import "./exercises.css";

export const component = () => {
  const exercises = useLoaderData();

  if (!exercises) {
    return null;
  }

  return (
    <>
      <h1>Exercises</h1>
      {exercises.map((exercise, idx) => (
        <div className="list-wrapper" key={idx}>
          <ul className="list">
            <li className="list-item">
              {exercise.ThumbnailUrl && (
                <img src={exercise.ThumbnailUrl} alt={exercise.ExerciseName} />
              )}

              <div className="item-content">
                <Link to={`/exercise/${exercise.ExerciseID}`}>
                  <h2>{exercise.ExerciseName}</h2>
                </Link>
                {/* Insert rendered description (md -> html) */}
                <h4>Muscle Groups</h4>
                <ul>
                  {exercise.MuscleGroups.map((muscleGroup, idx) => (
                    <Link to={`/muscle-group/${muscleGroup.id}`} key={idx}>
                      {muscleGroup.name}
                    </Link>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
      ))}
    </>
  );
};

export const loader = async () => {
  return await getExercises();
};
