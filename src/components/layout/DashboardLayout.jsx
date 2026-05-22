import { useState, createContext } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export const ThemeContext = createContext();

function DashboardLayout({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  const [showProfile, setShowProfile] = useState(false);

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        setDarkMode,
      }}
    >
      <div className={darkMode ? "layout dark-mode" : "layout"}>
        <Sidebar />

        <div className="main-content">
          <Navbar
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            showProfile={showProfile}
            setShowProfile={setShowProfile}
          />

          <div className="page-content">
            {children}
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default DashboardLayout;