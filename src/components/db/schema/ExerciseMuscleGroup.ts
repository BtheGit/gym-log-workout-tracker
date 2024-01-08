export const name = "ExerciseMuscleGroup";

export const create = `  CREATE TABLE IF NOT EXISTS ExerciseMuscleGroup (
    ExerciseID INTEGER,
    MuscleGroupID INTEGER,
    FOREIGN KEY (ExerciseID) REFERENCES Exercise(id),
    FOREIGN KEY (MuscleGroupID) REFERENCES MuscleGroup(id),
    PRIMARY KEY (ExerciseID, MuscleGroupID)
);`;
