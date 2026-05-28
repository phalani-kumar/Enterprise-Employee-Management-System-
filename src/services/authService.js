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

    /* USERS LOGIN */

    const response =
      await axios.get(API_URL);

    const users =
      response.data;

    const matchedUser =
      users.find(
        (user) =>
          user.email.toLowerCase() ===
          email.toLowerCase()
      );

    /* INVALID */

    if (
      !matchedUser ||
      password.length < 3
    ) {

      throw new Error(
        "Invalid Email or Password"
      );
    }

    /* NORMAL USER */

    const normalUser = {

      id: matchedUser.id,

      name:
        matchedUser.name,

      email:
        matchedUser.email,

      role: "User",
    };

    localStorage.setItem(
      "authUser",
      JSON.stringify(
        normalUser
      )
    );

    return normalUser;
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