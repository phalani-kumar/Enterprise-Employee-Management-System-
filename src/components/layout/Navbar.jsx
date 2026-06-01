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
  useAuth,
} from "../../context/AuthContext";

function Navbar() {

  const {
    user,
    logout,
  } = useAuth();

  const [darkMode,
    setDarkMode] =
    useState(false);

  const [showMenu,
    setShowMenu] =
    useState(false);

  const [notifications, setNotifications] =
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
            "notifications"
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

}, []);

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
      "notifications"
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
      notifications.length > 0 &&
      !showNotifications && (

        <span
          className="notification-count"
        >

          {notifications.length}

        </span>
      )
    }

  </button>
  {showNotifications && (

    <div
      className="notification-dropdown"
    >

      <h4>
        Notifications
      </h4>

      {
        notifications.length === 0 ? (

          <p>
            No Notifications
          </p>

        ) : (

          notifications
            .slice()
            .reverse()
            .map(
              (
                notification,
                index
              ) => (

                <div
                  key={index}
                  className="notification-item"
                >

                  {
                    notification
                  }

                </div>
              )
            )
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