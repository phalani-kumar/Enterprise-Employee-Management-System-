import { FaBell, FaMoon, FaSun, FaUserCircle } from "react-icons/fa";

function Navbar({
  darkMode,
  setDarkMode,
  showProfile,
  setShowProfile,
}) {
  return (
    <div className="navbar">
      <div>
        <h2>Enterprise EMS</h2>
      </div>

      <div className="navbar-right">
        <div className="search-box">
          <input type="text" placeholder="Search..." />
        </div>

        <div
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </div>

        <FaBell className="nav-icon" />

        <div
          className="profile"
          onClick={() => setShowProfile(!showProfile)}
        >
          <FaUserCircle />

          <span>Admin</span>

          {showProfile && (
           <div className="profile-dropdown">
  <p
    onClick={() =>
      alert("Profile Page")
    }
  >
    My Profile
  </p>

  <p
    onClick={() =>
      alert("Settings Page")
    }
  >
    Settings
  </p>

  <p
    onClick={() => {
      localStorage.removeItem(
        "token"
      );

      window.location.href =
        "/";
    }}
  >
    Sign Out
  </p>
</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;