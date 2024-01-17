import React, { useState, useEffect } from "react";
import { connectDB } from "./db/db";
import { getExercises } from "./db/queries";
import "./ExerciseList.css";

const db = connectDB();

export const ExerciseList = () => {
  const [exercises, setExercises] = useState<any>([]);

  useEffect(() => {
    const awaitExercises = async () => {
      const exercises = await getExercises();
      setExercises(exercises);
    };

    awaitExercises();
  }, []);

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
                <a href={`/exercise?id=${exercise.ExerciseID}`}>
                  <h2>{exercise.ExerciseName}</h2>
                </a>
                {/* Insert rendered description (md -> html) */}
                <h4>Muscle Groups</h4>
                <ul>
                  {exercise.MuscleGroups.map((muscleGroup, idx) => (
                    <a href={`/muscleGroup/${muscleGroup.id}`} key={idx}>
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
