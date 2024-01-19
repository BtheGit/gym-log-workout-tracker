import { useExercises } from "./hooks";
import "./Exercises.css";

export const Exercises = () => {
  const exercises = useExercises();

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
                <a href={`/exercise/${exercise.ExerciseID}`}>
                  <h2>{exercise.ExerciseName}</h2>
                </a>
                {/* Insert rendered description (md -> html) */}
                <h4>Muscle Groups</h4>
                <ul>
                  {exercise.MuscleGroups.map((muscleGroup, idx) => (
                    <a href={`/muscle-group/${muscleGroup.id}`} key={idx}>
                      {muscleGroup.name}
                    </a>
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
