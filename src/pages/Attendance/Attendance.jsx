import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import { getEmployees } from "../../services/employeeService";

function Attendance() {

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

const currentUser =
  JSON.parse(
    localStorage.getItem(
      "authUser"
    )
  );

  const downloadCSV = () => {

  const headers =
    [
      "ID",
      "Name",
      "Department",
      "Status",
      "Attendance"
    ];

  const rows =
    employees.map(
      (employee) => [

        employee.id,

        employee.name,

        employee.department,

        employee.status,

        employee.attendance
      ]
    );

  const csvContent =

    [headers, ...rows]

      .map(
        (row) =>
          row.join(",")
      )

      .join("\n");

  const blob =
    new Blob(

      [csvContent],

      {
        type:
          "text/csv",
      }
    );

  const url =
    URL.createObjectURL(
      blob
    );

  const link =
    document.createElement(
      "a"
    );

  link.href = url;

  link.download =
    "attendance-report.csv";

  link.click();
};

  const fetchEmployees = async () => {

    try {

      const data = await getEmployees();

      setEmployees(data);

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <DashboardLayout>

  
        <div className="attendance-header">

  <div>

    <h1>
      Attendance
    </h1>

    <p>
      Employee attendance analytics
    </p>

  </div>

  {
    currentUser?.role === "Admin" && (

      <button
        className="download-btn"
        onClick={downloadCSV}
      >
        Download Report
      </button>
    )
  }

</div>

<div className="attendance-table-wrapper">

  <table className="attendance-table">

            <thead>

              <tr>

                <th>ID</th>

                <th>Name</th>

                <th>Department</th>

                <th>Status</th>

                <th>Attendance</th>

              </tr>

            </thead>

            <tbody>

             {employees

             .sort((a, b) => a.id - b.id)

              .map((employee, index) => (


                <tr key={employee.id}>

                  <td>
                   {index + 1}
                  </td>

                  <td>
                    {employee.name}
                  </td>

                  <td>
                    {employee.department}
                  </td>

                  <td>

                    <span
                      className={
                        employee.status === "Active"

                          ? "active-status"

                          : employee.status === "Inactive"

                          ? "inactive-status"

                          : "leave-status"
                      }
                    >

                      {employee.status}

                    </span>

                  </td>

                  <td>

                    <div className="attendance-progress">

                      <div
                        className="attendance-bar"
                        style={{
                         width:
                              `${employee.attendance ??

                               (100 - (employee.id % 20))
                                }%`
                        }}
                      >

                      </div>

                    </div>

                    <span>
                     {
                      employee.attendance ??

                      (100 - (employee.id % 20))
                     }%
                    </span>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

    

    </DashboardLayout>
  );
}

export default Attendance;