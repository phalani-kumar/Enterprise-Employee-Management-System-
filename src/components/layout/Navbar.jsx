// import { FaBell, FaMoon, FaSun, FaUserCircle } from "react-icons/fa";

// function Navbar({
//   darkMode,
//   setDarkMode,
//   showProfile,
//   setShowProfile,
// }) {
//   return (
//     <div className="navbar">
//       <div>
//         <h2>Enterprise EMS</h2>
//       </div>

//       <div className="navbar-right">
//         <div className="search-box">
//           <input type="text" placeholder="Search..." />
//         </div>

//         <div
//           className="theme-toggle"
//           onClick={() => setDarkMode(!darkMode)}
//         >
//           {darkMode ? <FaSun /> : <FaMoon />}
//         </div>

//         <FaBell className="nav-icon" />

//         <div
//           className="profile"
//           onClick={() => setShowProfile(!showProfile)}
//         >
//           <FaUserCircle />

//           <span>Admin</span>

//           {showProfile && (
//            <div className="profile-dropdown">
//   <p
//     onClick={() =>
//       alert("Profile Page")
//     }
//   >
//     My Profile
//   </p>

//   <p
//     onClick={() =>
//       alert("Settings Page")
//     }
//   >
//     Settings
//   </p>

//   <p
//     onClick={() => {
//       localStorage.removeItem(
//         "token"
//       );

//       window.location.href =
//         "/";
//     }}
//   >
//     Sign Out
//   </p>
// </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;

import {
  useState,
  useEffect,
} from "react";

import {
  FaMoon,
  FaSun,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";

import {

getAttendanceRequests,

approveAttendanceAccess,

rejectAttendanceAccess

}

from "../../services/attendanceService";

import {
  useAuth,
} from "../../context/AuthContext";

function Navbar() {

  const {
    user,
    logout,
  } = useAuth();

  const companyName =
  user?.company_name || "";

  const companyId =
  user?.company_id || "";

  const [darkMode,
    setDarkMode] =
    useState(false);

  const [showMenu,
    setShowMenu] =
    useState(false);

    const [unreadCount, setUnreadCount] =
  useState(0);

  const [notifications, setNotifications] =
  useState([]);

  const [

attendanceRequests,

setAttendanceRequests

] = useState([]);

const [leaveRequests, setLeaveRequests] =
  useState([]);


const [showNotifications,
  setShowNotifications] =
  useState(false);  

    const [hasNotification,
  setHasNotification] =
  useState(false);

  useEffect(() => {

  const handleNotification =
    () => {

      setHasNotification(
        true
      );
    };

  window.addEventListener(
    "employeeAction",
    handleNotification
  );

  return () => {

    window.removeEventListener(
      "employeeAction",
      handleNotification
    );
  };

}, []);



   useEffect(() => {

  const loadNotifications =
    () => {

      const storedNotifications =
        JSON.parse(
          localStorage.getItem(
            `notifications_${companyId}`

          )
        ) || [];

      setNotifications(
        storedNotifications
      );
    };

  loadNotifications();

  window.addEventListener(
    "notificationUpdated",
    loadNotifications
  );

  return () => {

    window.removeEventListener(
      "notificationUpdated",
      loadNotifications
    );
  };

}, [companyId]);

useEffect(() => {

  if (
    user?.role !== "Admin"
  ) return;

  const loadRequests =
    async () => {

      try {

        const response =
          await getAttendanceRequests(
            companyId
          );

        setAttendanceRequests(
          response.data
        );

      } catch (error) {

        console.log(error);

      }
    };

  loadRequests();

}, [companyId, user]);


  /* DARK MODE */

  const toggleDarkMode =
    () => {

      setDarkMode(
        !darkMode
      );

      document.body.classList.toggle(
        "dark-mode"
      );
    };

  return (

    <div className="navbar">

      {/* LEFT */}

      <div className="navbar-left">

        <h2>
          Employee Enterprise Management System
        </h2>
      </div>
      
      <div className="navbar-left">

        <h3>
          {companyName}
        </h3>
      </div>
      

      {/* RIGHT */}

      <div className="navbar-right">

        {/* DARK MODE */}

        <button
          className="nav-icon-btn"
          onClick={
            toggleDarkMode
          }
        >

          {darkMode ? (
            <FaSun />
          ) : (
            <FaMoon />
          )}

        </button>

        {/* NOTIFICATION */}

        <div
  className="notification-wrapper"
>

  <button
    className="nav-icon-btn"
    onClick={() => {

  if (!showNotifications) {

    /* FIRST CLICK */

    setShowNotifications(true);

    setHasNotification(false);

    localStorage.setItem(
      "unreadNotifications",
      "0"
    );

    setUnreadCount(0);

  } else {

    /* SECOND CLICK */

    setShowNotifications(false);

    localStorage.removeItem(
      `notifications_${companyId}`
    );

    setNotifications([]);
  }
}}
  >

    <FaBell
      className={
        hasNotification
          ? "bell-active"
          : ""
      }
    />

    {
  (
    notifications.length +
    attendanceRequests.length 
  ) > 0 &&
  !showNotifications && (

        <span
          className="notification-count"
        >

          {notifications.length+
          attendanceRequests.length}

        </span>
      )
    }

  </button>
  {showNotifications && (

  <div className="notification-dropdown">

    <h4>
      Notifications
    </h4>

    {/* Attendance Access Requests */}

    {
      attendanceRequests.map(
        (request) => (

          <div
            key={request.id}
            className="notification-item"
          >

            <p>

              <strong>
                {request.user_name}
              </strong>

            </p>

            <p>
              {request.user_email}
            </p>

            <p>
              Requested:
              {" "}
              {request.timestamp}
            </p>

            <div
              className="notification-actions"
            >

              <button

                onClick={async () => {

                  await approveAttendanceAccess(
                    request.id
                  );

                  setAttendanceRequests(
                    attendanceRequests.filter(
                      (item) =>
                        item.id !==
                        request.id
                    )
                  );
                }}
              >

                Approve

              </button>

              <button

                onClick={async () => {

                  await rejectAttendanceAccess(
                    request.id
                  );

                  setAttendanceRequests(
                    attendanceRequests.filter(
                      (item) =>
                        item.id !==
                        request.id
                    )
                  );
                }}
              >

                Reject

              </button>

            </div>

          </div>
        )
      )
    }


    {
leaveRequests.map(
  (request) => (

    <div
      key={request.id}
      className="notification-item"
    >

      <strong>

        Leave Request

      </strong>

      <p>

        {request.user_name}

      </p>

      <p>

        {request.leave_type}

      </p>

      <p>

        {request.from_date}

        {" - "}

        {request.to_date}

      </p>

      <button

        onClick={async () => {

          await approveLeave(
            request.id
          );

          window.location.reload();
        }}

      >
        Approve
      </button>

      <button

        onClick={async () => {

          await rejectLeave(
            request.id
          );

          window.location.reload();
        }}

      >
        Reject
      </button>

    </div>

  )
)
}

    {/* Existing Notifications */}

    {
      notifications.map(
        (
          notification,
          index
        ) => (

          <div
            key={index}
            className="notification-item"
          >

            {notification}

          </div>
        )
      )
    }

    {
      attendanceRequests.length === 0 &&
      notifications.length === 0 && (

        <p>
          No Notifications
        </p>
      )
    }

  </div>
)}

</div>

        {/* PROFILE */}

        <div className="profile-box">

          <button
            className="profile-btn"
            onClick={() =>
              setShowMenu(
                !showMenu
              )
            }
          >

            <FaUserCircle />

            <span>
              {user?.name}
            </span>

          </button>

          {showMenu && (

            <div className="profile-menu">

              <button
                onClick={logout}
              >
                Logout
              </button>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default Navbar;