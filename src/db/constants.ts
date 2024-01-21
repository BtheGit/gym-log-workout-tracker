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
    Name: "Name",
    Description: "Description",
    ThumbnailUrl: "ThumbnailUrl",
    VideoUrl: "VideoUrl",
    Reps: "Reps",
    Weight: "Weight",
    Time: "Time",
    Distance: "Distance",
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
    ExerciseID: "ExerciseID",
    MuscleGroupID: "MuscleGroupID",
  },
};

export const ProgramTable = {
  name: `v${version}__Program`,
  cols: {
    id: "id",
    Name: "Name",
    Description: "Description",
    Author: "Author",
  },
};

export const ProgramWorkoutTable = {
  name: `v${version}__ProgramWorkout`,
  cols: {
    ProgramID: "ProgramID",
    WorkoutID: "WorkoutID",
    Week: "Week",
    Day: "Day",
  },
};

export const WorkoutTable = {
  name: `v${version}__Workout`,
  cols: {
    id: "id",
    Name: "Name",
    Description: "Description",
  },
};

export const WorkoutExerciseTable = {
  name: `v${version}__WorkoutExercise`,
  cols: {
    id: "id",
    WorkoutID: "WorkoutID",
    ExerciseID: "ExerciseID",
    SortOrder: "SortOrder",
  },
};

export const WorkoutExerciseSetTable = {
  name: `v${version}__WorkoutExerciseSet`,
  cols: {
    id: "id",
    WorkoutExerciseInstanceID: "WorkoutExerciseInstanceID",
    Reps: "Reps",
    Weight: "Weight",
    Time: "Time",
    Distance: "Distance",
    SortOrder: "SortOrder",
  },
};

export const ExerciseWithMuscleGroupsView = {
  name: `v${version}__vExerciseWithMuscleGroups`,
  cols: {
    ExerciseID: "ExerciseID",
    ExerciseName: "ExerciseName",
    ExerciseDescription: "ExerciseDescription",
    ThumbnailUrl: "ThumbnailUrl",
    VideoUrl: "VideoUrl",
    Reps: "Reps",
    Weight: "Weight",
    Time: "Time",
    Distance: "Distance",
    MuscleGroups: {
      name: "MuscleGroups",
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
    MuscleGroupID: "MuscleGroupID",
    MuscleGroupName: "MuscleGroupName",
    Exercises: {
      name: "Exercises",
      cols: {
        ExerciseID: "ExerciseID",
        ExerciseName: "ExerciseName",
      },
    },
  },
};
