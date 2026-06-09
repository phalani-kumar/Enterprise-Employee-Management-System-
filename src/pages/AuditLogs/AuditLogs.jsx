import { useEffect, useState } from "react";

import DashboardLayout from
"../../components/layout/DashboardLayout";

import {
  getAuditLogs
} from "../../services/auditService";

function AuditLogs() {

  const [logs,
    setLogs] =
    useState([]);

  useEffect(() => {

    loadLogs();

  }, []);

  const loadLogs =
    async () => {

      const data =
        await getAuditLogs();

      setLogs(data);
    };

  return (

    <DashboardLayout>

      <div className="audit-page">

        <h1>
          Audit Logs
        </h1>

        <table>

          <thead>

            <tr>

              <th>User</th>

              <th>Action</th>

              <th>Employee</th>

              <th>Timestamp</th>

            </tr>

          </thead>

          <tbody>

            {logs.map(
              (log, index) => (

                <tr key={index}>

                  <td>
                    {log.user_name}
                  </td>

                  <td>
                    {log.action}
                  </td>

                  <td>
                    {log.related_employee}
                  </td>

                  <td>
                    {log.timestamp}
                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
}

export default AuditLogs;