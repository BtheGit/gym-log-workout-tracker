import { tableNames } from "../constants";

export const create = `CREATE TABLE IF NOT EXISTS ${tableNames.WorkoutExercise}(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    WorkoutID INTEGER NOT NULL,
    ExerciseID TEXT NOT NULL,
    SortOrder INTEGER NOT NULL,
    FOREIGN KEY (WorkoutID) REFERENCES ${tableNames.Workout}(id),
    FOREIGN KEY (ExerciseID) REFERENCES ${tableNames.Exercise}(id)
);`;

// TODO: Validate that exercise exists
export const insertReturningInstanceId = (
  workoutId: number,
  exerciseId: string,
  sortOrder: number
) => `
    INSERT INTO ${tableNames.WorkoutExercise}(WorkoutID, ExerciseID, SortOrder) VALUES(${workoutId}, '${exerciseId}', ${sortOrder}) RETURNING id;
`;
