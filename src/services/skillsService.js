import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

// ==========================
// GET EMPLOYEE SKILLS
// ==========================

export const getSkills = async (employeeId) => {

    const response = await axios.get(

        `${API_URL}/skills/${employeeId}`

    );

    return response.data;

};


// ==========================
// ADD SKILL
// ==========================

export const addSkill = async (skillData) => {

    const response = await axios.post(

        `${API_URL}/skills`,

        skillData

    );

    return response.data;

};


// ==========================
// UPDATE SKILL
// ==========================

export const updateSkill = async (

    skillId,

    skillData

) => {

    const response = await axios.put(

        `${API_URL}/skills/${skillId}`,

        skillData

    );

    return response.data;

};


// ==========================
// DELETE SKILL
// ==========================

export const deleteSkill = async (skillId) => {

    const response = await axios.delete(

        `${API_URL}/skills/${skillId}`

    );

    return response.data;

};