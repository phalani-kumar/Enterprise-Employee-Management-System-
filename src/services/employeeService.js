// import axios from "axios";

// const API_URL =
//   "http://127.0.0.1:8000/employees";

// export const getEmployees =
//   async () => {
//     const response =
//       await axios.get(API_URL);

//     return response.data.data;
//   };

// export const getEmployeeById =
//   async (id) => {
//     const response =
//       await axios.get(
//         `${API_URL}/${id}`
//       );

//     return response.data.data;
//   };

import axios from "axios";

const API_URL =
  "http://127.0.0.1:8000";

export const getEmployees =
  async () => {
    try {

      const response =
        await axios.get(
          `${API_URL}/employees`
        );

      return response.data.data;

    } catch (error) {

      console.log(error);

      throw error;
    }
  };

export const getEmployeeById =
  async (id) => {
    try {

      const response =
        await axios.get(
          `${API_URL}/employees/${id}`
        );

      return response.data.data;

    } catch (error) {

      console.log(error);

      throw error;
    }
  };