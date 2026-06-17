import {
  useEffect,
  useState
}
from "react";

import DashboardLayout
from "../../components/layout/DashboardLayout";

import {

  getAttendanceRequests,

  approveAttendanceAccess,

  rejectAttendanceAccess

}
from "../../services/attendanceService";

function AttendanceRequests() {

  const currentUser =
    JSON.parse(
      localStorage.getItem(
        "authUser"
      )
    );

  const [requests,
    setRequests] =
    useState([]);

  const loadRequests =
    async () => {

      const response =
        await getAttendanceRequests(
          currentUser.company_id
        );

      setRequests(
        response.data
      );
    };

  useEffect(() => {

    loadRequests();

  }, []);

  return (

    <DashboardLayout>

      <h1>
        Attendance Requests
      </h1>

      {requests.map(
        (request) => (

          <div
            key={request.id}
          >

            <p>
              {request.user_name}
            </p>

            <p>
              {request.user_email}
            </p>

            <p>
              {request.status}
            </p>

            <button
              onClick={async () => {

                await approveAttendanceAccess(
                  request.id
                );

                localStorage.setItem(
                  `attendance_access_${request.user_id}`,
                  "Approved"
                );

                loadRequests();
              }}
            >
              Approve
            </button>

            <button
              onClick={async () => {

                await rejectAttendanceAccess(
                  request.id
                );

                loadRequests();
              }}
            >
              Reject
            </button>

          </div>
        )
      )}

    </DashboardLayout>
  );
}

export default AttendanceRequests;