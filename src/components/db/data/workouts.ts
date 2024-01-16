import { WorkoutValue } from "../schema/Workout";

// DECISION POINT:
// TODO: Should we change this to require at least one exercise? (Will make things easier from the data side for sure, but not the UI side)
// TODO: Have a mix of workouts with and without exercises, and workout exercises with and without sets.
// NOTE: Again, it is not a creazy or uncommon solution to require at least one child before creating either. So maybe we're too nice here.
export const workouts: WorkoutValue[] = [
  {
    name: "Dumbbell Only Workout: 5 Day Dumbbell Workout Split" /* Muscle Building */,
    description:
      "The following workout, for those who only have access to a set of dumbbells, is a 5 day per week program. It can be performed by those who work out at home in their home gym, travel frequently and need a go-to program they can do at a hotel gym, or anyone really who prefers to use dumbbells over other implements at the gym.",
  },
  {
    name: "4 Week Fat Loss Beginner Plyometric Workout Beginner Fat Loss" /* Beginner Fat Loss */,
    description:
      "This program is divided up into a 3 day program but by all means, throw some traditional weightlifting in and a little extra cardio if you really want to torch the body fat off. We will go on Monday, Wednesday and Friday. Each day, we will hit a full body workout with some of these exercises. Volume will vary slightly, but most of the time we will be going for as many reps as you can in a certain amount of time.",
  },
  {
    name: "3 Day Full Body Toning Workout" /* Body Toning */,
    description:
      "This 3 day workout is designed for people who want to tone and strengthen their muscles, without the bulk. Because of its versatile full body properties, you can incorporate this workout into an existing cardio or weight loss program. If you wish to incorporate cardio, these workouts can be completed on the same day as cardio or on separate days.",
  },
  {
    name: "Power Hypertrophy Upper Lower (P.H.U.L.) Workout" /* Muscle Building */,
    description:
      "The PHUL workout is based around the basic principles of strength and size.  This 4 day program will allow you to maximize results on both fronts in an easy adaptable routine built off the following principles: Frequency, Compounds, Power and Hypertrophy.",
  },
];
