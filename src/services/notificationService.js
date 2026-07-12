import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

// =======================================
// EMPLOYEE NOTIFICATIONS
// =======================================

export const getEmployeeNotifications = async (employeeId) => {

    const response = await axios.get(

        `${API_URL}/notifications/certifications/${employeeId}`

    );

    return response.data;

};


// =======================================
// COMPANY (ADMIN) NOTIFICATIONS
// =======================================

export const getCompanyNotifications = async (companyId) => {

    const response = await axios.get(

        `${API_URL}/notifications/company/${companyId}`

    );

    return response.data;

};


// =======================================
// EMPLOYEE NOTIFICATION BADGE COUNT
// =======================================

export const getNotificationCount = async (employeeId) => {

    const response = await axios.get(

        `${API_URL}/notifications/count/${employeeId}`

    );

    return response.data;

};


// =======================================
// ADMIN NOTIFICATION BADGE COUNT
// =======================================

export const getAdminNotificationCount = async (companyId) => {

    const response = await axios.get(

        `${API_URL}/notifications/admin-count/${companyId}`

    );

    return response.data;

};