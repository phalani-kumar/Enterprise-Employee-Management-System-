import { NavLink } from "react-router-dom";

import {
  FaHome,
  FaUsers,
  FaBuilding,
  FaClipboardCheck,
  FaCog,
} from "react-icons/fa";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">EEMS</h2>

      <nav>
        <NavLink to="/dashboard" className="nav-link">
          <FaHome /> Dashboard
        </NavLink>

        <NavLink to="/employees" className="nav-link">
          <FaUsers /> Employees
        </NavLink>

        <NavLink to="/departments" className="nav-link">
          <FaBuilding /> Departments
        </NavLink>

        <NavLink to="/attendance" className="nav-link">
          <FaClipboardCheck /> Attendance
        </NavLink>

        <NavLink to="/settings" className="nav-link">
          <FaCog /> Settings
        </NavLink>
      </nav>

      <div className="sidebar-user">
        <div className="avatar">A</div>

        <div>
          <h4>Admin User</h4>
          <p>Administrator</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;