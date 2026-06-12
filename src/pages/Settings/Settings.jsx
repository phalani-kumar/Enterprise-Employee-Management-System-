import {
  useState,
  useEffect
} from "react";

import axios from "axios";

import DashboardLayout from "../../components/layout/DashboardLayout";

function Settings() {

  const [darkMode,
    setDarkMode] =
    useState(false);

  const [notifications,
    setNotifications] =
    useState(true);

  const [email,
    setEmail] =
    useState(
      "admin@gmail.com"
    );

  const [name,
    setName] =
    useState(
      "Admin User"
    );

  const currentUser =
  JSON.parse(
    localStorage.getItem(
      "authUser"
    )
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


  // SAVE SETTINGS

  const handleSave =
    () => {

      alert(
        "Settings Saved Successfully"
      );
    };


  // DARK MODE

  const handleDarkMode =
    () => {

      setDarkMode(
        !darkMode
      );

      document.body.classList.toggle(
        "dark-mode"
      );
    };
  
  useEffect(() => {

  if (
    currentUser?.role ===
    "Admin"
  ) {

    fetchRequests();

     fetchReactivationRequests();
  }

}, []);

const fetchRequests =
  async () => {

    try {

      const response =
        await axios.get(
         `http://127.0.0.1:8000/role-request/${currentUser.company_id}`
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

        "http://127.0.0.1:8000/role-request",

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

      `http://127.0.0.1:8000/role-request/${id}/approve`

    );

    fetchRequests();
  };

const rejectRequest =
  async (id) => {

    await axios.put(

      `http://127.0.0.1:8000/role-request/${id}/reject`

    );

    fetchRequests();
  };

  const fetchReactivationRequests =
async () => {

  try {

    const response =
      await axios.get(

        `http://127.0.0.1:8000/reactivation-request/${currentUser.company_id}`

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

    `http://127.0.0.1:8000/reactivation/${id}/approve`

  );

  fetchReactivationRequests();
};

const rejectReactivation =
async (id) => {

  await axios.put(

    `http://127.0.0.1:8000/reactivation/${id}/reject`

  );

  fetchReactivationRequests();
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