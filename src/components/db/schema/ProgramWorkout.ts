import { tableNames } from "../constants";

export const create = `CREATE TABLE IF NOT EXISTS ${tableNames.ProgramWorkout}(
    ProgramID INTEGER NOT NULL,
    WorkoutID INTEGER NOT NULL,
    Week INTEGER NOT NULL,
    Day INTEGER NOT NULL,
    FOREIGN KEY (ProgramID) REFERENCES ${tableNames.Program}(id),
    FOREIGN KEY (WorkoutID) REFERENCES ${tableNames.Workout}(id),
    PRIMARY KEY (ProgramID, WorkoutID)
)`;

export const insert = (programId, workoutId, week, day) => `
    INSERT INTO ${tableNames.ProgramWorkout}(ProgramID, WorkoutID, Week, Day) VALUES(
        ${programId},
        ${workoutId},
        ${week},
        ${day}
    );
`;
