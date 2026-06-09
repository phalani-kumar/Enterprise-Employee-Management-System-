import axios from "axios";

const API_URL =
  "http://127.0.0.1:8000";

export const getAuditLogs =
  async () => {

    const currentUser =
    JSON.parse(
      localStorage.getItem(
        "authUser"
      )
    );

    const response =
      await axios.get(
        `${API_URL}/audit-logs/${currentUser.company_id}`
      );

    return response.data;
};