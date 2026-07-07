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

import LoginDevices from "./pages/user/LoginDevices";

import DeviceMonitoring from "./pages/admin/DeviceMonitoring";

import Companies from
"./pages/Companies/Companies";

import AuditLogs from
"./pages/AuditLogs/AuditLogs";

import Settings from "./pages/Settings/Settings";

import RoleRequests from "./pages/admin/RoleRequests";

import UserInvitations from "./pages/UserInvitations/UserInvitations";

import ReactivationRequests from "./pages/ReactivationRequests/ReactivationRequests";

import AccountDeactivated from "./pages/AccountDeactivated";

import ProtectedRoute from "./components/auth/ProtectedRoute";

import AttendanceRequests
from "./pages/AttendanceRequests/AttendanceRequests";

import ForgotPassword from
"./pages/ForgotPassword/ForgotPassword";

import DepartmentTransferHistory
from "./pages/admin/DepartmentTransferHistory";

import UserActivity
from "./pages/admin/UserActivity";

import DataExportCenter from "./pages/admin/DataExportCenter";

import AccountSuspended
from "./pages/suspended/AccountSuspended";

import HolidayCalendar from "./pages/holiday/HolidayCalendar";

import HolidayView from "./pages/holiday/HolidayView";

import Profile from "./pages/Profile";

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

        <Route

          path="/login-devices"

          element={
          <ProtectedRoute>
              <LoginDevices />
          </ProtectedRoute>  
              }

        />

        <Route

    path="/device-monitoring"

    element={

        <ProtectedRoute>

            <DeviceMonitoring />

        </ProtectedRoute>

    }

/>

        <Route

  path="/companies"

  element={

    <ProtectedRoute>

      <Companies />

    </ProtectedRoute>
  }
/>

<Route

  path="/audit-logs"

  element={

<ProtectedRoute>

  <AuditLogs />
  
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

<Route
  path="/user-invitations"
  element={
    <ProtectedRoute>
      <UserInvitations />
    </ProtectedRoute>
  }
/>

<Route
  path="/account-deactivated"
  element={
    <AccountDeactivated />
  }
/>

<Route
  path="/attendance-requests"
  element={
    <ProtectedRoute>
      <AttendanceRequests />
    </ProtectedRoute>
  }
/>

<Route
  path="/department-transfer-history"
  element={
    <ProtectedRoute>
      <DepartmentTransferHistory />
    </ProtectedRoute>
  }
/>

<Route
  path="/user-activity"
  element={
    <ProtectedRoute>
      <UserActivity />
    </ProtectedRoute>
  }
/>

<Route
  path="/data-export-center"
  element={
    <ProtectedRoute>
      <DataExportCenter />
    </ProtectedRoute>
  }
/>

<Route
  path="/account-suspended"
  element={
    <ProtectedRoute>
    <AccountSuspended />
    </ProtectedRoute>
  }
/>

<Route

path="/holiday-calendar"

element={
  <ProtectedRoute>
    <HolidayCalendar/>
    </ProtectedRoute>
  }

/>

<Route

path="/holiday-view"

element={
  <ProtectedRoute>
    <HolidayView/>
    </ProtectedRoute>
  }

/>

<Route

path="/profile"

element={
  <ProtectedRoute>
  <Profile/>
  </ProtectedRoute>
}

/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;