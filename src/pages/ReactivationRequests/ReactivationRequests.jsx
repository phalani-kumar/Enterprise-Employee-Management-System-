import {
  useEffect,
  useState
} from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import {
  getRequests,
  approveRequest,
  rejectRequest
} from "../../services/reactivationService";

function ReactivationRequests() {

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
        await getRequests(
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
        Reactivation Requests
      </h1>

      {requests.map(
        (request) => (

          <div
            key={
              request.id
            }
          >

            User ID:
            {request.user_id}

            {" | "}

            Status:
            {request.status}

            {

              request.status ===
              "Pending" && (

                <>
                  <button
                    onClick={async () => {

                      await approveRequest(
                        request.id
                      );

                      loadRequests();

                    }}
                  >

                    Approve

                  </button>

                  <button
                    onClick={async () => {

                      await rejectRequest(
                        request.id
                      );

                      loadRequests();

                    }}
                  >

                    Reject

                  </button>

                </>
              )
            }

          </div>
        )
      )}

    </DashboardLayout>
  );
}

export default ReactivationRequests;