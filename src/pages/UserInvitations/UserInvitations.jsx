import {
  useEffect,
  useState
} from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import {
  createInvitation,
  getInvitations,
  revokeInvitation
} from "../../services/invitationService";

import {
  getMembers,
  deactivateUser,
  suspendUser
} from "../../services/memberService";

function UserInvitations() {

  const currentUser =
    JSON.parse(
      localStorage.getItem(
        "authUser"
      )
    );

  const [email,
    setEmail] =
    useState("");

  const [role,
    setRole] =
    useState("User");

  const [invitations,
    setInvitations] =
    useState([]);

  const fetchInvitations =
    async () => {

      const response =
        await getInvitations(
          currentUser.company_id
        );

        console.log(response.data);

      setInvitations(
        response.data
      );
    };

    const [members,
  setMembers] =
  useState([]);

  const fetchMembers =
  async () => {

    const response =
      await getMembers(
        currentUser.company_id
      );

    setMembers(
      response.data
    );
  };

  useEffect(() => {

    fetchInvitations();
    fetchMembers();

  }, []);

const handleInvite = async () => {

  const response =
    await createInvitation({

      email,

      role,

      company_id:
        currentUser.company_id,

      company_name:
        currentUser.company_name,


      created_by:
        currentUser.name
    });

    console.log(response.data);

  const invitation =
    response.data;

  const inviteLink =
    `${window.location.origin}/signup?token=${invitation.token}`;

  navigator.clipboard.writeText(
    inviteLink
  );

  alert(
    "Invitation Link Generated & Copied"
  );

  setEmail("");
  setRole("User");


  fetchInvitations();
};
  return (

    <DashboardLayout>

<div className="invitation-top-section">

  {/* LEFT SIDE */}
  <div className="invitation-card">

    <h2>User Invitations</h2>

    <input
      type="email"
      placeholder="User Email"
      value={email}
      onChange={(e) =>
        setEmail(e.target.value)
      }
    />

    <select
      value={role}
      onChange={(e) =>
        setRole(e.target.value)
      }
    >
      <option>User</option>
      <option>Admin</option>
    </select>

    <button
      className="copy-btn"
      onClick={handleInvite}
    >
      Generate Invitation Link
    </button>

  </div>

  {/* RIGHT SIDE */}
  <div className="invitation-card">

    <h2>Pending Invitations</h2>

    {invitations
      .filter(
        (invitation) =>
          invitation.status ===
          "Pending"
      )
      .map((invitation) => (

        <div
          className="pending-item"
          key={`${invitation.id}-${invitation.email}`}
        >

          <div>

            <strong>
              {invitation.email}
            </strong>

            <p>
              {invitation.role}
            </p>

          </div>

          <div>

            <button
              className="copy-btn"
              onClick={() => {

                const inviteLink =
                  `${window.location.origin}/signup?token=${invitation.token}`;

                navigator.clipboard.writeText(
                  inviteLink
                );

                alert(
                  "Invitation Link Copied"
                );
              }}
            >
              Copy Link
            </button>

            <button
              className="revoke-btn"
              onClick={async () => {

                await revokeInvitation(
                  invitation.id
                );

                fetchInvitations();

              }}
            >
              Revoke
            </button>

          </div>

        </div>

      ))}
  </div>

</div>
<hr />

<h2 className="member-heading">
Active Members
</h2>

<table className="members-table">

  <thead>

    <tr>

      <th>Name</th>

      <th>Email</th>

      <th>Role</th>

      <th>Status</th>

      <th>Actions</th>

    </tr>

  </thead>

  <tbody>

{members.map(
  (member) => (

  <tr key={member.id}>

  <td>
    {member.name}
  </td>

  <td>
    {member.email}
  </td>

  <td>
    {member.role}
  </td>

  <td>
    {member.status}
  </td>

  <td>

  {
    member.id !== currentUser.id && (

      <>
  <button
    className="deactivate-btn"
    onClick={async () => {

      await deactivateUser(
        member.id,
        currentUser.name
      );

      fetchMembers();

    }}
  >

    Deactivate

  </button>

  <button
    className="suspend-btn"
    onClick={async () => {

      await suspendUser(
        member.id,
        currentUser.name
      );

      fetchMembers();

    }}
  >

    Suspend

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

    </DashboardLayout>
  )

}export default UserInvitations;