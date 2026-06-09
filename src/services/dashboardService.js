import axios from "axios";

const API_URL =
  "http://127.0.0.1:8000";

export const getTotalEmployees =
  async () => {

    const response =
      await axios.get(
        `${API_URL}/dashboard/total-employees`
      );

    return response.data;
  };

export const getActiveEmployees =
  async () => {

    const response =
      await axios.get(
        `${API_URL}/dashboard/active-employees`
      );

    return response.data;
  };

export const getDepartments =
  async () => {

    const response =
      await axios.get(
        `${API_URL}/dashboard/departments`
      );

    return response.data;
  };

export const getRoles =
  async () => {

    const response =
      await axios.get(
        `${API_URL}/dashboard/roles`
      );

    return response.data;
  };

export const getStatus =
  async () => {

    const response =
      await axios.get(
        `${API_URL}/dashboard/status`
      );

    return response.data;
  };

export const getPendingRequests =
  async () => {

    const response =
      await axios.get(
        `${API_URL}/dashboard/pending-requests`
      );

    return response.data;
  };