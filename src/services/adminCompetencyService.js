import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

// =======================================
// Search Employees by Skill
// =======================================

export const searchEmployeesBySkill = async (

    companyId,

    skillName

) => {

    const response = await axios.get(

        `${API_URL}/admin/skills/search/${companyId}/${skillName}`

    );

    return response.data;

};

// =======================================
// Filter Employees
// =======================================

export const filterEmployees = async (

    companyId,

    filters

) => {

    const response = await axios.get(

        `${API_URL}/admin/skills/filter/${companyId}`,

        {

            params: {

                skill: filters.skill,

                level: filters.level,

                experience: filters.experience,

                certification_status: filters.certification_status

            }

        }

    );

    return response.data;

};

// =======================================
// Employee Competency Profile
// =======================================

export const getCompetencyProfile = async (

    employeeId

) => {

    const response = await axios.get(

        `${API_URL}/admin/skills/profile/${employeeId}`

    );

    return response.data;

};

// =======================================
// Export Competency Report
// =======================================

export const exportCompetencyReport = async (

    companyId

) => {

    const response = await axios.get(

        `${API_URL}/admin/skills/export/${companyId}`

    );

    return response.data;

};