// import { useEffect, useState } from "react";

// import DashboardLayout from "../../components/layout/DashboardLayout";

// import {
//   getEmployees,
// } from "../../services/employeeService";

// function Employees() {
//   const [employees, setEmployees] =
//     useState([]);

//   const [loading, setLoading] =
//     useState(true);

//   const [error, setError] =
//     useState("");

//   const [searchTerm, setSearchTerm] =
//     useState("");

//   const [department, setDepartment] =
//     useState("All");

//   const [currentPage, setCurrentPage] =
//     useState(1);

//   const employeesPerPage = 4;

//   const [newEmployee, setNewEmployee] =
//     useState({
//       name: "",
//       email: "",
//       department: "",
//       role: "",
//     });

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   /* FETCH EMPLOYEES */

//   const fetchEmployees = async () => {
//     try {
//       setLoading(true);

//       const data =
//         await getEmployees();

//       setEmployees(data);

//       setError("");
//     } catch (error) {
//       setError(
//         "Failed to fetch employees"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ADD EMPLOYEE */

//   const addEmployee = () => {
//     if (
//       !newEmployee.name ||
//       !newEmployee.email ||
//       !newEmployee.department ||
//       !newEmployee.role
//     ) {
//       alert("Please fill all fields");

//       return;
//     }

//     const employee = {
//       id: employees.length + 1,

//       name: newEmployee.name,

//       email: newEmployee.email,

//       department:
//         newEmployee.department,

//       role: newEmployee.role,

//       status: "Active",
//     };

//     setEmployees([
//       ...employees,
//       employee,
//     ]);

//     setNewEmployee({
//       name: "",
//       email: "",
//       department: "",
//       role: "",
//     });

//     alert(
//       "Employee Added Successfully"
//     );
//   };

//   /* DELETE */

//   const deleteEmployee = (id) => {
//     const filtered =
//       employees.filter(
//         (employee) =>
//           employee.id !== id
//       );

//     setEmployees(filtered);

//     alert(
//       "Employee Deleted Successfully"
//     );
//   };

//   /* SEARCH + FILTER */

//   const filteredEmployees =
//     employees.filter((employee) => {
//       const matchesSearch =
//         employee.name
//           .toLowerCase()
//           .includes(
//             searchTerm.toLowerCase()
//           );

//       const matchesDepartment =
//         department === "All"
//           ? true
//           : employee.department ===
//             department;

//       return (
//         matchesSearch &&
//         matchesDepartment
//       );
//     });

//   /* PAGINATION */

//   const totalPages = Math.ceil(
//     filteredEmployees.length /
//       employeesPerPage
//   );

//   const indexOfLastEmployee =
//     currentPage * employeesPerPage;

//   const indexOfFirstEmployee =
//     indexOfLastEmployee -
//     employeesPerPage;

//   const currentEmployees =
//     filteredEmployees.slice(
//       indexOfFirstEmployee,
//       indexOfLastEmployee
//     );

//   /* LOADING */

//   if (loading) {
//     return (
//       <DashboardLayout>
//         <div className="loading-state">
//           Loading Employees...
//         </div>
//       </DashboardLayout>
//     );
//   }

//   /* ERROR */

//   if (error) {
//     return (
//       <DashboardLayout>
//         <div className="error-state">
//           <h2>{error}</h2>

//           <button
//             onClick={
//               fetchEmployees
//             }
//           >
//             Retry
//           </button>
//         </div>
//       </DashboardLayout>
//     );
//   }

//   /* EMPTY */

//   if (employees.length === 0) {
//     return (
//       <DashboardLayout>
//         <div className="empty-state">
//           No Employees Found
//         </div>
//       </DashboardLayout>
//     );
//   }

//   return (
//     <DashboardLayout>
//       <div className="employee-page">
//         {/* HEADER */}

//         <div className="employee-header">
//           <div>
//             <h1>
//               Employee Dashboard
//             </h1>

//             <p>
//               Manage employee records
//             </p>
//           </div>
//         </div>

//         {/* ADD EMPLOYEE */}

//         <div className="add-employee-form">
//           <input
//             type="text"
//             placeholder="Name"
//             value={newEmployee.name}
//             onChange={(e) =>
//               setNewEmployee({
//                 ...newEmployee,
//                 name: e.target.value,
//               })
//             }
//           />

//           <input
//             type="email"
//             placeholder="Email"
//             value={newEmployee.email}
//             onChange={(e) =>
//               setNewEmployee({
//                 ...newEmployee,
//                 email: e.target.value,
//               })
//             }
//           />

//           <input
//             type="text"
//             placeholder="Department"
//             value={
//               newEmployee.department
//             }
//             onChange={(e) =>
//               setNewEmployee({
//                 ...newEmployee,
//                 department:
//                   e.target.value,
//               })
//             }
//           />

//           <input
//             type="text"
//             placeholder="Role"
//             value={newEmployee.role}
//             onChange={(e) =>
//               setNewEmployee({
//                 ...newEmployee,
//                 role: e.target.value,
//               })
//             }
//           />

//           <button
//             onClick={addEmployee}
//           >
//             Add Employee
//           </button>
//         </div>

//         {/* SEARCH */}

//         <div className="search-filter">
//           <input
//             type="text"
//             placeholder="Search employee..."
//             value={searchTerm}
//             onChange={(e) =>
//               setSearchTerm(
//                 e.target.value
//               )
//             }
//           />

//           <select
//             value={department}
//             onChange={(e) =>
//               setDepartment(
//                 e.target.value
//               )
//             }
//           >
//             <option value="All">
//               All Departments
//             </option>

//             <option value="IT">
//               IT
//             </option>

//             <option value="HR">
//               HR
//             </option>

//             <option value="Finance">
//               Finance
//             </option>

//             <option value="Design">
//               Design
//             </option>
//           </select>
//         </div>

//         {/* TABLE */}

//         <div className="table-wrapper">
//           <table className="employee-table">
//             <thead>
//               <tr>
//                 <th>Name</th>

//                 <th>Email</th>

//                 <th>Department</th>

//                 <th>Role</th>

//                 <th>Status</th>

//                 <th>Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {currentEmployees.map(
//                 (employee) => (
//                   <tr
//                     key={employee.id}
//                   >
//                     <td>
//                       {employee.name}
//                     </td>

//                     <td>
//                       {employee.email}
//                     </td>

//                     <td>
//                       {
//                         employee.department
//                       }
//                     </td>

//                     <td>
//                       {employee.role}
//                     </td>

//                     <td>
//                       <span className={
//                         employee.status === 
//                         "Active"
//                         ? "status active"
//                         : "status inactive"
//                       }
//                         >
//                         {
//                           employee.status
//                         }
//                       </span>
//                     </td>

//                     <td>
//                       <button
//                         className="delete-btn"
//                         onClick={() =>
//                           deleteEmployee(
//                             employee.id
//                           )
//                         }
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 )
//               )}
//             </tbody>
//           </table>

//           {/* PAGINATION */}

//           <div className="pagination">
//             <button
//               disabled={
//                 currentPage === 1
//               }
//               onClick={() =>
//                 setCurrentPage(
//                   currentPage - 1
//                 )
//               }
//             >
//               Previous
//             </button>

//             {[...Array(totalPages)].map(
//               (_, index) => (
//                 <button
//                   key={index}
//                   className={
//                     currentPage ===
//                     index + 1
//                       ? "active-page"
//                       : ""
//                   }
//                   onClick={() =>
//                     setCurrentPage(
//                       index + 1
//                     )
//                   }
//                 >
//                   {index + 1}
//                 </button>
//               )
//             )}

//             <button
//               disabled={
//                 currentPage ===
//                 totalPages
//               }
//               onClick={() =>
//                 setCurrentPage(
//                   currentPage + 1
//                 )
//               }
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }

// export default Employees;

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import DashboardLayout from "../../components/layout/DashboardLayout";

function Employees() {

  const [employees,
    setEmployees] =
    useState([]);

  const [searchTerm,
    setSearchTerm] =
    useState("");

  const [department, setDepartment] = useState("All");

const [departments, setDepartments] = useState([
  "IT",
  "HR",
  "Finance",
  "Development",
]);

  const [currentPage,
    setCurrentPage] =
    useState(1);

  const employeesPerPage = 5;

  const [editId,
    setEditId] =
    useState(null);

    const [showModal,
  setShowModal] =
  useState(false);

  const [newEmployee,
    setNewEmployee] =
    useState({

      name: "",

      email: "",

      department: "",

      role: "",
    });
    const validationErrors = {

  name:
    !newEmployee.name.trim(),

  email:
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
      .test(
        newEmployee.email
      ),

  role:
    !newEmployee.role.trim(),

  department:
    !newEmployee.department,
};

const isFormValid =

  !Object.values(
    validationErrors
  ).includes(true);

  /* FETCH EMPLOYEES */

  useEffect(() => {

    fetchEmployees();

  }, []);

  const fetchEmployees =
    async () => {

      try {

        /* CHECK LOCAL STORAGE */

        const storedEmployees =
          JSON.parse(
            localStorage.getItem(
              "employees"
            )
          );

        if (
          storedEmployees &&
          storedEmployees.length > 0
        ) {

          setEmployees(
            storedEmployees
          );

          return;
        }

        /* FETCH FROM API */

        const response =
          await axios.get(
            "https://jsonplaceholder.typicode.com/users"
          );

        const updatedEmployees =
          response.data.map(
            (
              employee,
              index
            ) => ({

              id: employee.id,

              name:
                employee.name,

              email:
                employee.email,

              department:
                index % 4 === 0
                  ? "IT"
                  : index % 4 === 1
                  ? "HR"
                  : index % 4 === 2
                  ? "Finance"
                  : "Design",

              role:
                index % 2 === 0
                  ? "Frontend Developer"
                  : "Backend Developer",

              status:
                index % 3 === 0
                  ? "Inactive"
                  : "Active",
            })
          );

        setEmployees(
          updatedEmployees
        );

        localStorage.setItem(

          "employees",

          JSON.stringify(
            updatedEmployees
          )
        );

      } catch (error) {

        alert(
          "Failed to fetch employees"
        );
      }
    };

  /* INPUT CHANGE */

  const handleChange =
    (e) => {

      setNewEmployee({

        ...newEmployee,

        [e.target.name]:
          e.target.value,
      });
    };

  /* ADD EMPLOYEE */

  const addEmployee =
    () => {

      if (
        !newEmployee.name ||
        !newEmployee.email ||
        !newEmployee.department ||
        !newEmployee.role
      ) {

        alert(
          "Please fill all fields"
        );

        return;
      }

      const employee = {

        id: Date.now(),

        name:
          newEmployee.name,

        email:
          newEmployee.email,

        department:
          newEmployee.department,

        role:
          newEmployee.role,

        status: "Active",
      };

      if (
  !departments.includes(
    newEmployee.department
  )
) {
  setDepartments([
    ...departments,
    newEmployee.department,
  ]);
}

      const updatedEmployees = [

        ...employees,

        employee,
      ];

      setEmployees(
        updatedEmployees
      );

      localStorage.setItem(

        "employees",

        JSON.stringify(
          updatedEmployees
        )
      );

     alert(
  "Employee Added Successfully"
);


const notifications =
  JSON.parse(
    localStorage.getItem(
      "notifications"
    )
  ) || [];

notifications.push(
  `Employee Added: ${employee.name}`
);

localStorage.setItem(
  "notifications",
  JSON.stringify(notifications)
);

window.dispatchEvent(
  new Event("notificationUpdated")
);

window.dispatchEvent(
  new Event(
    "employeeAction"
  )
);

resetForm();

setShowModal(false);
    };
  

  /* EDIT BUTTON */

  const editEmployee =
    (employee) => {

      setEditId(
        employee.id
      );

      setShowModal(true);

      setNewEmployee({

        name:
          employee.name,

        email:
          employee.email,

        department:
          employee.department,

        role:
          employee.role,
      });

      window.scrollTo({

        top: 0,

        behavior:
          "smooth",
      });
    };

  /* UPDATE EMPLOYEE */

  const updateEmployee =
    () => {

      if (
        !newEmployee.name ||
        !newEmployee.email ||
        !newEmployee.department ||
        !newEmployee.role
      ) {

        alert(
          "Please fill all fields"
        );

        return;
      }

      const updatedEmployees =
        employees.map(
          (employee) =>

            employee.id === editId

              ? {

                  ...employee,

                  name:
                    newEmployee.name,

                  email:
                    newEmployee.email,

                  department:
                    newEmployee.department,

                  role:
                    newEmployee.role,

                  status:
                    employee.status,
                }

              : employee
        );

      setEmployees(
        updatedEmployees
      );

      localStorage.setItem(

        "employees",

        JSON.stringify(
          updatedEmployees
        )
      );

      alert(
        "Employee Updated Successfully"
      );


      const notifications =
  JSON.parse(
    localStorage.getItem(
      "notifications"
    )
  ) || [];

notifications.push(
  `Employee Updated: ${newEmployee.name}`
);

localStorage.setItem(
  "notifications",
  JSON.stringify(notifications)
);

window.dispatchEvent(
  new Event("notificationUpdated")
);

window.dispatchEvent(
  new Event(
    "employeeAction"
  )
);

      setEditId(null);

      resetForm();

      setShowModal(false);
    };

  

  /* DELETE EMPLOYEE */

  const deleteEmployee =
    (id) => {

      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete?"
        );

      if (!confirmDelete)
        return;

      const updatedEmployees =
        employees.filter(
          (employee) =>
            employee.id !== id
        );

      setEmployees(
        updatedEmployees
      );

      localStorage.setItem(

        "employees",

        JSON.stringify(
          updatedEmployees
        )
      );

      alert(
        "Employee Deleted Successfully"
      );

      const deletedEmployee =
  employees.find(
    (employee) =>
      employee.id === id
  );

const notifications =
  JSON.parse(
    localStorage.getItem(
      "notifications"
    )
  ) || [];

notifications.push(
  `Employee Deleted: ${deletedEmployee.name}`
);

localStorage.setItem(
  "notifications",
  JSON.stringify(notifications)
);

window.dispatchEvent(
  new Event("notificationUpdated")
);

window.dispatchEvent(
  new Event(
    "employeeAction"
  )
);

    };
  

  /* STATUS UPDATE */

  const updateStatus =
    (id, newStatus) => {

      if (
  !departments.includes(
    newEmployee.department
  )
) {
  setDepartments([
    ...departments,
    newEmployee.department,
  ]);
}

      const updatedEmployees =
        employees.map(
          (employee) =>

            employee.id === id

              ? {

                  ...employee,

                  status:
                    newStatus,
                }

              : employee
        );

      setEmployees(
        updatedEmployees
      );

      localStorage.setItem(

        "employees",

        JSON.stringify(
          updatedEmployees
        )
      );
    };

  /* RESET FORM */

  const resetForm =
    () => {

      setNewEmployee({

        name: "",

        email: "",

        department: "",

        role: "",
      });
    };

  /* FILTER */

  const filteredEmployees =
    employees.filter(
      (employee) => {

        const matchesSearch =
          employee.name
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            );

        const matchesDepartment =

          department === "All" ||

          employee.department ===
            department;

        return (
          matchesSearch &&
          matchesDepartment
        );
      }
    );

  /* PAGINATION */

  const indexOfLastEmployee =
    currentPage *
    employeesPerPage;

  const indexOfFirstEmployee =
    indexOfLastEmployee -
    employeesPerPage;

  const currentEmployees =
    filteredEmployees.slice(
      indexOfFirstEmployee,
      indexOfLastEmployee
    );

  const totalPages =
    Math.ceil(
      filteredEmployees.length /
      employeesPerPage
    );

  return (

    <DashboardLayout>

      <div className="employee-page">

        {/* HEADER */}

        <div className="employee-header">

          <div>

            <h1>
              Employee Dashboard
            </h1>

            <p>
              Manage employees
            </p>

          </div>

        </div>

        {/* FORM */}

          <div className="employee-actions">

  <button
    className="add-btn"
    onClick={() => {

      resetForm();

      setEditId(null);

      setShowModal(true);
    }}
  >

    Add Employee

  </button>

</div>

{
  showModal && (

    <div className="modal-overlay">

      <div className="modal-content">

        <h2>

          {editId
            ? "Edit Employee"
            : "Add Employee"}

        </h2>

        <label>
  Employee Name
  <span className="required">*</span>
</label>

<input
  type="text"
  name="name"
  value={newEmployee.name}
  onChange={handleChange}
/>

        <label>
  Email
  <span className="required">*</span>
</label>

        <input
          type="email"
          name="email"
          placeholder="Employee Email"
          value={newEmployee.email}
          onChange={handleChange}
        />

        <label>
  Department
  <span className="required">*</span>
</label>

        <input
  type="text"
  name="department"
  placeholder="Enter Department"
  value={newEmployee.department}
  onChange={handleChange}
/>

        <label>
  Role
  <span className="required">*</span>
</label>

        <input
          type="text"
          name="role"
          placeholder="Role"
          value={newEmployee.role}
          onChange={handleChange}
        />

        <div className="modal-buttons">

          {
            editId ? (

              <button
                onClick={updateEmployee}
                disabled={!isFormValid}
              >

                Update

              </button>

            ) : (

              <button
                onClick={addEmployee}
                disabled={!isFormValid}
              >

                Add Employee

              </button>

            )
          }

          <button
            className="cancel-btn"
            onClick={() =>
              setShowModal(false)
            }
          >

            Cancel

          </button>

        </div>

      </div>

    </div>
  )
}
       

        {/* SEARCH FILTER */}

        <div className="search-filter">

          <input
            type="text"
            placeholder="Search Employee..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }
          />

          <select
            value={department}
            onChange={(e) =>
              setDepartment(
                e.target.value
              )
            }
          >

            <option value="All">
              All Departments
            </option>

            {departments.map((dept) => (
  <option
    key={dept}
    value={dept}
  >
    {dept}
  </option>
))}
          </select>

        </div>

        {/* TABLE */}

        <div className="table-wrapper">

          <table className="employee-table">

            <thead>

              <tr>

                <th>Name</th>

                <th>Email</th>

                <th>Department</th>

                <th>Role</th>

                <th>Status</th>

                <th>Edit</th>

                <th>Delete</th>

              </tr>

            </thead>

            <tbody>

              {currentEmployees.map(
                (employee) => (

                  <tr
                    key={
                      employee.id
                    }
                  >

                    <td>
                      {employee.name}
                    </td>

                    <td>
                      {employee.email}
                    </td>

                    <td>
                      {
                        employee.department
                      }
                    </td>

                    <td>
                      {employee.role}
                    </td>

                    {/* STATUS */}

                    <td>

                      <select
                        className={
                          employee.status ===
                          "Active"

                            ? "status-dropdown active-status"

                            : employee.status ===
                              "Inactive"

                            ? "status-dropdown inactive-status"

                            : "status-dropdown leave-status"
                        }
                        value={
                          employee.status
                        }
                        onChange={(e) =>
                          updateStatus(
                            employee.id,
                            e.target.value
                          )
                        }
                      >

                        <option value="Active">
                          Active
                        </option>

                        <option value="Inactive">
                          Inactive
                        </option>

                        <option value="On Leave">
                          On Leave
                        </option>

                      </select>

                    </td>

                    {/* EDIT */}

                    <td>

                      <button
                        className="edit-btn"
                        onClick={() =>
                          editEmployee(
                            employee
                          )
                        }
                      >

                        Edit

                      </button>

                    </td>

                    {/* DELETE */}

                    <td>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteEmployee(
                            employee.id
                          )
                        }
                      >

                        Delete

                      </button>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

          {/* PAGINATION */}

          <div className="pagination">

            <button
              disabled={
                currentPage === 1
              }
              onClick={() =>
                setCurrentPage(
                  currentPage - 1
                )
              }
            >

              Previous

            </button>

            {[...Array(totalPages)].map(
              (_, index) => (

                <button
                  key={index}
                  className={
                    currentPage ===
                    index + 1

                      ? "active-page"

                      : ""
                  }
                  onClick={() =>
                    setCurrentPage(
                      index + 1
                    )
                  }
                >

                  {index + 1}

                </button>
              )
            )}

            <button
              disabled={
                currentPage ===
                totalPages
              }
              onClick={() =>
                setCurrentPage(
                  currentPage + 1
                )
              }
            >

              Next

            </button>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Employees;