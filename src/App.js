import React from "react";
import NavBar from "./Components/Navbar";
import StudentPage from "./pages/StudentPage";
import FacultyPage from "./pages/FacultyPage";
import { Route, Routes } from "react-router-dom";
import StudentDashboard from "./pages/StudentDashboard";

function App() {
  return (
    <div className="container p-0">
      <NavBar />
      <div className="mt-50"> {/* Adjust margin-top here */}
        <Routes>
          <Route path="/student" element={<StudentPage />} />
          <Route path="/faculty" element={<FacultyPage />} />
          <Route path="/dashboard" element={<StudentDashboard />} />

        </Routes>
      </div>
    </div>
  );
}
export default App;