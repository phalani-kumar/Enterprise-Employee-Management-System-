import axios from "axios";

/* API */

const API_URL =
  "https://jsonplaceholder.typicode.com/users";

/* ONLY ADMIN */

const ADMIN_EMAIL =
  "admin@gmail.com";

const ADMIN_PASSWORD =
  "admin123";

/* LOGIN */

export const loginUser =
  async (
    email,
    password
  ) => {

    /* ADMIN LOGIN */

    if (
      email === ADMIN_EMAIL &&
      password === ADMIN_PASSWORD
    ) {

      const adminUser = {

        id: 1,

        name: "Admin",

        email:
          ADMIN_EMAIL,

        role: "Admin",
      };

      localStorage.setItem(
        "authUser",
        JSON.stringify(
          adminUser
        )
      );

      return adminUser;
    }

    try {

      const response =
        await axios.post(
          "http://127.0.0.1:8000/login",
          {
            email,
            password
          }
        );

      if (
        response.data.success
      ) {

        localStorage.setItem(
          "authUser",
          JSON.stringify(
            response.data.user
          )
        );

        return response.data.user;
      }

      throw new Error(
        response.data.message
      );

    } catch (error) {

      throw new Error(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };


/* LOGOUT */

export const logoutUser =
  () => {

    localStorage.removeItem(
      "authUser"
    );
  };

/* CURRENT USER */

export const getCurrentUser =
  () => {

    return JSON.parse(
      localStorage.getItem(
        "authUser"
      )
    );
  };