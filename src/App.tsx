import { Route, Routes } from "react-router";
import Auth from "./pages/Auth/Auth";
import LoginPage from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/Register";
import DashboardLayout from "./layouts/UserLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./routes/ProtectedRoutes";
import CoursesPage from "./pages/Courses/CoursesPage";

function App() {
  return (
    <div className="  ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/auth" element={<Auth />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route path="/user" element={<DashboardLayout />}>
            <Route path="courses" element={<CoursesPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
