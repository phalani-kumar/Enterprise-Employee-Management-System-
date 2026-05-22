// import DashboardLayout from "../../components/layout/DashboardLayout";

// function Employees() {
//   return (
//     <DashboardLayout>
//       <h1>Employees Page</h1>
//     </DashboardLayout>
//   );
// }

// export default Employees;


import { useEffect, useState } from "react";
import axios from "axios";

import DashboardLayout from "../../components/layout/DashboardLayout";

function Employees() {
  const [employees, setEmployees] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [department, setDepartment] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  const employeesPerPage = 4;

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    department: "",
    role: "",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  /* FETCH EMPLOYEES */

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );

      const updatedEmployees =
        response.data.map(
          (employee, index) => ({
            id: employee.id,

            name: employee.name,

            email: employee.email,

            role:
              index % 2 === 0
                ? "Frontend Developer"
                : "Backend Developer",

            department:
              index % 4 === 0
                ? "IT"
                : index % 4 === 1
                ? "HR"
                : index % 4 === 2
                ? "Finance"
                : "Design",

            status:
              index % 2 === 0
                ? "Active"
                : "Inactive",
          })
        );

      setEmployees(updatedEmployees);
    } catch (error) {
      console.log(error);
    }
  };

  /* ADD EMPLOYEE */

  const addEmployee = () => {
    if (
      !newEmployee.name ||
      !newEmployee.email ||
      !newEmployee.department ||
      !newEmployee.role
    ) {
      alert("Please fill all fields");

      return;
    }

    /* FORMAT DEPARTMENT */

    const formattedDepartment =
      newEmployee.department
        .trim()
        .toLowerCase() === "it"
        ? "IT"
        : newEmployee.department
            .trim()
            .toLowerCase() === "hr"
        ? "HR"
        : newEmployee.department
            .trim()
            .toLowerCase() ===
          "finance"
        ? "Finance"
        : newEmployee.department
            .trim()
            .toLowerCase() ===
          "design"
        ? "Design"
        : newEmployee.department;

    const employee = {
      id: employees.length + 1,

      name: newEmployee.name,

      email: newEmployee.email,

      department:
        formattedDepartment,

      role: newEmployee.role,

      status: "Active",
    };

    setEmployees([
      ...employees,
      employee,
    ]);

    setNewEmployee({
      name: "",
      email: "",
      department: "",
      role: "",
    });

    alert(
      "Employee Added Successfully"
    );
  };

  /* DELETE EMPLOYEE */

  const deleteEmployee = (id) => {
    const filtered = employees.filter(
      (employee) =>
        employee.id !== id
    );

    setEmployees(filtered);
  };

  /* SEARCH + FILTER */

  const filteredEmployees =
    employees.filter((employee) => {
      const matchesSearch =
        employee.name
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        employee.email
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesDepartment =
        department === "All"
          ? true
          : employee.department
              .trim()
              .toLowerCase() ===
            department
              .trim()
              .toLowerCase();

      return (
        matchesSearch &&
        matchesDepartment
      );
    });

  /* PAGINATION */

  const totalPages = Math.ceil(
    filteredEmployees.length /
      employeesPerPage
  );

  const indexOfLastEmployee =
    currentPage * employeesPerPage;

  const indexOfFirstEmployee =
    indexOfLastEmployee -
    employeesPerPage;

  const currentEmployees =
    filteredEmployees.slice(
      indexOfFirstEmployee,
      indexOfLastEmployee
    );

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <DashboardLayout>
      <div className="employee-page">
        {/* HEADER */}

        <div className="employee-header">
          <div>
            <h1>Employee Dashboard</h1>

            <p>
              Manage employee records
              and departments
            </p>
          </div>
        </div>

        {/* ADD EMPLOYEE */}

        <div className="add-employee-form">
          <input
            type="text"
            placeholder="Employee Name"
            value={newEmployee.name}
            onChange={(e) =>
              setNewEmployee({
                ...newEmployee,
                name: e.target.value,
              })
            }
          />

          <input
            type="email"
            placeholder="Employee Email"
            value={newEmployee.email}
            onChange={(e) =>
              setNewEmployee({
                ...newEmployee,
                email: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Department"
            value={newEmployee.department}
            onChange={(e) =>
              setNewEmployee({
                ...newEmployee,
                department:
                  e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Role"
            value={newEmployee.role}
            onChange={(e) =>
              setNewEmployee({
                ...newEmployee,
                role: e.target.value,
              })
            }
          />

          <button
            onClick={addEmployee}
          >
            Add Employee
          </button>
        </div>

        {/* SEARCH + FILTER */}

        <div className="search-filter">
          <input
            type="text"
            placeholder="Search employee..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(
                e.target.value
              );

              setCurrentPage(1);
            }}
          />

          <select
            value={department}
            onChange={(e) => {
              setDepartment(
                e.target.value
              );

              setCurrentPage(1);
            }}
          >
            <option value="All">
              All Departments
            </option>

            <option value="IT">
              IT
            </option>

            <option value="HR">
              HR
            </option>

            <option value="Finance">
              Finance
            </option>

            <option value="Design">
              Design
            </option>
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

                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {currentEmployees.map(
                (employee) => (
                  <tr
                    key={employee.id}
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

                    <td>
                      <span
                        className={
                          employee.status ===
                          "Active"
                            ? "status active"
                            : "status inactive"
                        }
                      >
                        {
                          employee.status
                        }
                      </span>
                    </td>

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
              onClick={
                handlePrevious
              }
              disabled={
                currentPage === 1
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
              onClick={handleNext}
              disabled={
                currentPage ===
                totalPages
              }
            >
              Next
            </button>
          </div>
        </div>

        {/* PLACEHOLDER SECTIONS */}

        <div className="placeholder-grid">
          <div className="placeholder-card">
            <h3>
              Employee Details
            </h3>

            <p>
              Employee profile
              management section
            </p>
          </div>

          <div className="placeholder-card">
            <h3>
              Department Section
            </h3>

            <p>
              Department analytics
              and employee
              assignment
            </p>
          </div>

          <div className="placeholder-card">
            <h3>
              Attendance Section
            </h3>

            <p>
              Attendance tracking
              and reports
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Employees;