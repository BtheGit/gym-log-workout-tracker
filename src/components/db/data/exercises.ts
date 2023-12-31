import { ExerciseValue } from "../schema/Exercise";

export const exercises: ExerciseValue[] = [
  {
    name: "Overhead Cable Triceps Extension",
    description:
      "The overhead cable triceps extension is a single-joint exercise that targets the triceps while increasing stability throughout the core region. The triceps are a primary muscle group involved in elbow extension and elbow extension is a primary function of the triceps. The overhead cable triceps extension is a great exercise for developing the triceps and increasing strength and stability throughout the core region.",
    reps: true,
    weight: true,
    time: false,
    distance: false,
    muscleGroups: ["Triceps"],
  },
  {
    name: "Incline Dumbbell Press",
    description: `
      Incline Dumbbell Press is a single-joint exercise that targets the dumbbell press while increasing stability throughout the core region. The dumbbell press is a primary muscle group involved in elbow extension and elbow extension is a primary function of the dumbbell press. The incline dumbbell press is a great exercise for developing the dumbbell press and increasing strength and stability throughout the core region.`,
    reps: true,
    weight: true,
    time: false,
    distance: false,
    muscleGroups: ["Chest", "Front Deltoids", "Triceps"],
  },
];
