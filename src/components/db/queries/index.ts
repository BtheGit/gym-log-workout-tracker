// NOTE: This is more of a controller than a base query (maybe a custom hook?)
export const getExercises = () => `SELECT
    ExerciseID,
    ExerciseName,
    ExerciseDescription,
    ThumbnailUrl,
    VideoUrl,
    Reps,
    Weight,
    Time,
    Distance,
    json_extract(MuscleGroups, '$') AS MuscleGroups
FROM
    ExerciseWithMuscleGroups;
`;

export const getExercise = (id: string) => `SELECT
        ExerciseID,
        ExerciseName,
        ExerciseDescription,
        ThumbnailUrl,
        VideoUrl,
        Reps,
        Weight,
        Time,
        Distance,
        json_extract(MuscleGroups, '$') AS MuscleGroups
    FROM
        ExerciseWithMuscleGroups
    WHERE
        ExerciseID = '${id}'
        ;
    `;
