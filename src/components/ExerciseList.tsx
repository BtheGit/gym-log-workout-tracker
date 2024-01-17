import React, { useState, useEffect } from "react";

export const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    // TODO: Query sqlite db for exercises (view?)
    // Query all exercises.
  }, []);

  return (
    <>
      <h1>Exercises</h1>
      {exercises.map((exercise) => (
        <>
          <p>Todo</p>
        </>
      ))}
    </>
  );
};
