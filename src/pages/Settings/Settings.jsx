import {
  useState,
  useEffect
} from "react";

import axios from "axios";

import DashboardLayout from "../../components/layout/DashboardLayout";

import {
  getLeaveRequests,
  approveLeave,
  rejectLeave
}
from "../../services/leaveService";

function Settings() {

  const [darkMode,
  setDarkMode] =
  useState(() => {

    return JSON.parse(
      localStorage.getItem(
        "darkMode"
      )
    ) || false;

  });

  const [notifications,
    setNotifications] =
    useState(true);

  const currentUser =
  JSON.parse(
    localStorage.getItem(
      "authUser"
    )
  );  

  const [email,
  setEmail] =
  useState(
    currentUser?.email || ""
  );

const [name,
  setName] =
  useState(
    currentUser?.name || ""
  );

const [currentPassword,
  setCurrentPassword] =
  useState("");

const [adminEmail,
  setAdminEmail] =
  useState("");
  
  const [requests,
  setRequests] =
  useState([]);

  const [reactivationRequests,
  setReactivationRequests] =
  useState([]);

  const [reinstatementRequests,
  setReinstatementRequests] =
  useState([]);

  const [leaveRequests,
  setLeaveRequests]
  =
  useState([]);

  useEffect(() => {

  const updateDarkMode = () => {

    const savedMode =
      JSON.parse(
        localStorage.getItem(
          "darkMode"
        )
      ) || false;

    setDarkMode(savedMode);

  };

  window.addEventListener(
    "darkModeChanged",
    updateDarkMode
  );

  return () => {

    window.removeEventListener(
      "darkModeChanged",
      updateDarkMode
    );

  };

}, []);


  // SAVE SETTINGS

  const handleSave =
    () => {

      alert(
        "Settings Saved Successfully"
      );
    };


  // DARK MODE

  const handleDarkMode = () => {

  const newMode = !darkMode;

  setDarkMode(newMode);

  document.body.classList.toggle(
    "dark-mode",
    newMode
  );

  localStorage.setItem(
    "darkMode",
    JSON.stringify(newMode)
  );

  window.dispatchEvent(
    new Event("darkModeChanged")
  );

};
 useEffect(() => {

  const updateDarkMode =
    () => {

      const mode =
        JSON.parse(
          localStorage.getItem(
            "darkMode"
          )
        ) || false;

      setDarkMode(mode);

    };

  window.addEventListener(
    "darkModeChanged",
    updateDarkMode
  );

  return () => {

    window.removeEventListener(
      "darkModeChanged",
      updateDarkMode
    );

  };

}, []); 
  
  useEffect(() => {

  if (
    currentUser?.role ===
    "Admin"
  ) {

    fetchRequests();

    fetchReactivationRequests();

    fetchReinstatementRequests();

  }

}, []);

const fetchRequests =
  async () => {

    try {

      const response =
        await axios.get(
         `http://127.0.0.1:8001/role-request/${currentUser.company_id}`
        );

      setRequests(
        response.data
      );

    } catch (error) {

      console.log(error);
    }
  };

  const sendRequest =
  async () => {

    try {

      await axios.post(

        "http://127.0.0.1:8001/role-request",

        {

          user_name:
            currentUser.name,

          user_email:
            currentUser.email,

          current_password:
            currentPassword,

          admin_email:
            adminEmail
        }
      );

      alert(
        "Role Change Request Sent"
      );

      setCurrentPassword("");

      setAdminEmail("");

    } catch (error) {

      alert(
        "Failed to Send Request"
      );
    }
  };

  const approveRequest =
  async (id) => {

    await axios.put(

      `http://127.0.0.1:8001/role-request/${id}/approve`

    );

    fetchRequests();
  };

const rejectRequest =
  async (id) => {

    await axios.put(

      `http://127.0.0.1:8001/role-request/${id}/reject`

    );

    fetchRequests();
  };

  const fetchReactivationRequests =
async () => {

  try {

    const response =
      await axios.get(

        `http://127.0.0.1:8001/reactivation-request/${currentUser.company_id}`

      );

    setReactivationRequests(
      response.data
    );

  } catch(error) {

    console.log(error);
  }
};

const approveReactivation =
async (id) => {

  await axios.put(

    `http://127.0.0.1:8001/reactivation/${id}/approve`

  );

  fetchReactivationRequests();
};

const rejectReactivation =
async (id) => {

  await axios.put(

    `http://127.0.0.1:8001/reactivation/${id}/reject`

  );

  fetchReactivationRequests();
};

const fetchReinstatementRequests =
async () => {

  try {

    const response =
      await axios.get(

        `http://127.0.0.1:8001/reinstatement-request/${currentUser.company_id}`

      );

    setReinstatementRequests(
      response.data
    );

  } catch(error) {

    console.log(error);

  }

};

const approveReinstatement =
async (id) => {

  await axios.put(

    `http://127.0.0.1:8001/reinstatement/${id}/approve`

  );

  fetchReinstatementRequests();

};

const rejectReinstatement =
async (id) => {

  await axios.put(

    `http://127.0.0.1:8001/reinstatement/${id}/reject`

  );

  fetchReinstatementRequests();

};

useEffect(() => {

  if (
    currentUser?.role !==
    "Admin"
  ) return;

  loadLeaveRequests();

}, []);

const loadLeaveRequests =
async () => {

  try {

    const response =
      await getLeaveRequests(
        currentUser.company_id
      );

    setLeaveRequests(

  response.data.filter(
    leave =>
      leave.status === "Pending"
  )

);

  } catch (error) {

    console.log(error);

  }
};
  
  return (

    <DashboardLayout>

      <div className="settings-page">

        {/* HEADER */}

        <div className="page-header">

          <h1>
            Settings
          </h1>

          <p>
            Manage your account settings
          </p>

        </div>

        {/* SETTINGS GRID */}

        <div className="settings-grid">

          {/* PROFILE SETTINGS */}

          <div className="settings-card">

            <h2>
              Profile Settings
            </h2>

            <div className="settings-form">

              <label>
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
              />

              <label>
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
              />

            </div>

          </div>

          {/* APP SETTINGS */}

          <div className="settings-card">

            <h2>
              App Settings
            </h2>

           

            {/* DARK MODE */}

            <div className="setting-item">

              <div>

                <h4>
                  Dark Mode
                </h4>

                <p>
                  Enable dark theme
                </p>

              </div>

              <label className="switch">

                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={
                    handleDarkMode
                  }
                />

                <span className="slider">

                </span>

              </label>

            </div>

            {/* NOTIFICATIONS */}

            <div className="setting-item">

              <div>

                <h4>
                  Notifications
                </h4>

                <p>
                  Enable notifications
                </p>

              </div>

              <label className="switch">

                <input
                  type="checkbox"
                  checked={
                    notifications
                  }
                  onChange={() =>
                    setNotifications(
                      !notifications
                    )
                  }
                />

                <span className="slider">

                </span>

              </label>

            </div>

          </div>

        </div>

        {
  currentUser?.role ===
    "User" && (

    <div className="role-request-card">

      <h2>
        Request Admin Access
      </h2>

      <input
        type="password"
        placeholder="Current Password"
        value={
          currentPassword
        }
        onChange={(e) =>
          setCurrentPassword(
            e.target.value
          )
        }
      />

      <input
        type="email"
        placeholder="Admin Email"
        value={adminEmail}
        onChange={(e) =>
          setAdminEmail(
            e.target.value
          )
        }
      />

      <button
       className="send-request-btn"
        onClick={
          sendRequest
        }
      >
        Send Request
      </button>

    </div>
  )
}

{
  currentUser?.role ===
    "Admin" && (

    <div className="role-request-card">

      <h2>
        Role Change Requests
      </h2>

      <table className="request-table">

        <thead>

          <tr>

            <th>
              User
            </th>

            <th>
              Email
            </th>

            <th>
              Status
            </th>

            <th>
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {requests.map(
            (
              request
            ) => (

              <tr
                key={
                  request.id
                }
              >

                <td>
                  {
                    request.user_name
                  }
                </td>

                <td>
                  {
                    request.user_email
                  }
                </td>

                <td
  className={
    request.status === "Approved"
      ? "status-approved"
      : request.status === "Rejected"
      ? "status-rejected"
      : "status-pending"
  }
>
  {request.status}
</td>

                <td>

                  {
                    request.status ===
                      "Pending" && (
                      <>
                        <button
                         className="approve-btn"
                          onClick={() =>
                            approveRequest(
                              request.id
                            )
                          }
                        >
                          Approve
                        </button>

                        <button
                        className="reject-btn"
                          onClick={() =>
                            rejectRequest(
                              request.id
                            )
                          }
                        >
                          Reject
                        </button>
                      </>
                    )
                  }

                </td>

              </tr>
            )
          )}

        </tbody>

      </table>

    </div>
  )
}

{
currentUser?.role === "Admin" && (

<div className="role-request-card">

<h2>
Reactivation Requests
</h2>

<table className="request-table">

<thead>

<tr>

<th>User Email</th>

<th>Message</th>

<th>Status</th>

<th>Action</th>

</tr>

</thead>

<tbody>

{
reactivationRequests.map(
(request) => (

<tr key={request.id}>

<td>
{request.user_email}
</td>

<td>
{request.message}
</td>

<td>
{request.status}
</td>

<td>

{
request.status ===
"Pending" && (

<>

<button
className="approve-btn"
onClick={() =>
approveReactivation(
request.id
)
}
>
Approve
</button>

<button
className="reject-btn"
onClick={() =>
rejectReactivation(
request.id
)
}
>
Reject
</button>

</>

)
}

</td>

</tr>

)
)
}

</tbody>

</table>

</div>

)
}

{
currentUser?.role === "Admin" && (

<div className="role-request-card">

<h2>
Reinstatement Requests
</h2>

<table className="request-table">

<thead>

<tr>

<th>User Email</th>

<th>Message</th>

<th>Status</th>

<th>Action</th>

</tr>

</thead>

<tbody>

{
reinstatementRequests.map(
(request) => (

<tr key={request.id}>

<td>
{request.user_email}
</td>

<td>
{request.message}
</td>

<td

className={
request.status === "Approved"
? "status-approved"
: request.status === "Rejected"
? "status-rejected"
: "status-pending"
}

>

{request.status}

</td>

<td>

{
request.status === "Pending" && (

<>

<button

className="approve-btn"

onClick={() =>
approveReinstatement(
request.id
)
}

>

Approve

</button>

<button

className="reject-btn"

onClick={() =>
rejectReinstatement(
request.id
)
}

>

Reject

</button>

</>

)
}

</td>

</tr>

)
)
}

</tbody>

</table>

</div>

)
}

{
currentUser?.role === "Admin" && (

<div className="leave-requests-section">

  <h2>
    Leave Requests
  </h2>

   <table className="request-table">

    <thead>

      <tr>

        <th>
          Employee
        </th>

        <th>
          Leave Type
        </th>

        <th>
          From
        </th>

        <th>
          To
        </th>

        <th>
          Reason
        </th>

        <th>
          Status
        </th>

        <th>
          Action
        </th>

      </tr>

    </thead>

    <tbody>

      {
      leaveRequests.map(
        (leave) => (

          <tr
            key={leave.id}
          >

            <td>
              {leave.user_name}
            </td>

            <td>
              {leave.leave_type}
            </td>

            <td>
              {leave.from_date}
            </td>

            <td>
              {leave.to_date}
            </td>

            <td>
              {leave.reason}
            </td>

            {/* <td>
              {leave.status}
            </td> */}

            <td

              className={
              leave.status === "Approved"
                ? "status-approved"
                : leave.status === "Rejected"
                ? "status-rejected"
                : "status-pending"
              }
            >
              {leave.status}
            </td>

             <td>

              {
              leave.status ===
              "Pending" && (

                <>

                  <button

                    onClick={
                      async () => {

                        await approveLeave(
                          leave.id
                        );

                        loadLeaveRequests();
                      }
                    }

                  >
                    Approve
                  </button>

                  <button

                    onClick={
                      async () => {

                        await rejectLeave(
                          leave.id
                        );

                        loadLeaveRequests();
                      }
                    }

                  >
                    Reject
                  </button>

                </>

              )
              }

            </td>

          </tr>

        )
      )
      }

    </tbody>

  </table>

</div>

)
}

        {/* SAVE BUTTON */}

        <button
          className="save-settings-btn"
          onClick={handleSave}
        >

          Save Settings

        </button>

      </div>

    </DashboardLayout>
  );
}

export default Settings;