import { useState, useEffect } from "react";
import { IExerciseView, getExercises } from "./queries";

export const useExercises = () => {
  const [exercises, setExercises] = useState<IExerciseView[]>([]);
  useEffect(() => {
    const fetchExercises = async () => {
      const exercises = await getExercises();
      setExercises(exercises);
    };

    fetchExercises();
  }, []);

  return exercises;
};
