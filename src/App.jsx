import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login/Login";

import Dashboard from "./pages/Dashboard/Dashboard";

import Employees from "./pages/Employees/Employees";

import Departments from "./pages/Departments/Departments";

import Attendance from "./pages/Attendance/Attendance";

import Settings from "./pages/Settings/Settings";

import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* LOGIN */}

        <Route
          path="/"
          element={<Login />}
        />

        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>
          }
        />

        {/* EMPLOYEES */}

        <Route
          path="/employees"
          element={
            <ProtectedRoute>

              <Employees />

            </ProtectedRoute>
          }
        />

        {/* DEPARTMENTS */}

        <Route
          path="/departments"
          element={
            <ProtectedRoute>

              <Departments />

            </ProtectedRoute>
          }
        />

        {/* ATTENDANCE */}

        <Route
          path="/attendance"
          element={
            <ProtectedRoute>

              <Attendance />

            </ProtectedRoute>
          }
        />

        {/* SETTINGS */}

        <Route
          path="/settings"
          element={
            <ProtectedRoute>

              <Settings />

            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;