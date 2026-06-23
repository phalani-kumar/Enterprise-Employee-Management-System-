import {
  useEffect,
  useState
}
from "react";

import DashboardLayout
from "../../components/layout/DashboardLayout";

import {
  logExport,
  getExportHistory
}
from "../../services/exportService";

import {

   exportFunctions
}

from "../../services/exportDownloadService";

function DataExportCenter() {

  const currentUser =
  JSON.parse(
    localStorage.getItem(
      "authUser"
    )
  );

  const [dataType,
  setDataType] =
  useState("");
  
  const [format,
  setFormat] =
  useState("");

  const [history,
    setHistory] =
    useState([]);

  useEffect(() => {

    loadHistory();

  }, []);

  const loadHistory =
  async () => {

    const response =
    await getExportHistory(
      currentUser.company_id
    );

    setHistory(
      response.data
    );
  };

  const handleExport = async (
  dataType,
  format
) => {

  await logExport({

    company_id:
      currentUser.company_id,

    exported_by:
      currentUser.name,

    data_type:
      dataType,

    format:
      format

  });

  const exportFunction =

    exportFunctions[
      dataType
    ]?.[
      format
    ];

  if (
    exportFunction
  ) {

    await exportFunction(
      currentUser.company_id
    );

  }

  loadHistory();

};

  const exportOptions = [

    "Employees",

    "Attendance",

    "Leave Requests",

    "Audit Logs",

    "Notifications",

    "Analytics"

  ];

  return (

    <DashboardLayout>

      <div className="export-page">

        <h1>
          Data Export Center
        </h1>

<div className="export-form">

  <div className="form-group">

    <label>
      Select Data
    </label>

    <select

      value={dataType}

      onChange={(e)=>

        setDataType(
          e.target.value
        )

      }

    >

      <option value="">
        Select Data
      </option>

      <option value="Employees">
        Employees
      </option>

      <option value="Attendance">
        Attendance
      </option>

      <option value="Leave Requests">
        Leave Requests
      </option>

      <option value="Audit Logs">
        Audit Logs
      </option>

      <option value="Notifications">
        Notifications
      </option>

      <option value="Analytics">
        Analytics
      </option>

    </select>

  </div>

  <div className="form-group">

    <label>
      Export Format
    </label>

    <select

      value={format}

      onChange={(e)=>

        setFormat(
          e.target.value
        )

      }

    >

      <option value="">
        Select Format
      </option>

      <option value="CSV">
        CSV
      </option>

      <option value="Excel">
        Excel
      </option>

      <option value="PDF">
        PDF
      </option>

    </select>

  </div>

  <button

    className="export-btn"

    onClick={() => {

      if (
        !dataType ||
        !format
      ) {

        alert(
          "Select Data Type and Format"
        );

        return;
      }

      handleExport(
        dataType,
        format
      );

    }}

  >

    Export

  </button>

</div>

        <div
          className="export-history"
        >

          <h2>
            Export History
          </h2>

          <table
            className="employee-table"
          >

            <thead>

              <tr>

                <th>
                  Exported By
                </th>

                <th>
                  Data
                </th>

                <th>
                  Format
                </th>

                <th>
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {
                history.map(
                  (item,index) => (

                    <tr key={index}>

                      <td>
                        {item.exported_by}
                      </td>

                      <td>
                        {item.data_type}
                      </td>

                      <td>
                        {item.format}
                      </td>

                      <td>
                        {item.timestamp}
                      </td>

                    </tr>

                  )
                )
              }

            </tbody>

          </table>

        </div>

      </div>

    </DashboardLayout>

  );
}

export default DataExportCenter;