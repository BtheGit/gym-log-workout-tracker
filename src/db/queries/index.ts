import { db } from "../db";
import {
  ExerciseWithMuscleGroupsView,
  MuscleGroupWithExercisesView,
  WorkoutWithExercisesView,
} from "../constants";

type IWorkoutView = {
  workout_id: string;
  workout_name: string;
  workout_description: string;
  exercises: {
    workout_exercise_id: number;
    exercise_id: string;
    exercise_name: string;
    sort_order: number;
    sets: {
      set_id: string;
      reps: number | null;
      weight: number | null;
      time: number | null;
      distance: number | null;
      sort_order: number;
    }[];
  }[];
};

export const getWorkouts = async () => {
  const result = await db.exec({
    sql: `
    SELECT
      ${WorkoutWithExercisesView.cols.workout_id},
      ${WorkoutWithExercisesView.cols.workout_name},
      ${WorkoutWithExercisesView.cols.workout_description},
      ${WorkoutWithExercisesView.cols.exercises.name}
    FROM
      ${WorkoutWithExercisesView.name}
    `,
  });

  const workouts: IWorkoutView[] = result.map(({ columnNames, row }) =>
    row.reduce((acc, curr, idx) => {
      if (columnNames[idx] === WorkoutWithExercisesView.cols.exercises.name) {
        curr = JSON.parse(curr);
      }
      acc[columnNames[idx]!] = curr;
      return acc;
    }, {})
  );
  return workouts;
};

export const getWorkoutByID = async (id: string) => {};

type IExerciseView = {
  exercise_id: string;
  exercise_name: string;
  exercise_description: string;
  thumbnail_url: string;
  video_url: string;
  reps: number;
  weight: number;
  time: number;
  distance: number;
  muscle_groups: {
    id: string;
    name: string;
  }[];
};

// TODO: Probably combine data shaping callbacks into one function
export const getExercises = async () => {
  const result = await db.exec({
    sql: `
  SELECT
    ${ExerciseWithMuscleGroupsView.cols.exercise_id},
    ${ExerciseWithMuscleGroupsView.cols.exercise_name},
    ${ExerciseWithMuscleGroupsView.cols.exercise_description},
    ${ExerciseWithMuscleGroupsView.cols.thumbnail_url},
    ${ExerciseWithMuscleGroupsView.cols.video_url},
    ${ExerciseWithMuscleGroupsView.cols.reps},
    ${ExerciseWithMuscleGroupsView.cols.weight},
    ${ExerciseWithMuscleGroupsView.cols.time},
    ${ExerciseWithMuscleGroupsView.cols.distance},
    json_extract(${ExerciseWithMuscleGroupsView.cols.muscle_groups.name}, '$') AS ${ExerciseWithMuscleGroupsView.cols.muscle_groups.name}
  FROM
    ${ExerciseWithMuscleGroupsView.name};
  `,
  });
  const exercises: IExerciseView[] = result.map(({ columnNames, row }) =>
    row.reduce((acc, curr, idx) => {
      if (
        columnNames[idx] ===
        ExerciseWithMuscleGroupsView.cols.muscle_groups.name
      ) {
        curr = JSON.parse(curr);
      }
      acc[columnNames[idx]!] = curr;
      return acc;
    }, {})
  );
  return exercises;
};

export const getExerciseById = async (id: string) => {
  const result = await db.exec({
    sql: `
    SELECT
      ${ExerciseWithMuscleGroupsView.cols.exercise_id},
      ${ExerciseWithMuscleGroupsView.cols.exercise_name},
      ${ExerciseWithMuscleGroupsView.cols.exercise_description},
      ${ExerciseWithMuscleGroupsView.cols.thumbnail_url},
      ${ExerciseWithMuscleGroupsView.cols.video_url},
      ${ExerciseWithMuscleGroupsView.cols.reps},
      ${ExerciseWithMuscleGroupsView.cols.weight},
      ${ExerciseWithMuscleGroupsView.cols.time},
      ${ExerciseWithMuscleGroupsView.cols.distance},
      json_extract(${ExerciseWithMuscleGroupsView.cols.muscle_groups.name}, '$') AS ${ExerciseWithMuscleGroupsView.cols.muscle_groups.name}
    FROM
      ${ExerciseWithMuscleGroupsView.name}
    WHERE
      ${ExerciseWithMuscleGroupsView.cols.exercise_id} = '${id}';
    `,
  });

  const exercises: IExerciseView[] = result.map(({ columnNames, row }) =>
    row.reduce(
      (acc: { [key: string]: unknown }, curr: unknown, idx: number) => {
        // TODO: Figure out how to parse JSON arbitrarily
        if (
          columnNames[idx] ===
          ExerciseWithMuscleGroupsView.cols.muscle_groups.name
        ) {
          curr = JSON.parse(curr as string);
        }
        acc[columnNames[idx]!] = curr;
        return acc as IExerciseView;
      },
      {} as IExerciseView
    )
  );
  if (exercises[0]) {
    return exercises[0];
  }
};

type IMuscleGroupWithExercisesView = {
  id: string;
  name: string;
  exercises: { exercise_id: string; exercise_name: string }[];
};

export const getMuscleGroups = async () => {
  const result = await db.exec({
    sql: `
    SELECT
      ${MuscleGroupWithExercisesView.cols.muscle_group_id} as id,
      ${MuscleGroupWithExercisesView.cols.muscle_group_name} as name,
      json_extract(${MuscleGroupWithExercisesView.cols.exercises.name}, '$') AS ${MuscleGroupWithExercisesView.cols.exercises.name}
    FROM
      ${MuscleGroupWithExercisesView.name};
    `,
  });
  const muscleGroups: IMuscleGroupWithExercisesView[] = result.map(
    ({ columnNames, row }) =>
      row.reduce((acc, curr, idx) => {
        if (
          columnNames[idx] === MuscleGroupWithExercisesView.cols.exercises.name
        ) {
          curr = JSON.parse(curr);
        }
        acc[columnNames[idx]!] = curr;
        return acc;
      }, {})
  );
  return muscleGroups;
};

export const getMuscleGroupById = async (id: string) => {
  const result = await db.exec({
    sql: `
    SELECT
      ${MuscleGroupWithExercisesView.cols.muscle_group_id} as id,
      ${MuscleGroupWithExercisesView.cols.muscle_group_name} as name,
      json_extract(${MuscleGroupWithExercisesView.cols.exercises.name}, '$') AS ${MuscleGroupWithExercisesView.cols.exercises.name}
    FROM
      ${MuscleGroupWithExercisesView.name}
    WHERE
      ${MuscleGroupWithExercisesView.cols.muscle_group_id} = '${id}';
    `,
  });

  const muscleGroups: IMuscleGroupWithExercisesView[] = result.map(
    ({ columnNames, row }) =>
      row.reduce(
        (acc: { [key: string]: unknown }, curr: unknown, idx: number) => {
          if (
            columnNames[idx] ===
            MuscleGroupWithExercisesView.cols.exercises.name
          ) {
            curr = JSON.parse(curr as string);
          }
          acc[columnNames[idx]!] = curr;
          return acc as IMuscleGroupWithExercisesView;
        },
        {} as IMuscleGroupWithExercisesView
      )
  );

  if (muscleGroups[0]) {
    return muscleGroups[0];
  }
};
