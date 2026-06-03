import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { Navigate } from "react-router-dom";

import Login from "./pages/Login/Login";

import Signup from "./pages/Signup/Signup";

import Dashboard from "./pages/Dashboard/Dashboard";

import Employees from "./pages/Employees/Employees";

import Departments from "./pages/Departments/Departments";

import Attendance from "./pages/Attendance/Attendance";

import Settings from "./pages/Settings/Settings";

import RoleRequests from "./pages/admin/RoleRequests";

import ProtectedRoute from "./components/auth/ProtectedRoute";

import ForgotPassword from
"./pages/ForgotPassword/ForgotPassword";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
           <Navigate
             to="/login"
            replace
            />
            }
        />

        <Route
  path="/forgot-password"
  element={
    <ForgotPassword />
  }
/> 
        {/* LOGIN */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
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

        <Route
  path="/role-requests"
  element={
    <RoleRequests />
  }
/>


      </Routes>

    </BrowserRouter>
  );
}

export default App;