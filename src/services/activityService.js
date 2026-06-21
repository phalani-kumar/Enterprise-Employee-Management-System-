import axios from "axios";

const API_URL =
  "http://127.0.0.1:8000";

export const trackLogin =
(data) =>

axios.post(
  `${API_URL}/activity/login`,
  data
);

export const trackLogout =
(data) =>

axios.post(
  `${API_URL}/activity/logout`,
  data
);

export const getActivity =
(companyId) =>

axios.get(
  `${API_URL}/activity/${companyId}`
);