import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const getHolidays = async (companyId) => {

    const response = await axios.get(
        `${API_URL}/holidays/${companyId}`
    );

    return response.data;
};

export const createHoliday = async (holiday) => {

    const response = await axios.post(
        `${API_URL}/holidays`,
        holiday
    );

    return response.data;
};

export const updateHoliday = async (holidayId, holiday) => {

    const response = await axios.put(
        `${API_URL}/holidays/${holidayId}`,
        holiday
    );

    return response.data;
};

export const deleteHoliday = async (holidayId) => {

    const response = await axios.delete(
        `${API_URL}/holidays/${holidayId}`
    );

    return response.data;
};

export const getCompanyHolidays = async (companyId) => {

    const response = await axios.get(

        `${API_URL}/holidays/${companyId}`

    );

    return response.data;

};