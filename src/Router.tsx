import {
  createBrowserRouter,
  Routes,
  Route,
  Link,
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
        <Link to="/">Home</Link>
        <Link to="/exercises">Exercises</Link>
        <Link to="/muscle-groups">Muscle Groups</Link>
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
        <Route path="/exercise" element={<Exercise />} />
        <Route path="/muscle-groups" element={<MuscleGroups />} />
        <Route path="/muscle-group" element={<MuscleGroup />} />
      </Route>
    </Routes>
  );
};

export const router = createBrowserRouter([{ path: "*", Component: Root }]);
