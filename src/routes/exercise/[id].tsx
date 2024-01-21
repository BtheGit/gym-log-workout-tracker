import { useLoaderData, Link } from "react-router-dom";
import { getExerciseById } from "../../db/queries";

export const component = () => {
  const exercise = useLoaderData();

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
                <Link to={`/muscle-group/${muscleGroup.id}`}>
                  {muscleGroup.name}
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
    </>
  );
};

export const loader = async (id) => {
  return await getExerciseById(id);
};
