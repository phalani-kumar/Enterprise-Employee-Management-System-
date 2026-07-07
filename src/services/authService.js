import axios from "axios";

/* API */

const API_URL =
  "https://jsonplaceholder.typicode.com/users";

const BACKEND_URL =
  "http://127.0.0.1:8000";

/* ONLY ADMIN */

const ADMIN_EMAIL =
  "admin@gmail.com";

const ADMIN_PASSWORD =
  "admin123";

/* LOGIN */

export const loginUser =
  async (loginData) => {

    /* ADMIN LOGIN */

    if (
      loginData.email === ADMIN_EMAIL &&
      loginData.password === ADMIN_PASSWORD
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
          loginData
        );
      
       console.log(
    "LOGIN RESPONSE",
    response.data
  );

  

      if (
        response.data.success
      ) {

        localStorage.setItem(
          "authUser",
          JSON.stringify(response.data.user)
        );
        
        localStorage.setItem(
          "session_id",
          response.data.session_id
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
    localStorage.removeItem("session_id");
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

export const getProfileCompletion = async () => {

    const currentUser = JSON.parse(

        localStorage.getItem("authUser")

    );

    const response = await axios.get(

        `${BACKEND_URL}/profile-completion/${currentUser.company_id}`

    );

    return response.data;

};