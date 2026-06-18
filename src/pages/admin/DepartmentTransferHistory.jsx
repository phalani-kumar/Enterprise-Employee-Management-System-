import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import {
  getDepartmentTransfers
}
from "../../services/employeeService";

function DepartmentTransferHistory() {

  const [transfers, setTransfers] =
    useState([]);

  useEffect(() => {

    const fetchTransfers =
      async () => {

        try {

          const currentUser =
            JSON.parse(
              localStorage.getItem(
                "authUser"
              )
            );

          const response =
            await getDepartmentTransfers(
              currentUser.company_id
            );

          setTransfers(
            response.data
          );

        } catch (error) {

          console.log(error);

        }
      };

    fetchTransfers();

  }, []);

  return (

    <DashboardLayout>

      <div className="employee-page">

        <div className="employee-header">

          <div>

            <h1>
              Department Transfer History
            </h1>

            <p>
              View all employee department transfers
            </p>

          </div>

        </div>

        <div className="table-wrapper">

          <table className="employee-table">

            <thead>

              <tr>

                <th>Employee</th>

                <th>From Department</th>

                <th>To Department</th>

                <th>Transferred By</th>

                <th>Date & Time</th>

              </tr>

            </thead>

            <tbody>

              {transfers.length > 0 ? (

                transfers.map(
                  (
                    transfer,
                    index
                  ) => (

                    <tr key={index}>

                      <td>
                        {transfer.employee_name}
                      </td>

                      <td>
                        {transfer.from_department}
                      </td>

                      <td>
                        {transfer.to_department}
                      </td>

                      <td>
                        {transfer.transferred_by}
                      </td>

                      <td>
                        {transfer.timestamp}
                      </td>

                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan="5"
                    style={{
                      textAlign:
                        "center"
                    }}
                  >

                    No Department Transfers Found

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </DashboardLayout>

  );
}

export default DepartmentTransferHistory;