import axios from "axios";

const API =
"http://127.0.0.1:8000";

export const submitLeave =
  (data) =>
    axios.post(
      `${API}/leave/request`,
      data
    );

export const getLeaveRequests =
  (companyId) =>
    axios.get(
      `${API}/leave/company/${companyId}`
    );

export const approveLeave =
(id) =>
axios.put(
`${API}/leave/${id}/approve`
);

export const rejectLeave =
(id) =>
axios.put(
`${API}/leave/${id}/reject`
);

export const getUserLeaves = (companyId) =>
  axios.get(
    `${API}/leave/company/${companyId}`
  );