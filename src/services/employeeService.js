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

// import axios from "axios";

// const API_URL =
//   "http://127.0.0.1:8000";

// export const getEmployees =
//   async () => {
//     try {

//       const response =
//         await axios.get(
//           `${API_URL}/employees`
//         );

//       return response.data.data;

//     } catch (error) {

//       console.log(error);

//       throw error;
//     }
//   };

// export const getEmployeeById =
//   async (id) => {
//     try {

//       const response =
//         await axios.get(
//           `${API_URL}/employees/${id}`
//         );

//       return response.data.data;

//     } catch (error) {

//       console.log(error);

//       throw error;
//     }
//   };

// import axios from "axios";

// const API_URL =
//   "http://127.0.0.1:8000";

// export const getEmployees =
//   async () => {

//     const response =
//       await axios.get(
//         `${API_URL}/employees`
//       );

//     return response.data.data;
//   };

// export const addEmployee =
//   async (employeeData) => {

//     const response =
//       await axios.post(
//         `${API_URL}/employees`,
//         employeeData
//       );

//     return response.data.data;
//   };

// import axios from "axios";

// const API_URL =
//   "https://jsonplaceholder.typicode.com/users";

// /* GET EMPLOYEES */

// export const getEmployees =
//   async () => {

//     const response =
//       await axios.get(API_URL);

//     return response.data.map(
//       (employee, index) => ({

//         id: employee.id,

//         name: employee.name,

//         email: employee.email,

//         city:
//           employee.address?.city ||
//           "Hyderabad",

//         phone:
//           employee.phone ||
//           "9876543210",

//         department:
//           index % 4 === 0
//             ? "IT"
//             : index % 4 === 1
//             ? "HR"
//             : index % 4 === 2
//             ? "Finance"
//             : "Development",

//         role:
//           index % 2 === 0
//             ? "Frontend Developer"
//             : "Backend Developer",

//         status:
//           index % 2 === 0
//             ? "Active"
//             : "Inactive",
//       })
//     );
//   };

// /* ADD EMPLOYEE */

// export const addEmployee =
//   async (employeeData) => {

//     const response =
//       await axios.post(
//         API_URL,
//         employeeData
//       );

//     return response.data;
//   };

// /* UPDATE EMPLOYEE */

// export const updateEmployee =
//   async (
//     employeeId,
//     employeeData
//   ) => {

//     const response =
//       await axios.put(
//         `${API_URL}/${employeeId}`,
//         employeeData
//       );

//     return response.data;
//   };

// /* DELETE EMPLOYEE */

// export const deleteEmployee =
//   async (employeeId) => {

//     const response =
//       await axios.delete(
//         `${API_URL}/${employeeId}`
//       );

//     return response.data;
//   };

import axios from "axios";

const API_URL =
  "http://127.0.0.1:8000";

// GET EMPLOYEES

export const getEmployees =
  async () => {

    const currentUser =
      JSON.parse(
        localStorage.getItem(
          "authUser"
        )
      );

    const response =
      await axios.get(
        `${API_URL}/employees/${currentUser.company_id}`
      );

    return response.data;
  };
    

// ADD EMPLOYEE

export const addEmployee =
  async (employeeData) => {

    const currentUser =
      JSON.parse(
        localStorage.getItem(
          "authUser"
        )
      );

    employeeData.company_id =
      currentUser.company_id;

    const response =
      await axios.post(
        `${API_URL}/employees`,
        employeeData
      );

    return response.data;
  };

// UPDATE EMPLOYEE

export const updateEmployee =
  async (
    id,
    employeeData
  ) => {

    const response =
      await axios.put(

        `${API_URL}/employees/${id}`,

        employeeData
      );

    // let employees =
    //   JSON.parse(
    //     localStorage.getItem(
    //       "employees"
    //     )
    //   ) || [];

    // employees = employees.map(
    //   (employee) =>

    //     employee.id === id

    //       ? {
    //           ...employee,
    //           ...employeeData
    //         }

    //       : employee
    // );

   
    return response.data;
  };

// DELETE EMPLOYEE

export const deleteEmployee =
  async (
    id,
    performed_by
  ) => {

    const response =
      await axios.delete(
        `${API_URL}/employees/${id}`,
        {
          data: {
            performed_by
          }
        }
      );

    return response.data;
  };

  export const updateEmployeeStatus =
async (
  employeeId,
  status
) => {

  const response =
    await axios.put(

      `${API_URL}/employees/${employeeId}/status`,

      {
        status
      }
    );

  return response.data;
};

export const transferEmployee =
(employeeId, data) =>

axios.put(

`${API_URL}/employees/${employeeId}/transfer`,

data

);

export const getDepartmentTransfers =
(companyId) =>

axios.get(

`${API_URL}/department-transfers/${companyId}`

);