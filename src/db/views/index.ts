import {
  ExerciseTable,
  MuscleGroupTable,
  ExerciseMuscleGroupTable,
  ExerciseWithMuscleGroupsView,
  MuscleGroupWithExercisesView,
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
    JSON_GROUP_ARRAY(JSON_OBJECT('${ExerciseWithMuscleGroupsView.cols.muscle_groups.cols.id}', mg.${MuscleGroupTable.cols.id}, '${ExerciseWithMuscleGroupsView.cols.muscle_groups.cols.name}', mg.${MuscleGroupTable.cols.name})) AS ${ExerciseWithMuscleGroupsView.cols.muscle_groups.name}
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
    JSON_GROUP_ARRAY(JSON_OBJECT('${MuscleGroupWithExercisesView.cols.exercises.cols.exercise_id}', e.${ExerciseTable.cols.id}, '${MuscleGroupWithExercisesView.cols.exercises.cols.exercise_name}', e.${ExerciseTable.cols.name})) AS ${MuscleGroupWithExercisesView.cols.exercises.name}
FROM
    ${MuscleGroupTable.name} mg
JOIN
    ${ExerciseMuscleGroupTable.name} emg ON mg.${MuscleGroupTable.cols.id} = emg.${ExerciseMuscleGroupTable.cols.muscle_group_id}
JOIN
    ${ExerciseTable.name} e ON emg.${ExerciseMuscleGroupTable.cols.exercise_id} = e.${ExerciseTable.cols.id}
GROUP BY
    mg.${MuscleGroupTable.cols.id};
`;

export const createViews = async (db: DatabaseService) => {
  await db.exec({ sql: createExerciseWithMuscleGroupsView });
  await db.exec({ sql: createMuscleGroupWithExercisesView });
};
