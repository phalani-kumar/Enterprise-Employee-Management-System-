import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import {
  getEmployees,
} from "../../services/employeeService";

function Employees() {
  const [employees, setEmployees] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [department, setDepartment] =
    useState("All");

  const [currentPage, setCurrentPage] =
    useState(1);

  const employeesPerPage = 4;

  const [newEmployee, setNewEmployee] =
    useState({
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
      setLoading(true);

      const data =
        await getEmployees();

      setEmployees(data);

      setError("");
    } catch (error) {
      setError(
        "Failed to fetch employees"
      );
    } finally {
      setLoading(false);
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

    const employee = {
      id: employees.length + 1,

      name: newEmployee.name,

      email: newEmployee.email,

      department:
        newEmployee.department,

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

  /* DELETE */

  const deleteEmployee = (id) => {
    const filtered =
      employees.filter(
        (employee) =>
          employee.id !== id
      );

    setEmployees(filtered);

    alert(
      "Employee Deleted Successfully"
    );
  };

  /* SEARCH + FILTER */

  const filteredEmployees =
    employees.filter((employee) => {
      const matchesSearch =
        employee.name
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesDepartment =
        department === "All"
          ? true
          : employee.department ===
            department;

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

  /* LOADING */

  if (loading) {
    return (
      <DashboardLayout>
        <div className="loading-state">
          Loading Employees...
        </div>
      </DashboardLayout>
    );
  }

  /* ERROR */

  if (error) {
    return (
      <DashboardLayout>
        <div className="error-state">
          <h2>{error}</h2>

          <button
            onClick={
              fetchEmployees
            }
          >
            Retry
          </button>
        </div>
      </DashboardLayout>
    );
  }

  /* EMPTY */

  if (employees.length === 0) {
    return (
      <DashboardLayout>
        <div className="empty-state">
          No Employees Found
        </div>
      </DashboardLayout>
    );
  }

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
              Manage employee records
            </p>
          </div>
        </div>

        {/* ADD EMPLOYEE */}

        <div className="add-employee-form">
          <input
            type="text"
            placeholder="Name"
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
            placeholder="Email"
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
            value={
              newEmployee.department
            }
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

        {/* SEARCH */}

        <div className="search-filter">
          <input
            type="text"
            placeholder="Search employee..."
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
                      <span className={
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