import { useState, useEffect } from "react";
import { useDatabase } from "../db/DatabaseContext";
import {
  getExercise,
  getExercises,
  getMuscleGroups,
  getMuscleGroup,
} from "../db/queries";

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

export type IMuscleGroupWithExercisesView = {
  id: string;
  name: string;
  exercises: { ExerciseID: string; ExerciseName: string }[];
};

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
  }, [key]);

  return value;
};

export const useExercise = (id: string) => {
  const db = useDatabase();
  const [exercise, setExercise] = useState<IExerciseView>();

  useEffect(() => {
    const updateExercise = async () => {
      const result = await db.exec({
        sql: getExercise(id),
      });

      const exercises: IExerciseView[] = result.map(({ columnNames, row }) =>
        row.reduce(
          (acc: { [key: string]: unknown }, curr: unknown, idx: number) => {
            // TODO: Figure out how to parse JSON arbitrarily
            if (columnNames[idx] === "MuscleGroups") {
              curr = JSON.parse(curr as string);
            }
            acc[columnNames[idx]!] = curr;
            return acc as IExerciseView;
          },
          {} as IExerciseView
        )
      );
      if (exercises[0]) {
        setExercise(exercises[0]);
      }
    };

    if (id) {
      updateExercise();
    }
  }, [db, id]);

  return exercise;
};

export const useExercises = () => {
  const db = useDatabase();
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
  }, [db]);

  return exercises;
};

export const useMuscleGroups = () => {
  const db = useDatabase();
  const [muscleGroups, setMuscleGroups] =
    useState<IMuscleGroupWithExercisesView[]>();

  useEffect(() => {
    const updateMuscleGroups = async () => {
      const result = await db.exec({
        sql: getMuscleGroups(),
      });
      const muscleGroups = result.map(({ columnNames, row }) =>
        row.reduce((acc, curr, idx) => {
          if (columnNames[idx] === "exercises") {
            curr = JSON.parse(curr);
          }
          acc[columnNames[idx]!] = curr;
          return acc;
        }, {})
      );
      setMuscleGroups(muscleGroups);
    };
    updateMuscleGroups();
  }, [db]);

  return muscleGroups;
};

export const useMuscleGroup = (id: string) => {
  const db = useDatabase();
  const [muscleGroup, setMuscleGroup] =
    useState<IMuscleGroupWithExercisesView>();

  useEffect(() => {
    const updateMuscleGroup = async () => {
      const result = await db.exec({
        sql: getMuscleGroup(id),
      });
      const muscleGroups: IMuscleGroupWithExercisesView[] = result.map(
        ({ columnNames, row }) =>
          row.reduce(
            (acc: { [key: string]: unknown }, curr: unknown, idx: number) => {
              if (columnNames[idx] === "exercises") {
                curr = JSON.parse(curr as string);
              }
              acc[columnNames[idx]!] = curr;
              return acc as IMuscleGroupWithExercisesView;
            },
            {} as IMuscleGroupWithExercisesView
          )
      );
      if (muscleGroups[0]) {
        setMuscleGroup(muscleGroups[0]);
      }
    };

    if (id) {
      updateMuscleGroup();
    }
  }, [db, id]);

  return muscleGroup;
};
