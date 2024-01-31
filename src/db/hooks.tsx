import { useState, useEffect } from "react";
import { IExerciseView, getExercises } from "./queries";

export const useExercises = () => {
  const [exercises, setExercises] = useState<IExerciseView[]>([]);
  const [exercisesMap, setExercisesMap] = useState<
    Record<string, IExerciseView>
  >({} as Record<string, IExerciseView>);
  useEffect(() => {
    const fetchExercises = async () => {
      const exercises = await getExercises();
      setExercises(exercises);
    };

    fetchExercises();
  }, []);

  // NOTE: It's actually shown to often be faster to simply find in an array. Go figure.
  useEffect(() => {
    setExercisesMap(
      exercises.reduce((acc, curr) => {
        acc[curr.exercise_id] = { ...curr };
        return acc;
      }, {})
    );
  }, [exercises]);

  return [exercises, exercisesMap] as const;
};
