import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/UsersPage";
import SchoolsPage from "./pages/SchoolsPage";
import StudentDashboard from "./pages/StudentDashboard";
import SchedulePageStudent from "./pages/SchedulePageStudent.jsx";
import StudentPage from "./pages/StudentPage";
import ParentDashboard from "./pages/ParentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import DirectorDashboard from "./pages/DirectorDashboard.jsx";
import { useDispatch } from "react-redux";
import { loadUser } from "./features/auth/authSlice";
import { useEffect } from "react";
import SchedulePageParent from "./pages/SchedulePageParent.jsx";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      dispatch(loadUser());
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/users" element={<UsersPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["director"]} />}>
          <Route path="/director/dashboard" element={<DirectorDashboard />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["parent"]} />}>
          <Route path="/parent/dashboard" element={<ParentDashboard />} />
          <Route path="/parent/schedule" element={<SchedulePageParent />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/schedule" element={<SchedulePageStudent />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
