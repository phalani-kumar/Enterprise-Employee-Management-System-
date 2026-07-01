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

import axios from "axios";

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

import { Link }

from "react-router-dom";

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
  useState(

    JSON.parse(
      localStorage.getItem(
        "darkMode"
      )
    ) || false

  );
  const [showMenu,
    setShowMenu] =
    useState(false);

  //   const [unreadCount, setUnreadCount] =
  // useState(0);

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


    const loadNotifications = async () => {

    try {

        const response = await axios.get(

            `http://127.0.0.1:8000/notifications/${companyId}/${user.role}`

        );

        console.log(response.data);

        setNotifications(response.data);

         const unread = response.data.filter(
            notification => !notification.read
        );

        setHasNotification(unread.length > 0);


    }

    catch (error) {

        console.log(error);

    }

};

const markAllRead = async () => {

    try {

        for (const notification of notifications) {

            if (!notification.read) {

                await axios.put(

                    `http://127.0.0.1:8000/notifications/read/${notification.id}`

                );

            }

        }

        await loadNotifications();

    }

    catch (error) {

        console.log(error);

    }

};

useEffect(() => {

    if (!companyId) return;

    loadNotifications();

    const interval = setInterval(() => {

        loadNotifications();

    }, 3000);

    return () => clearInterval(interval);

}, [companyId]);

useEffect(() => {

  if (
    user?.role !== "Admin"
  ) return;

  const loadRequests =
    async () => {

      try {

        const response =
          await axios.get(
            `http://127.0.0.1:8001/reinstatement-request/${companyId}`
          );

        const requests =
          response.data.filter(
            item =>
              item.status === "Pending"
          );

        if (
          requests.length > 0
        ) {

          const existing =
            JSON.parse(
              localStorage.getItem(
                `notifications_${companyId}`
              )
            ) || [];

          requests.forEach(
            request => {

              const text =
                `${request.user_email} requested reinstatement`;

              if (
                !existing.includes(text)
              ) {

              }

            }
          );

          localStorage.setItem(
            `notifications_${companyId}`,
            JSON.stringify(existing)
          );

          window.dispatchEvent(
            new Event(
              "notificationUpdated"
            )
          );

        }

      } catch (error) {

        console.log(error);

      }

    };

  loadRequests();

  const interval =
    setInterval(
      loadRequests,
      5000
    );

  return () =>
    clearInterval(interval);

}, [
  companyId,
  user
]);


  /* DARK MODE */

  const toggleDarkMode = () => {

  const newMode = !darkMode;

  setDarkMode(newMode);

  document.body.classList.toggle(
    "dark-mode",
    newMode
  );

  localStorage.setItem(
    "darkMode",
    JSON.stringify(newMode)
  );

  window.dispatchEvent(
    new Event("darkModeChanged")
  );

};

  useEffect(() => {

  const savedMode =
    JSON.parse(
      localStorage.getItem(
        "darkMode"
      )
    );

  if (savedMode) {

    document.body.classList.add(
      "dark-mode"
    );

  }

}, []);

useEffect(() => {

  const updateDarkMode =
    () => {

      const mode =
        JSON.parse(
          localStorage.getItem(
            "darkMode"
          )
        ) || false;

      setDarkMode(mode);

    };

  window.addEventListener(
    "darkModeChanged",
    updateDarkMode
  );

  return () => {

    window.removeEventListener(
      "darkModeChanged",
      updateDarkMode
    );

  };

}, []);

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
    onClick={async () => {

    if (!showNotifications) {

        for (const notification of notifications) {

        if (!notification.read) {

          await axios.put(
            `http://127.0.0.1:8000/notifications/read/${notification.id}`
          );

        }

      }

      loadNotifications();

      setShowNotifications(true);

    } else {

      setShowNotifications(false);

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
notifications.filter(
notification => !notification.read
).length
+
attendanceRequests.length
) > 0 &&
!showNotifications && (

<span className="notification-count">

{
notifications.filter(
notification => !notification.read
).length
+
attendanceRequests.length
}

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
          key={notification.id}
          className={
          notification.read
          
          ?
          
          "notification-item"
          
          :
          
          "notification-item unread"
          }
          >
          
          <p>
          
          {notification.message}
          
          </p>
          
          <small>
          
          {notification.created_at}
          
          </small>

          <button

          className="delete-notification"
          
          onClick={async () => {

              try {
          
                  await axios.delete(
          
                      `http://127.0.0.1:8000/notifications/${notification.id}`
          
                  );
          
                  await loadNotifications();
          
              }
          
              catch (error) {
          
                  console.log(error);
          
              }
          
          }}
          
          >
          
          Delete
          
          </button>
          
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

            <Link to="/profile">
            
            <button>
            
            Profile
            
            </button>
            
            </Link>
            
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