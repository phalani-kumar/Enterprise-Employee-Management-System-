import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

function AccountSuspended() {

  const navigate =
    useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem(
        "authUser"
      )
    );

  const [message,
    setMessage] =
    useState(
      "Please reinstate my account. I need access to continue my work."
    );

  const sendRequest =
    async () => {

      try {

       await axios.post(

        "http://127.0.0.1:8000/reinstatement-request",

        {

          user_id: user.id,
      
          user_email: user.email,
      
          company_id: user.company_id,
      
          message: message
      
        }
      
      );

/* ADD THIS BLOCK HERE */

        const notifications =
          JSON.parse(
            localStorage.getItem(
              `notifications_${user.company_id}`
            )
          ) || [];
        
        notifications.push(
          `Reinstatement request from ${user.email}`
        );
        
        localStorage.setItem(
          `notifications_${user.company_id}`,
          JSON.stringify(notifications)
        );
        
        window.dispatchEvent(
          new Event("notificationUpdated")
        );



        alert(
          "Reinstatement Request Sent"
        );

      }

      catch (error) {

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

          Account Suspended

        </h1>

        <p className="deactivated-text">

          Your account has been suspended.

          Access to all modules is currently restricted.

        </p>

        <p className="user-info">

          Signed in as

          <strong>

            {" "}
            {user?.email}

          </strong>

        </p>

        <p>

          Suspension Status:
        
          <strong>
        
            {" "}
            {user?.status}
        
          </strong>
        
        </p>

        <p>
        
          Suspension Date:
        
          <strong>
        
            {" "}
            {user?.suspension_date || "Not Available"}
        
          </strong>
        
        </p>

        <p>

          Suspended By:

          <strong>

            {" "}
            {user?.suspended_by}

          </strong>

        </p>

        <p>

          Reason:

          <strong>

            {" "}
            {user?.suspension_reason}

          </strong>

        </p>

        <div className="message-box">

          <label>

            Message to admin

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

            Send Reinstatement Request

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

export default AccountSuspended;