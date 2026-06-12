import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AccountDeactivated() {

  const navigate = useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem(
        "authUser"
      )
    );

  const [message,
    setMessage] =
    useState(
      "Please reactivate my account. I need access for ongoing work."
    );

  const sendRequest =
    async () => {

      try {

        await axios.post(
          "http://127.0.0.1:8000/reactivation-request",
          {
            user_id: user.id,
            user_email: user.email,
            company_id: user.company_id,
            message: message
          }
        );

        alert(
          "Reactivation Request Sent"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed To Send Request"
        );
      }
    };

  const logout =
    () => {

      localStorage.removeItem(
        "authUser"
      );

      navigate("/login");
    };

  return (

    <div className="deactivated-page">

      <div className="deactivated-card">

        <h1>
          Account Deactivated
        </h1>

        <p className="deactivated-text">

          Your account is currently deactivated.

          You can only access this page until the admin who deactivated your account reactivates it.

        </p>

        <p className="user-info">

          Signed in as

          <strong>
            {" "}
            {user?.email}
          </strong>

          {" • "}

          Deactivated by

          <strong>
            {" "}
            {user?.deactivated_by || "Admin"}
          </strong>

        </p>

        <div className="message-box">

          <label>

            Message to admin (optional)

          </label>

          <textarea

            rows="5"

            value={message}

            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }

          />

          <button
            className="reactivate-btn"
            onClick={sendRequest}
          >

            Send Reactivation Request

          </button>

        </div>

        <button
          className="logout-btn-deactivated"
          onClick={logout}
        >

          Logout

        </button>

      </div>

    </div>
  );
}

export default AccountDeactivated;