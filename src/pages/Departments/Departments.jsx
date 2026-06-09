import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import { getEmployees } from "../../services/employeeService";

function Departments() {

  const [employees, setEmployees] = useState([]);

  useEffect(() => {

  fetchEmployees();

  window.addEventListener(
    "storage",
    fetchEmployees
  );

  return () => {

    window.removeEventListener(
      "storage",
      fetchEmployees
    );
  };

}, []);

  const fetchEmployees = async () => {

    try {

      const data = await getEmployees();

      setEmployees(data);

    } catch (error) {

      console.log(error);

    }
  };

  // Department Data

  const departmentData = {};

employees.forEach((employee) => {

  if (!departmentData[employee.department]) {

    departmentData[employee.department] = [];
  }

  departmentData[employee.department].push(
    employee
  );

});

  return (

    <DashboardLayout>

      <div className="department-page">

        <div className="page-header">

          <h1>
            Departments
          </h1>

          <p>
            Department employee information
          </p>

        </div>

        <div className="department-grid">

          {Object.keys(departmentData).map(
            (dept, index) => (

              <div
                key={index}
                className="department-card"
              >

                <h2>
                  {dept}
                </h2>

                <h3>

                  {
                    departmentData[dept].length
                  }

                  Employees

                </h3>

                <div className="department-users">

                  {departmentData[dept].map(
                    (employee) => (

                      <div
                        key={employee.id}
                        className="department-user"
                      >

                        <p>
                          {employee.name}
                        </p>

                        <span>
                          {employee.role}
                        </span>

                      </div>
                    )
                  )}

                </div>

              </div>
            )
          )}

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Departments;