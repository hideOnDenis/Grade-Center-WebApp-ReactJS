import "./App.css";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import UsersPage from "./pages/UsersPage.jsx";
import SchoolsPage from "./pages/SchoolsPage.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import SchedulePage from "./pages/SchedulePage.jsx";
import StudentPage from "./pages/StudentPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/schools" element={<SchoolsPage />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/students" element={<StudentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
