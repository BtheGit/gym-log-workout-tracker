import { createBrowserRouter, NavLink, Outlet } from "react-router-dom";
import * as Home from "./routes";
import * as Exercises from "./routes/exercises";
import * as Exercise from "./routes/exercise/[id]";
import * as MuscleGroup from "./routes/muscle-group/[id]";
import * as MuscleGroups from "./routes/muscle-groups";

const Layout = () => {
  return (
    <>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/exercises">Exercises</NavLink>
        <NavLink to="/muscle-groups">Muscle Groups</NavLink>
      </nav>
      <hr />
      <Outlet />
    </>
  );
};

export const router = createBrowserRouter([
  { path: "/", Component: Home.component },
  {
    path: "/muscle-groups",
    Component: MuscleGroups.component,
    loader: MuscleGroups.loader,
  },
  {
    path: "/muscle-group/:id",
    Component: MuscleGroup.component,
    loader: async ({ params }) => {
      return await MuscleGroup.loader(params.id);
    },
  },
  {
    path: "/exercises",
    Component: Exercises.component,
    loader: Exercises.loader,
  },
  {
    path: "/exercise/:id",
    Component: Exercise.component,
    loader: async ({ params }) => {
      return await Exercise.loader(params.id);
    },
  },
  { path: "*", Component: Layout },
]);
