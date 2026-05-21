import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

function Navbar() {
  return (
    <div className="navbar">
      <div className="menu-icon">☰</div>

      <div className="navbar-right">
        <div className="search-box">
          <input type="text" placeholder="Search here..." />
          <FaSearch />
        </div>

        <FaBell className="nav-icon" />

        <div className="profile">
          <FaUserCircle />
          <span>Admin User</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;