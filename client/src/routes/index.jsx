import RequireAuth from '@/components/RequireAuth';
import Layout from "@/layout";
import routeNames from "@/routes/routeNames.js";
import { Route, Routes } from "react-router-dom";
import TasksPage from "@/pages/TasksPage";
import CompletedPage from "@/pages/CompletedPage";
import OpenPage from "@/pages/OpenPage";
import Login from "@/pages/Login";
import SignUp from "@/pages/Signup";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path={routeNames.landing} element={<Login />} />
      <Route path={routeNames.authentication.signup} element={<SignUp />} />
      
      {/* Private */}
      <Route path={routeNames.dashboard.home} element={ <RequireAuth> <Layout /> </RequireAuth>}>
        <Route index element={<TasksPage />} />
        <Route path={routeNames.dashboard.open} element={<OpenPage />}
        />
        <Route path={routeNames.dashboard.completed} element={<CompletedPage />} />
      </Route>
    </Routes>
  );
};
export default AppRoutes;
