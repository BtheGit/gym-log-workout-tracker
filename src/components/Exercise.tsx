import { useQueryStringValue, useExercise } from "./React/hooks";

export const Exercise = () => {
  // TODO: 404 redirects? (Or equivalent since this is an 'app')
  const id = useQueryStringValue("id");
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
              <a
                href={`/muscleGroup?id=${muscleGroup.id}`}
                key={muscleGroup.id}
              >
                {muscleGroup.name}
              </a>
            )
          )}
        </ul>
      </div>
    </>
  );
};
