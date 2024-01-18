import type { IWorkoutData } from "./workouts";

export type IProgramWorkoutData = IWorkoutData & {
  week: number;
  day: number;
};

export type IProgramData = {
  name: string;
  description: string;
  author: string;
  workouts?: IProgramWorkoutData[];
};

export const programs = [
  {
    name: "Beginner Fat Loss",
    description:
      "This program combines basic weight training and cardio to help you get leaner!",
    author: "Count Chocula",
    workouts: [
      {
        name: "Beginner Fat Loss - Week 1",
        description: "Lose 100 pounds in your first week!",
        week: 1,
        day: 1,
        exercises: [
          {
            id: "v1__overhead_cable_triceps_extension",
            sets: [
              {
                weight: 10,
                reps: 12,
              },
              {
                weight: 15,
                reps: 12,
              },
              {
                weight: 20,
                reps: 12,
              },
            ],
          },
          {
            id: "v1__incline_dumbbell_press",
            sets: [
              {
                weight: 30,
                reps: 12,
              },
              {
                weight: 40,
                reps: 12,
              },
              {
                weight: 50,
                reps: 12,
              },
            ],
          },
          {
            id: "v1__overhead_cable_triceps_extension",
            sets: [
              {
                weight: 10,
                reps: 12,
              },
              {
                weight: 15,
                reps: 12,
              },
              {
                weight: 20,
                reps: 12,
              },
            ],
          },
        ],
      },
    ],
  },
];
