import axios from "axios";

const API =
  "http://127.0.0.1:8000";

export const createInvitation =
  (data) =>
    axios.post(
      `${API}/invitations`,
      data
    );

export const getInvitations =
  (companyId) =>
    axios.get(
      `${API}/invitations/${companyId}`
    );

export const revokeInvitation =
  (id) =>
    axios.put(
      `${API}/invitations/${id}/revoke`
    );

export const getInvitationByToken =
  (token) =>
    axios.get(
      `${API}/invitation/${token}`
    );