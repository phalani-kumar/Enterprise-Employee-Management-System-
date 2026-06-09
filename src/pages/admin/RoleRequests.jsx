import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import DashboardLayout from "../../components/layout/DashboardLayout";

function RoleRequests() {

  const [requests,
    setRequests] =
    useState([]);

  useEffect(() => {

    fetchRequests();

  }, []);

  const fetchRequests =
    async () => {

     const currentUser =
  JSON.parse(
    localStorage.getItem("authUser")
  );

const response =
  await axios.get(
    `http://127.0.0.1:8000/role-request/${currentUser.company_id}`
  );

      setRequests(
        response.data
      );
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

  return (

    <DashboardLayout>

      <div className="role-request-page">

        <h1>
          Role Change Requests
        </h1>

        <table>

          <thead>

            <tr>

              <th>User</th>

              <th>Email</th>

              <th>Status</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {requests.map(
              (request) => (

                <tr
                  key={request.id}
                >

                  <td>
                    {request.user_name}
                  </td>

                  <td>
                    {request.user_email}
                  </td>

                  <td>
                    {request.status}
                  </td>

                  <td>

                    {request.status ===
                    "Pending" && (
                      <>
                        <button
                          onClick={() =>
                            approveRequest(
                              request.id
                            )
                          }
                        >
                          Approve
                        </button>

                        <button
                          onClick={() =>
                            rejectRequest(
                              request.id
                            )
                          }
                        >
                          Reject
                        </button>
                      </>
                    )}

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

export default RoleRequests;