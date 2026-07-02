// import { NavLink } from "react-router-dom";

// import {
//   FaHome,
//   FaUsers,
//   FaBuilding,
//   FaClipboardCheck,
//   FaCog,
// } from "react-icons/fa";

// function Sidebar() {
//   return (
//     <div className="sidebar">
//       <h2 className="logo">EEMS</h2>

//       <nav>
//         <NavLink to="/dashboard" className="nav-link">
//           <FaHome /> Dashboard
//         </NavLink>

//         <NavLink to="/employees" className="nav-link">
//           <FaUsers /> Employees
//         </NavLink>

//         <NavLink to="/departments" className="nav-link">
//           <FaBuilding /> Departments
//         </NavLink>

//         <NavLink to="/attendance" className="nav-link">
//           <FaClipboardCheck /> Attendance
//         </NavLink>

//         <NavLink to="/settings" className="nav-link">
//           <FaCog /> Settings
//         </NavLink>
//       </nav>

//       <div className="sidebar-user">
//         <div className="avatar">A</div>

//         <div>
//           <h4>Admin User</h4>
//           <p>Administrator</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;

import {
  NavLink,
} from "react-router-dom";

import {
  FaHome,
  FaUsers,
  FaBuilding,
  FaCalendarCheck,
  FaIndustry,
  FaUserPlus,
  FaClipboardList,
  FaExchangeAlt,
  FaHistory,
  FaFileExport,
   FaCalendarAlt,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import {
  useAuth,
} from "../../context/AuthContext";

function Sidebar() {

  const {
    user,
    logout,
  } = useAuth();

  return (

    <div className="sidebar">

      {/* LOGO */}

      <div className="sidebar-logo">

        <h2>
          EEMS
        </h2>

      </div>

      {/* MENU */}

      <div className="sidebar-menu">

        {/* DASHBOARD */}

        <NavLink
          to="/dashboard"
          className="sidebar-link"
        >

          <FaHome />

          <span>
            Dashboard
          </span>

        </NavLink>

        {/* EMPLOYEES */}

          <NavLink
             to="/employees"
             className="sidebar-link"
            >

            <FaUsers />

            <span>
              Employees
            </span>

          </NavLink>

          <NavLink
  to="/attendance"
  className="sidebar-link"
>
  <FaCalendarCheck />
  <span>Attendance</span>
</NavLink>

        {/* ADMIN ONLY PAGES */}

        {user?.role === "Admin" && (

          <>

            {/* DEPARTMENTS */}

            <NavLink
              to="/departments"
              className="sidebar-link"
            >

              <FaBuilding />

              <span>
                Departments
              </span>

            </NavLink>

            <NavLink

  to="/companies"
  className="sidebar-link"
>

 <FaIndustry />
  <span>
    Companies
  </span>

</NavLink>

 <NavLink

    to="/audit-logs"
    className="sidebar-link"
>

 <FaClipboardList />
  <span>
     Audit Logs
  </span>

</NavLink>



  <NavLink
    to="/department-transfer-history"
    className="sidebar-link"
  >
    <FaExchangeAlt />
    <span>
    Department Transfer History
    </span>
  </NavLink>

  <NavLink
    to= "/user-activity"
    className="sidebar-link"
  >
    <FaHistory />
    <span>
    User Activity
    </span>
  </NavLink>

  <NavLink
      to="/data-export-center"
      className="sidebar-link"
  >
      <FaFileExport />
      <span>
      Data Export Center
      </span>
    </NavLink>

  <NavLink 
      to="/holiday-calendar"
      className="sidebar-link"
  >

      <FaCalendarAlt />

      <span>

      Holiday Calendar

      </span>

  </NavLink>

 

<NavLink
  to="/user-invitations"
  className="sidebar-link"
>
  <FaUserPlus />
  <span>
    User Invitations
  </span>
</NavLink>


         </>

        )}

        {
      user?.role==="User" &&
      
      <NavLink 
        to="/holiday-view"
        className="sidebar-link"
      >
      
      <FaCalendarAlt/>

      <span>
      
      Holiday Calendar
      
      </span>
      
      </NavLink>
      
      }

        {/* SETTINGS FOR BOTH USER & ADMIN */}

<NavLink
  to="/settings"
  className="sidebar-link"
>
  <FaCog />
  <span>Settings</span>
</NavLink>

      </div>

      {/* USER INFO */}

      <div className="sidebar-user">

        <h4>
          {user?.name}
        </h4>

        <p>
          {user?.role}
        </p>

      </div>

      {/* LOGOUT */}

      <button
        className="logout-btn"
        onClick={logout}
      >

        <FaSignOutAlt />

        Logout

      </button>


    </div>
  );
}

export default Sidebar;