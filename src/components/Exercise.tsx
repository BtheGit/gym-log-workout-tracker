import React, { useState, useEffect } from "react";
import { connectDB } from "./db/db";
import { getExercise } from "./db/queries";

const db = connectDB();

export const Exercise = () => {
  const [exercise, setExercise] = useState<any>(null);

  useEffect(() => {
    const updateExercise = async () => {
      const id = new URL(window.location.href).searchParams.get("id");
      if (!id) return;
      const exercise = await getExercise(id);
      setExercise(exercise);
    };
    updateExercise();
  }, []);

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
          {exercise.MuscleGroups.map((muscleGroup) => (
            <a href={`/muscleGroup?id=${muscleGroup.id}`}>{muscleGroup.name}</a>
          ))}
        </ul>
      </div>
    </>
  );
};
