import { tableNames } from "../constants";
import type { DatabaseService } from "../db";

export const createExerciseWithMuscleGroupsView = `
DROP VIEW IF EXISTS ExerciseWithMuscleGroups;
CREATE VIEW ExerciseWithMuscleGroups AS
SELECT
    e.id AS ExerciseID,
    e.Name AS ExerciseName,
    e.Description AS ExerciseDescription,
    e.ThumbnailUrl,
    e.VideoUrl,
    e.Reps,
    e.Weight,
    e.Time,
    e.Distance,
    JSON_GROUP_ARRAY(JSON_OBJECT('id', mg.id, 'name', mg.name)) AS MuscleGroups
FROM
    ${tableNames.Exercise} e
JOIN
    ${tableNames.ExerciseMuscleGroup} emg ON e.id = emg.ExerciseID
JOIN
    ${tableNames.MuscleGroup} mg ON emg.MuscleGroupID = mg.id
GROUP BY
    e.id;

`;

export const createMuscleGroupWithExercisesView = `
DROP VIEW IF EXISTS MuscleGroupWithExercises;
CREATE VIEW MuscleGroupWithExercises AS
SELECT
    mg.id AS MuscleGroupID,
    mg.name AS MuscleGroupName,
    JSON_GROUP_ARRAY(JSON_OBJECT('ExerciseID', e.id, 'ExerciseName', e.Name)) AS Exercises
FROM
    ${tableNames.MuscleGroup} mg
JOIN
    ${tableNames.ExerciseMuscleGroup} emg ON mg.id = emg.MuscleGroupID
JOIN
    ${tableNames.Exercise} e ON emg.ExerciseID = e.id
GROUP BY
    mg.id;
`;

export const createViews = async (db: DatabaseService) => {
  await db.exec({ sql: createExerciseWithMuscleGroupsView });
  await db.exec({ sql: createMuscleGroupWithExercisesView });
};
