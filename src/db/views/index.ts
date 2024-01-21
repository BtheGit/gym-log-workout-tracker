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
    e.${ExerciseTable.cols.id} AS ${ExerciseWithMuscleGroupsView.cols.ExerciseID},
    e.${ExerciseTable.cols.Name} AS ${ExerciseWithMuscleGroupsView.cols.ExerciseName},
    e.${ExerciseTable.cols.Description} AS ${ExerciseWithMuscleGroupsView.cols.ExerciseDescription},
    e.${ExerciseTable.cols.ThumbnailUrl},
    e.${ExerciseTable.cols.VideoUrl},
    e.${ExerciseTable.cols.Reps},
    e.${ExerciseTable.cols.Weight},
    e.${ExerciseTable.cols.Time},
    e.${ExerciseTable.cols.Distance},
    JSON_GROUP_ARRAY(JSON_OBJECT('${ExerciseWithMuscleGroupsView.cols.MuscleGroups.cols.id}', mg.${MuscleGroupTable.cols.id}, '${ExerciseWithMuscleGroupsView.cols.MuscleGroups.cols.name}', mg.${MuscleGroupTable.cols.name})) AS ${ExerciseWithMuscleGroupsView.cols.MuscleGroups.name}
FROM
    ${ExerciseTable.name} e
JOIN
    ${ExerciseMuscleGroupTable.name} emg ON e.${ExerciseTable.cols.id} = emg.${ExerciseMuscleGroupTable.cols.ExerciseID}
JOIN
    ${MuscleGroupTable.name} mg ON emg.${ExerciseMuscleGroupTable.cols.MuscleGroupID} = mg.${MuscleGroupTable.cols.id}
GROUP BY
    e.${ExerciseTable.cols.id};

`;

export const createMuscleGroupWithExercisesView = `
DROP VIEW IF EXISTS ${MuscleGroupWithExercisesView.name};
CREATE VIEW ${MuscleGroupWithExercisesView.name} AS
SELECT
    mg.${MuscleGroupTable.cols.id} AS ${MuscleGroupWithExercisesView.cols.MuscleGroupID},
    mg.${MuscleGroupTable.cols.name} AS ${MuscleGroupWithExercisesView.cols.MuscleGroupName},
    JSON_GROUP_ARRAY(JSON_OBJECT('${MuscleGroupWithExercisesView.cols.Exercises.cols.ExerciseID}', e.${ExerciseTable.cols.id}, '${MuscleGroupWithExercisesView.cols.Exercises.cols.ExerciseName}', e.${ExerciseTable.cols.Name})) AS ${MuscleGroupWithExercisesView.cols.Exercises.name}
FROM
    ${MuscleGroupTable.name} mg
JOIN
    ${ExerciseMuscleGroupTable.name} emg ON mg.${MuscleGroupTable.cols.id} = emg.${ExerciseMuscleGroupTable.cols.MuscleGroupID}
JOIN
    ${ExerciseTable.name} e ON emg.${ExerciseMuscleGroupTable.cols.ExerciseID} = e.${ExerciseTable.cols.id}
GROUP BY
    mg.${MuscleGroupTable.cols.id};
`;

export const createViews = async (db: DatabaseService) => {
  await db.exec({ sql: createExerciseWithMuscleGroupsView });
  await db.exec({ sql: createMuscleGroupWithExercisesView });
};
