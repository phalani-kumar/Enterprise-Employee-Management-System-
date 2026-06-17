import axios from "axios";

const API =
  "http://127.0.0.1:8000";

export const requestAttendanceAccess =
  (data) =>
    axios.post(
      `${API}/attendance/request-access`,
      data
    );

export const getAttendanceRequests =
  (companyId) =>
    axios.get(
      `${API}/attendance/requests/${companyId}`
    );

export const approveAttendanceAccess =
  (requestid) =>
    axios.put(
      `${API}/attendance/request/${requestid}/approve`
    );

export const rejectAttendanceAccess =
  (requestid) =>
    axios.put(
      `${API}/attendance/request/${requestid}/reject`
    );

export const checkIn =
  (data) =>
    axios.post(
      `${API}/attendance/checkin`,
      data
    );

export const checkOut =
  (userId) =>
    axios.put(
      `${API}/attendance/checkout/${userId}`
    );

export const getAttendanceHistory =
  (userId) =>
    axios.get(
      `${API}/attendance/history/${userId}`
    );    