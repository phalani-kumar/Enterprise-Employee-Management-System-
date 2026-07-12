import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

// =======================================
// Employee Dashboard Summary
// =======================================

export const getEmployeeDashboardSummary = async (employeeId) => {

    const response = await axios.get(

        `${API_URL}/dashboard/employee-summary/${employeeId}`

    );

    return response.data;

};

// =======================================
// Admin Dashboard Summary
// =======================================

export const getAdminDashboardSummary = async (companyId) => {

    const response = await axios.get(

        `${API_URL}/dashboard/admin-summary/${companyId}`

    );

    return response.data;

};

// =======================================
// Top Skills
// =======================================

export const getTopSkills = async (companyId) => {

    const response = await axios.get(

        `${API_URL}/dashboard/top-skills/${companyId}`

    );

    return response.data;

};