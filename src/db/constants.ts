export const version = "1";

export const tableNames = {
  Exercise: `v${version}__Exercise`,
  MuscleGroup: `v${version}__MuscleGroup`,
  ExerciseMuscleGroup: `v${version}__ExerciseMuscleGroup`,
  Program: `v${version}__Program`,
  Workout: `v${version}__Workout`,
  ProgramWorkout: `v${version}__ProgramWorkout`,
  WorkoutExercise: `v${version}__WorkoutExercise`,
  WorkoutExerciseSet: `v${version}__WorkoutExerciseSet`,
};

export const ExerciseTable = {
  name: `v${version}__Exercise`,
  cols: {
    id: "id",
    name: "name",
    description: "description",
    thumbnail_url: "thumbnail_url",
    video_url: "video_url",
    reps: "reps",
    weight: "weight",
    time: "time",
    distance: "distance",
  },
};

export const MuscleGroupTable = {
  name: `v${version}__MuscleGroup`,
  cols: {
    id: "id",
    name: "name",
  },
};

export const ExerciseMuscleGroupTable = {
  name: `v${version}__ExerciseMuscleGroup`,
  cols: {
    exercise_id: "exercise_id",
    muscle_group_id: "muscle_group_id",
  },
};

export const ProgramTable = {
  name: `v${version}__Program`,
  cols: {
    id: "id",
    name: "name",
    description: "description",
    author: "author",
  },
};

export const ProgramWorkoutTable = {
  name: `v${version}__ProgramWorkout`,
  cols: {
    program_id: "program_id",
    workout_id: "workout_id",
    week: "week",
    day: "day",
  },
};

export const WorkoutTable = {
  name: `v${version}__Workout`,
  cols: {
    id: "id",
    name: "name",
    description: "description",
  },
};

export const WorkoutExerciseTable = {
  name: `v${version}__WorkoutExercise`,
  cols: {
    id: "id",
    workout_id: "workout_id",
    exercise_id: "exercise_id",
    sort_order: "sort_order",
  },
};

export const WorkoutExerciseSetTable = {
  name: `v${version}__WorkoutExerciseSet`,
  cols: {
    id: "id",
    workout_exercise_instance_id: "workout_exercise_instance_id",
    reps: "reps",
    weight: "weight",
    time: "time",
    distance: "distance",
    sort_order: "sort_order",
  },
};

export const ExerciseWithMuscleGroupsView = {
  name: `v${version}__vExerciseWithMuscleGroups`,
  cols: {
    exercise_id: "exercise_id",
    exercise_name: "exercise_name",
    exercise_description: "exercise_description",
    thumbnail_url: "thumbnail_url",
    video_url: "video_url",
    reps: "reps",
    weight: "weight",
    time: "time",
    distance: "distance",
    muscle_groups: {
      name: "muscle_groups",
      cols: {
        id: "id",
        name: "name",
      },
    },
  },
};

export const MuscleGroupWithExercisesView = {
  name: `v${version}__vMuscleGroupWithExercises`,
  cols: {
    muscle_group_id: "muscle_group_id",
    muscle_group_name: "muscle_group_name",
    exercises: {
      name: "exercises",
      cols: {
        exercise_id: "exercise_id",
        exercise_name: "exercise_name",
      },
    },
  },
};

export const WorkoutExercisesWithSetsView = {
  name: `v${version}__vWorkoutExercisesWithSets`,
  cols: {
    workout_exercise_id: "workout_exercise_id",
    sort_order: "sort_order",
    workout_id: "workout_id",
    exercise_id: "exercise_id",
    exercise_name: "exercise_name",
    sets: {
      name: "sets",
      cols: {
        set_id: "set_id",
        reps: "reps",
        weight: "weight",
        time: "time",
        distance: "distance",
        sort_order: "sort_order",
      },
    },
  },
};

export const WorkoutWithExercisesView = {
  name: `v${version}__vWorkoutWithWorkoutExercises`,
  cols: {
    workout_id: "workout_id",
    workout_name: "workout_name",
    workout_description: "workout_description",
    exercises: {
      name: "exercises",
      cols: {
        workout_exercise_id: "workout_exercise_id",
        exercise_id: "exercise_id",
        exercise_name: "exercise_name",
        sort_order: "sort_order",
        muscle_groups: {
          name: "muscle_groups",
          cols: {
            id: "id",
            name: "name",
          },
        },
        sets: {
          name: "sets",
          cols: {
            set_id: "set_id",
            reps: "reps",
            weight: "weight",
            time: "time",
            distance: "distance",
            sort_order: "sort_order",
          },
        },
      },
    },
  },
};

