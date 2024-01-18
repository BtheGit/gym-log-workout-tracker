import { useState, useEffect } from "react";
import { getDatabaseService } from "../db/db";
import { getExercise, getExercises } from "../db/queries";

export type IExerciseView = {
  ExerciseID: string;
  ExerciseName: string;
  ExerciseDescription: string;
  ThumbnailUrl: string;
  VideoUrl: string;
  Reps: number;
  Weight: number;
  Time: number;
  Distance: number;
  MuscleGroups: {
    id: string;
    name: string;
  }[];
};

const db = await getDatabaseService();

/**
 *
 * @param key The querystring param identifier
 * @returns The associated value of the querystring param if found
 */
export const useQueryStringValue = (key: string) => {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    const url = new URL(window.location.href);
    const value = url.searchParams.get(key);
    setValue(value ?? "");
  }, []);

  return value;
};

export const useExercise = (id: string) => {
  const [exercise, setExercise] = useState<IExerciseView>();

  useEffect(() => {
    const updateExercise = async () => {
      const result = await db.exec({
        sql: getExercise(id),
      });

      const exercises: IExerciseView[] = result.map(({ columnNames, row }) =>
        row.reduce((acc: { [key: string]: any }, curr: any, idx: number) => {
          // TODO: Figure out how to parse JSON arbitrarily
          if (columnNames[idx] === "MuscleGroups") {
            curr = JSON.parse(curr);
          }
          acc[columnNames[idx]!] = curr;
          return acc as IExerciseView;
        }, {} as IExerciseView)
      );
      if (exercises[0]) {
        setExercise(exercises[0]);
      }
    };

    if (id) {
      updateExercise();
    }
  }, [id]);

  return exercise;
};
export const useExercises = () => {
  const [exercises, setExercises] = useState<IExerciseView[]>();

  useEffect(() => {
    const updateExercise = async () => {
      const result = await db.exec({
        sql: getExercises(),
      });
      const exercises = result.map(({ columnNames, row }) =>
        row.reduce((acc, curr, idx) => {
          if (columnNames[idx] === "MuscleGroups") {
            curr = JSON.parse(curr);
          }
          acc[columnNames[idx]!] = curr;
          return acc;
        }, {})
      );
      setExercises(exercises);
    };
    updateExercise();
  }, []);

  return exercises;
};
