// import { useState, createContext } from "react";

// import Sidebar from "./Sidebar";
// import Navbar from "./Navbar";

// export const ThemeContext = createContext();

// function DashboardLayout({ children }) {
//   const [darkMode, setDarkMode] = useState(false);

//   const [showProfile, setShowProfile] = useState(false);

//   return (
//     <ThemeContext.Provider
//       value={{
//         darkMode,
//         setDarkMode,
//       }}
//     >
//       <div className={darkMode ? "layout dark-mode" : "layout"}>
//         <Sidebar />

//         <div className="main-content">
//           <Navbar
//             darkMode={darkMode}
//             setDarkMode={setDarkMode}
//             showProfile={showProfile}
//             setShowProfile={setShowProfile}
//           />

//           <div className="page-content">
//             {children}
//           </div>
//         </div>
//       </div>
//     </ThemeContext.Provider>
//   );
// }

// export default DashboardLayout;

import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Sidebar from "./Sidebar";

import Navbar from "./Navbar";

import { getCurrentSession } from "../../services/loginDeviceService";

function DashboardLayout({ children }) {

  const navigate = useNavigate();

  useEffect(() => {

    const sessionId = localStorage.getItem("session_id");

    if (!sessionId) return;

    const timer = setInterval(async () => {

      try {

        const response = await getCurrentSession(sessionId);

        const session = response.data;

        if (

          session.status === "Logged Out" ||

          session.status === "Revoked" ||

          session.status === "Expired"

        ) {

          localStorage.removeItem("authUser");

          localStorage.removeItem("session_id");

          alert("Your session has ended.");

          navigate("/login");

        }

      }

      catch (err) {

        console.log(err);

      }

    }, 5000);

    return () => clearInterval(timer);

  }, [navigate]);

  return (

    <div className="layout">

      <Sidebar />

      <div className="main-section">

        <Navbar />

        <div className="main-content">

          {children}

        </div>

      </div>

    </div>

  );

}

export default DashboardLayout;