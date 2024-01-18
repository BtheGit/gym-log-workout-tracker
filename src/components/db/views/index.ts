import { tableNames } from "../constants";
import type { DatabaseService } from "../db";
import { promiser } from "../promiser";

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

export const createViews = async (db: DatabaseService) => {
  await db.exec({ sql: createExerciseWithMuscleGroupsView });
};
