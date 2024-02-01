import {
  WorkoutTable,
  WorkoutExerciseTable,
  WorkoutExerciseSetTable,
  WorkoutExercisesWithSetsView,
  ExerciseTable,
  MuscleGroupTable,
  ExerciseMuscleGroupTable,
  ExerciseWithMuscleGroupsView,
  MuscleGroupWithExercisesView,
  WorkoutWithExercisesView,
  ProgramWithWorkoutsView,
  ProgramTable,
  ProgramWorkoutTable,
} from "../constants";
import type { DatabaseService } from "../db";

export const createExerciseWithMuscleGroupsView = `
DROP VIEW IF EXISTS ${ExerciseWithMuscleGroupsView.name};
CREATE VIEW ${ExerciseWithMuscleGroupsView.name} AS
SELECT
    e.${ExerciseTable.cols.id} AS ${ExerciseWithMuscleGroupsView.cols.exercise_id},
    e.${ExerciseTable.cols.name} AS ${ExerciseWithMuscleGroupsView.cols.exercise_name},
    e.${ExerciseTable.cols.description} AS ${ExerciseWithMuscleGroupsView.cols.exercise_description},
    e.${ExerciseTable.cols.thumbnail_url},
    e.${ExerciseTable.cols.video_url},
    e.${ExerciseTable.cols.reps},
    e.${ExerciseTable.cols.weight},
    e.${ExerciseTable.cols.time},
    e.${ExerciseTable.cols.distance},
    JSON_GROUP_ARRAY(JSON_OBJECT(
      '${ExerciseWithMuscleGroupsView.cols.muscle_groups.cols.id}', mg.${MuscleGroupTable.cols.id}, 
      '${ExerciseWithMuscleGroupsView.cols.muscle_groups.cols.name}', mg.${MuscleGroupTable.cols.name}
    )) AS ${ExerciseWithMuscleGroupsView.cols.muscle_groups.name}
FROM
    ${ExerciseTable.name} e
JOIN
    ${ExerciseMuscleGroupTable.name} emg ON e.${ExerciseTable.cols.id} = emg.${ExerciseMuscleGroupTable.cols.exercise_id}
JOIN
    ${MuscleGroupTable.name} mg ON emg.${ExerciseMuscleGroupTable.cols.muscle_group_id} = mg.${MuscleGroupTable.cols.id}
GROUP BY
    e.${ExerciseTable.cols.id};

`;

export const createMuscleGroupWithExercisesView = `
DROP VIEW IF EXISTS ${MuscleGroupWithExercisesView.name};
CREATE VIEW ${MuscleGroupWithExercisesView.name} AS
SELECT
    mg.${MuscleGroupTable.cols.id} AS ${MuscleGroupWithExercisesView.cols.muscle_group_id},
    mg.${MuscleGroupTable.cols.name} AS ${MuscleGroupWithExercisesView.cols.muscle_group_name},
    JSON_GROUP_ARRAY(JSON_OBJECT(
      '${MuscleGroupWithExercisesView.cols.exercises.cols.exercise_id}', e.${ExerciseTable.cols.id}, 
      '${MuscleGroupWithExercisesView.cols.exercises.cols.exercise_name}', e.${ExerciseTable.cols.name}
    )) AS ${MuscleGroupWithExercisesView.cols.exercises.name}
FROM
    ${MuscleGroupTable.name} mg
JOIN
    ${ExerciseMuscleGroupTable.name} emg ON mg.${MuscleGroupTable.cols.id} = emg.${ExerciseMuscleGroupTable.cols.muscle_group_id}
JOIN
    ${ExerciseTable.name} e ON emg.${ExerciseMuscleGroupTable.cols.exercise_id} = e.${ExerciseTable.cols.id}
GROUP BY
    mg.${MuscleGroupTable.cols.id};
`;

// Based on WorkoutExercisesWithSetsView
export const createWorkoutExerciseWithSetsView = `
DROP VIEW IF EXISTS ${WorkoutExercisesWithSetsView.name};
CREATE VIEW ${WorkoutExercisesWithSetsView.name} AS
SELECT
    we.${WorkoutExerciseTable.cols.id} AS ${WorkoutExercisesWithSetsView.cols.workout_exercise_id},
    we.${WorkoutExerciseTable.cols.sort_order},
    we.${WorkoutExerciseTable.cols.workout_id},
    we.${WorkoutExerciseTable.cols.exercise_id},
    e.${ExerciseTable.cols.name} AS ${WorkoutExercisesWithSetsView.cols.exercise_name},
    JSON_GROUP_ARRAY(JSON_OBJECT(
        '${WorkoutExercisesWithSetsView.cols.sets.cols.set_id}', wes.${WorkoutExerciseSetTable.cols.id}, 
        '${WorkoutExercisesWithSetsView.cols.sets.cols.reps}', wes.${WorkoutExerciseSetTable.cols.reps}, 
        '${WorkoutExercisesWithSetsView.cols.sets.cols.weight}', wes.${WorkoutExerciseSetTable.cols.weight}, 
        '${WorkoutExercisesWithSetsView.cols.sets.cols.time}', wes.${WorkoutExerciseSetTable.cols.time}, 
        '${WorkoutExercisesWithSetsView.cols.sets.cols.distance}', wes.${WorkoutExerciseSetTable.cols.distance},
        '${WorkoutExercisesWithSetsView.cols.sets.cols.sort_order}', wes.${WorkoutExerciseSetTable.cols.sort_order}
    )) AS ${WorkoutExercisesWithSetsView.cols.sets.name}
FROM
    ${WorkoutExerciseTable.name} we
JOIN
    ${ExerciseTable.name} e ON we.${WorkoutExerciseTable.cols.exercise_id} = e.${ExerciseTable.cols.id}
JOIN
    ${WorkoutExerciseSetTable.name} wes ON we.${WorkoutExerciseTable.cols.id} = wes.${WorkoutExerciseSetTable.cols.id}
GROUP BY
    we.${WorkoutExerciseTable.cols.id}
`;

export const createWorkoutWithExercisesView = `
DROP VIEW IF EXISTS ${WorkoutWithExercisesView.name};
CREATE VIEW ${WorkoutWithExercisesView.name} AS
SELECT
    w.${WorkoutTable.cols.id} AS ${WorkoutWithExercisesView.cols.workout_id},
    w.${WorkoutTable.cols.name} AS ${WorkoutWithExercisesView.cols.workout_name},
    w.${WorkoutTable.cols.description} AS ${WorkoutWithExercisesView.cols.workout_description},
    JSON_GROUP_ARRAY(JSON_OBJECT(
      '${WorkoutWithExercisesView.cols.exercises.cols.workout_exercise_id}', vwes.${WorkoutExercisesWithSetsView.cols.workout_exercise_id},
      '${WorkoutWithExercisesView.cols.exercises.cols.exercise_id}', vwes.${WorkoutExercisesWithSetsView.cols.exercise_id},
      '${WorkoutWithExercisesView.cols.exercises.cols.exercise_name}', vwes.${WorkoutExercisesWithSetsView.cols.exercise_name},
      '${WorkoutWithExercisesView.cols.exercises.cols.sort_order}', vwes.${WorkoutExercisesWithSetsView.cols.sort_order},
      '${WorkoutWithExercisesView.cols.exercises.cols.sets}', json(vwes.${WorkoutExercisesWithSetsView.cols.sets.name}),
      '${WorkoutWithExercisesView.cols.exercises.cols.muscle_groups}', json(emg.${ExerciseWithMuscleGroupsView.cols.muscle_groups.name})
    )) AS ${WorkoutWithExercisesView.cols.exercises.name}
FROM
    ${WorkoutTable.name} w
JOIN 
    ${WorkoutExercisesWithSetsView.name} vwes ON w.${WorkoutTable.cols.id} = vwes.${WorkoutExercisesWithSetsView.cols.workout_id}
JOIN
    ${ExerciseWithMuscleGroupsView.name} emg ON vwes.${WorkoutWithExercisesView.cols.exercises.cols.exercise_id} = emg.${ExerciseWithMuscleGroupsView.cols.exercise_id}
GROUP BY
    w.${WorkoutTable.cols.id}
`;

export const createProgramWithWorkoutsView = `
DROP VIEW IF EXISTS ${ProgramWithWorkoutsView.name};
CREATE VIEW ${ProgramWithWorkoutsView.name} AS
SELECT
    p.${ProgramTable.cols.id} AS ${ProgramWithWorkoutsView.cols.program_id},
    p.${ProgramTable.cols.name} AS ${ProgramWithWorkoutsView.cols.program_name},
    p.${ProgramTable.cols.description} AS ${ProgramWithWorkoutsView.cols.program_description},
    p.${ProgramTable.cols.author} AS ${ProgramWithWorkoutsView.cols.program_author},
    JSON_GROUP_ARRAY(JSON_OBJECT(
      '${ProgramWithWorkoutsView.cols.workouts.cols.workout_id}', vwe.${WorkoutWithExercisesView.cols.workout_id},
      '${ProgramWithWorkoutsView.cols.workouts.cols.workout_name}', vwe.${WorkoutWithExercisesView.cols.workout_name},
      '${ProgramWithWorkoutsView.cols.workouts.cols.workout_description}', vwe.${WorkoutWithExercisesView.cols.workout_description},
      '${ProgramWithWorkoutsView.cols.workouts.cols.week}', pw.${ProgramWorkoutTable.cols.week},
      '${ProgramWithWorkoutsView.cols.workouts.cols.day}', pw.${ProgramWorkoutTable.cols.day},
      '${ProgramWithWorkoutsView.cols.workouts.cols.exercises}', json(vwe.${WorkoutWithExercisesView.cols.exercises.name})
    )) AS ${ProgramWithWorkoutsView.cols.workouts.name}
FROM
    ${ProgramTable.name} p
LEFT JOIN
    ${ProgramWorkoutTable.name} pw ON p.${ProgramTable.cols.id} = pw.${ProgramWorkoutTable.cols.program_id}
LEFT JOIN
    ${WorkoutWithExercisesView.name} vwe ON pw.${ProgramWorkoutTable.cols.workout_id} = vwe.${WorkoutWithExercisesView.cols.workout_id}
GROUP BY
    p.${ProgramTable.cols.id}
`;

export const createViews = async (db: DatabaseService) => {
  await db.exec({ sql: createExerciseWithMuscleGroupsView });
  await db.exec({ sql: createMuscleGroupWithExercisesView });
  await db.exec({ sql: createWorkoutExerciseWithSetsView });
  await db.exec({ sql: createWorkoutWithExercisesView });
  await db.exec({ sql: createProgramWithWorkoutsView });
};
