import {
  createBrowserRouter,
  Routes,
  Route,
  NavLink,
  Outlet,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { Exercises } from "./components/Exercises";
import { Exercise } from "./components/Exercise";
import { MuscleGroup } from "./components/MuscleGroup";
import { MuscleGroups } from "./components/MuscleGroups";

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

const Root = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/exercise/:id" element={<Exercise />} />
        <Route path="/muscle-groups" element={<MuscleGroups />} />
        <Route path="/muscle-group/:id" element={<MuscleGroup />} />
      </Route>
    </Routes>
  );
};

export const router = createBrowserRouter([{ path: "*", Component: Root }]);
