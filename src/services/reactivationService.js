import axios from "axios";

const API =
"http://127.0.0.1:8000";

export const submitRequest =
(data) => {

  return axios.post(
    `${API}/reactivation-request`,
    data
  );
};

export const getRequests =
(companyId) => {

  return axios.get(
    `${API}/reactivation-requests/${companyId}`
  );
};

export const approveRequest =
(id) => {

  return axios.put(
    `${API}/reactivation/${id}/approve`
  );
};

export const rejectRequest =
(id) => {

  return axios.put(
    `${API}/reactivation/${id}/reject`
  );
};