import { Outlet, Route, createRoutesFromElements } from "react-router-dom";
import Dashboard from "../Components/Dashboard";
import Home from "../Pages/HomePage";
import UserTable from "../Pages/UserTable";
const AppRouter = () => {
  return createRoutesFromElements(
    <Route element={<Dashboard />}>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Home />} />
        <Route path="/table" element={<UserTable />} />
      </Route>
    </Route>
  );
};

export default AppRouter;
