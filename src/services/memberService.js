import axios from "axios";

const API =
"http://127.0.0.1:8000";

export const getMembers =
(companyId) => {

  return axios.get(
    `${API}/members/${companyId}`
  );
};

export const deactivateUser =
(
  userId,
  adminName
) => {

  return axios.put(
    `${API}/members/${userId}/deactivate`,
    {
      admin_name: adminName,
      reason:
        "Account disabled by administrator"
    }
  );
};

export const suspendUser = async (
  userId,
  adminName
) => {

  return axios.put(

    `${API}/users/${userId}/suspend`,

    {
      admin_name: adminName,
      reason: "Account suspended by administrator"
    }

  );

};

export const activateUser =
(id) => {

  return axios.put(
    `${API}/members/${id}/activate`
  );
};