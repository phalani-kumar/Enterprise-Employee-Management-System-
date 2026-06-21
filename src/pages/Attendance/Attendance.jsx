import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import { getEmployees } from "../../services/employeeService";

import {
  requestAttendanceAccess,
  checkIn,
  checkOut,
  getAttendanceHistory
}
from "../../services/attendanceService";

import {
  submitLeave,
  getUserLeaves
}
from "../../services/leaveService";

function Attendance() {

  const currentUser =
  JSON.parse(
    localStorage.getItem(
      "authUser"
    )
  );

const [attendanceAccess,
setAttendanceAccess] =
useState(false);

const [requestTime,
setRequestTime] =
useState("");

const [attendanceStatus,
setAttendanceStatus] =
useState("Not Checked In");

const [checkInTime,
setCheckInTime] =
useState("");

const [checkOutTime,
setCheckOutTime] =
useState("");

const [attendanceHistory,
setAttendanceHistory] =
useState([]);

const [leaveType,
setLeaveType] =
useState("");

const [myLeaves,
setMyLeaves] =
useState([]);

const [startDate,
setStartDate] =
useState("");

const [endDate,
setEndDate] =
useState("");

const [reason,
setReason] =
useState("");



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

useEffect(() => {

  const handleAttendanceUpdate = () => {

    loadAttendanceHistory();

  };

  loadAttendanceHistory();

  window.addEventListener(
    "attendanceUpdated",
    handleAttendanceUpdate
  );

  return () => {

    window.removeEventListener(
      "attendanceUpdated",
      handleAttendanceUpdate
    );

  };

}, []);

const loadAttendanceHistory =
async () => {

  try {

    const response =
      await getAttendanceHistory(
        currentUser.id
      );

    setAttendanceHistory(
      response.data
    );

  } catch (error) {

    console.log(error);

  }

};

useEffect(() => {

  const loadLeaves =
    async () => {

      try {

        const response =
          await getUserLeaves(
            currentUser.company_id
          );

        const userLeaves =
          response.data.filter(
            leave =>
              leave.user_id ===
              currentUser.id
          );

        setMyLeaves(
          userLeaves
        );

      } catch (error) {

        console.log(error);

      }
    };

  loadLeaves();

}, []);

useEffect(() => {

  if (
    currentUser?.role !== "User"
  ) {

    setAttendanceAccess(true);

    return;
  }

  if (
    currentUser?.attendance_access === true
  ) {

    setAttendanceAccess(true);

  } else {

    requestAttendanceAccess({

      user_id: currentUser.id,
      user_name: currentUser.name,
      user_email: currentUser.email,
      company_id: currentUser.company_id

    });

    setRequestTime(
      new Date().toLocaleString()
    );
  }

}, []);

const handleCheckIn = async () => {

  try {

    await checkIn({

      user_id:
        currentUser.id,

      user_name:
        currentUser.name,

      company_id:
        currentUser.company_id

    });

    const now =
      new Date().toLocaleString();

    setCheckInTime(now);

    setAttendanceStatus(
      "Checked In"
    );


    await loadAttendanceHistory();

window.dispatchEvent(
  new Event("attendanceUpdated")
);

  } catch (error) {

    console.log(error);

  }
};
const handleCheckOut = async () => {

  try {

    await checkOut(
      currentUser.id
    );

    await loadAttendanceHistory();

    const now =
      new Date().toLocaleString();

    setCheckOutTime(now);

    setAttendanceStatus(
      "Checked Out"
    );

    await loadAttendanceHistory();

window.dispatchEvent(
  new Event("attendanceUpdated")
);

    window.dispatchEvent(
  new Event("attendanceUpdated")
);

  } catch (error) {

    console.log(error);

  }
};

const handleLeaveSubmit =
async (e) => {

   e.preventDefault();

  try {

    console.log(
    "Leave Type:",
    leaveType
  );

    await submitLeave({

      user_id:
      currentUser.id,

      user_name:
      currentUser.name,

      company_id:
      currentUser.company_id,

      leave_type:
      leaveType,

      from_date:
      startDate,

      to_date:
      endDate,

      reason:
      reason

    });

    alert(
      "Leave Request Submitted"
    );

    const newLeave = {

  leave_type:
    leaveType,

  from_date:
    startDate,

  to_date:
    endDate,

  reason:
    reason,

  status:
    "Pending"
};

const updatedLeaves = [

  newLeave,

  ...myLeaves

];

setMyLeaves(
  updatedLeaves
);



    setStartDate("");

    setEndDate("");

    setReason("");

    setLeaveType("");

  } catch (error) {

    console.log(error);

  }
};

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

  if (

  currentUser?.role ===
  "User"

  &&

  !attendanceAccess

) {

  return (

    <DashboardLayout>

      <div
        className="pending-card"
      >

        <h1>

          Attendance Access Pending

        </h1>

        <p>

          Your account is not linked
          to an employee profile yet.

        </p>

        <p>

          A request has been sent
          to your company admin.

        </p>

        <p>

          Submitted on:

          <strong>

            {" "}

            {requestTime}

          </strong>

        </p>

      </div>

    </DashboardLayout>
  );
}

console.log(
  "My Leaves:",
  myLeaves
);

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
  </div>

{
currentUser?.role === "User" && (

<div className="attendance-user-layout">

  <div className="attendance-top-row">

  {/* Attendance Dashboard */}

    <div className="attendance-dashboard-card">
  
      <h2>
        Today's Attendance
      </h2>
  
      <p>
        <strong>User:</strong>
        {" "}
        {currentUser.email}
      </p>
  
      <p>
        <strong>Company:</strong>
        {" "}
        {currentUser.company_name}
      </p>
  
      <div className="attendance-summary">
  
        <p>
  
          In:
  
          {" "}
  
          {checkInTime || "--"}
  
        </p>
  
        <p>
  
          Out:
  
          {" "}
  
          {checkOutTime || "--"}
  
        </p>
  
      </div>
  
      <div className="attendance-actions">
  
        <button
          className="checkin-btn"
          onClick={handleCheckIn}
        >
          Check In
        </button>
  
        <button
          className="checkout-btn"
          onClick={handleCheckOut}
        >
          Check Out
        </button>
  
      </div>
  
      <p className="attendance-status">
  
        {
          attendanceStatus === "Checked Out"
  
          ? "Attendance completed for today"
  
          : attendanceStatus
        }
  
      </p>
  
    </div>

  {/* Leave Request */}

    <div className="leave-request-card">
  
      <h2>
        Request Leave
      </h2>
  
      <form
        onSubmit={handleLeaveSubmit}
      >
  
        <label>
          Leave Type
        </label>
  
        <select
  value={leaveType}
  onChange={(e)=>
    setLeaveType(
      e.target.value
    )
  }
>

  <option value="">
    Select Leave Type
  </option>

  <option value="Vacation">
    Vacation
  </option>

  <option value="Sick Leave">
    Sick Leave
  </option>

  <option value="Personal Leave">
    Personal Leave
  </option>

</select>
  
        <label>
          Start Date
        </label>
  
        <input
          type="date"
          value={startDate}
          onChange={(e)=>
            setStartDate(
              e.target.value
            )
          }
        />
  
        <label>
          End Date
        </label>
  
        <input
          type="date"
          value={endDate}
          onChange={(e)=>
            setEndDate(
              e.target.value
            )
          }
        />
  
        <label>
          Reason
        </label>
  
        <textarea
          value={reason}
          onChange={(e)=>
            setReason(
              e.target.value
            )
          }
        />
  
        <button
          type="submit"
          className="leave-submit-btn"
        >
          Submit Leave Request
        </button>
  
      </form>
  
    </div>
</div>
  {/* Recent Attendance */}

<div className="recent-attendance-section">

  <h2>
    Recent Attendance
  </h2>

  <table className="attendance-history-table">

    <thead>

      <tr>

        <th>Date</th>

        <th>Status</th>

        <th>Check In</th>

        <th>Check Out</th>

        <th>Working Hours</th>

      </tr>

    </thead>

    <tbody>

{attendanceHistory.map(
(item,index)=>(

<tr key={index}>

<td>
{
new Date(
item.check_in
).toLocaleDateString()
}
</td>

<td>Present</td>

<td>
{
new Date(
  item.check_in
).toLocaleTimeString()
}
</td>

<td>
{
item.check_out
? new Date(
    item.check_out
  ).toLocaleTimeString()
: "--"
}
</td>
<td>
{
item.hours || "--"
}
</td>

</tr>

))
}

</tbody>

  </table>

</div>

{/* My Leave Requests */}

<div className="leave-requests-section">

  <h2>
    My Leave Requests
  </h2>

  <table className="leave-table">

    <thead>

      <tr>

        <th>Type</th>

        <th>Dates</th>

        <th>Status</th>

        <th>Reason</th>

      </tr>

    </thead>

    <tbody>

      {
myLeaves.map(

  (
    leave,
    index
  ) => (

    <tr key={index}>

      <td>
        {leave.leave_type}
      </td>

      <td>

        {leave.from_date}

        {" → "}

        {leave.to_date}

      </td>

      <td>
        {leave.status}
      </td>

      <td>
        {leave.reason}
      </td>

    </tr>

  )

)
}

    </tbody>

  </table>

</div>

</div>

)
}
  
<div>
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
{
currentUser?.role === "Admin" && (

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

    

            )}
    </DashboardLayout>
 );


}export default Attendance;