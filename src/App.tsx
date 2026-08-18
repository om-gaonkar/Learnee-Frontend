import { Route, Routes } from "react-router";
import Auth from "./pages/Auth/Auth";
import LoginPage from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/Register";
import DashboardLayout from "./layouts/UserLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./routes/ProtectedRoutes";
import CoursesPage from "./pages/User/CoursesPage";
import Profile from "./pages/User/Profile";
import PublicRoute from "./routes/PublicRoutes";

function App() {
  return (
    <div className="  ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />

        <Route element={<PublicRoute />}>
          <Route path="/auth" element={<Auth />}>
            <Route index element={<LoginPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route path="/user" element={<DashboardLayout />}>
            <Route index element={<Profile />} />
            <Route path="courses" element={<CoursesPage />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
