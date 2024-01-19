import { useParams } from "react-router-dom";
import { useExercise } from "./hooks";

export const Exercise = () => {
  const id = useParams<{ id: string }>().id!;
  const exercise = useExercise(id);

  if (!exercise) {
    return null;
  }
  return (
    <>
      {exercise.ThumbnailUrl && (
        <img src={exercise.ThumbnailUrl} alt={exercise.ExerciseName} />
      )}

      <div className="item-content">
        <h2>{exercise.ExerciseName}</h2>
        {/* Insert rendered description (md -> html) */}
        <h4>Muscle Groups</h4>
        <ul>
          {exercise.MuscleGroups.map(
            (muscleGroup: { id: string; name: string }) => (
              <li key={muscleGroup.id}>
                <a href={`/muscle-group/${muscleGroup.id}`}>
                  {muscleGroup.name}
                </a>
              </li>
            )
          )}
        </ul>
      </div>
    </>
  );
};
