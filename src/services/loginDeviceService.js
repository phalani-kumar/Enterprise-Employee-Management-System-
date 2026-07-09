import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

// Create Login Session
export const createSession = async (sessionData) => {

    const response = await axios.post(

        `${API_URL}/login-devices/session`,

        sessionData

    );

    return response.data;

};

// Get Current User Devices
export const getUserDevices = async (

    companyId,

    userId

) => {

    const response = await axios.get(

        `${API_URL}/login-devices/user/${companyId}/${userId}`
    );

    return response.data;

};

// Get Company Devices (Admin)
export const getCompanyDevices = async (companyId) => {

    const response = await axios.get(

        `${API_URL}/login-devices/company/${companyId}`

    );

    return response.data;

};

// Logout Selected Device
export const logoutDevice = async (

    sessionId,

    userId

) => {

    return axios.put(

        `${API_URL}/login-devices/logout/${sessionId}`,

        null,

        {

            params: {

                user_id: userId

            }

        }

    );

};

// Force Logout (Admin)
export const revokeSession = async (sessionId) => {

    return axios.put(

        `${API_URL}/login-devices/revoke/${sessionId}`

    );

};

// Rename Trusted Device
export const renameDevice = async (

    sessionId,

    userId,

    deviceName

) => {

    return axios.put(

        `${API_URL}/login-devices/rename/${sessionId}`,

        {

            user_id: userId,

            device_name: deviceName

        }

    );

};

// Remove Trusted Device
export const removeDevice = async (

    sessionId,

    userId,

    currentSession

) => {

    return axios.delete(

        `${API_URL}/login-devices/remove/${sessionId}`,

        {

            params: {

                user_id: userId,

                current_session: currentSession

            }

        }

    );

};

// Update Last Activity
export const updateActivity = async (sessionId) => {

    return axios.put(

        `${API_URL}/login-devices/activity/${sessionId}`

    );

};

export const getCurrentSession = async (sessionId) => {

    return axios.get(

        `${API_URL}/login-devices/current/${sessionId}`

    );

};

export const logoutAllDevices = async (

    userId,

    sessionId

) => {

    return axios.put(

        `${API_URL}/login-devices/logout-all/${userId}/${sessionId}`

    );

};

export const searchDevices = async (

    companyId,

    keyword

) => {

    return axios.get(

        `${API_URL}/login-devices/search/${companyId}/${keyword}`

    );

};

export const filterDevices = async (

    companyId,

    browser,

    status

) => {

    return axios.get(

        `${API_URL}/login-devices/filter/${companyId}`,

        {

            params: {

                browser,

                status

            }

        }

    );

};

export const revokeMultipleSessions = async (sessions) => {

    return axios.put(

        `${API_URL}/login-devices/revoke-multiple`,

        {

            sessions

        }

    );

};