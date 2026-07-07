import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import {
  trackLogout
}
from "../services/activityService";

import { updateActivity } from "../services/loginDeviceService";

import {
  getCurrentUser,
  logoutUser,
} from "../services/authService";

const AuthContext =
  createContext();

export const AuthProvider =
  ({ children }) => {

    const [user,
      setUser] =
      useState(
        getCurrentUser()
      );

      useEffect(() => {

          const sessionId = localStorage.getItem("session_id");
      
          if (!sessionId) return;
      
          const timer = setInterval(() => {
      
              updateActivity(sessionId);
      
          },60000);
      
          return () => clearInterval(timer);
      
      },[]);

    const logout = async () => {

  const currentUser =
    JSON.parse(
      localStorage.getItem(
        "authUser"
      )
    );

  if (currentUser) {

    try {

      await trackLogout({

        user_id:
          currentUser.id,

        company_id:
          currentUser.company_id,

        user_name:
          currentUser.name

      });

    } catch (error) {

      console.log(
        "Logout tracking failed",
        error
      );

    }

  }

  logoutUser();

  localStorage.removeItem("session_id");

  setUser(null);

};

    return (

      <AuthContext.Provider
        value={{
          user,
          setUser,
          logout,
        }}
      >

        {children}

      </AuthContext.Provider>
    );
  };

export const useAuth =
  () =>
    useContext(
      AuthContext
    );