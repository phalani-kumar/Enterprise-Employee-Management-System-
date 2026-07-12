import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

// ===============================
// GET CERTIFICATIONS
// ===============================

export const getCertifications = async (employeeId) => {

    const response = await axios.get(

        `${API_URL}/certifications/${employeeId}`

    );

    return response.data;

};

// ===============================
// ADD CERTIFICATION
// ===============================

export const addCertification = async (data) => {

    const response = await axios.post(

        `${API_URL}/certifications`,

        data

    );

    return response.data;

};

// ===============================
// UPDATE CERTIFICATION
// ===============================

export const updateCertification = async (

    certificationId,

    data

) => {

    const response = await axios.put(

        `${API_URL}/certifications/${certificationId}`,

        data

    );

    return response.data;

};

// ===============================
// DELETE CERTIFICATION
// ===============================

export const deleteCertification = async (

    certificationId

) => {

    const response = await axios.delete(

        `${API_URL}/certifications/${certificationId}`

    );

    return response.data;

};

// ===============================
// UPLOAD CERTIFICATE DOCUMENT
// ===============================

export const uploadCertificate = async (file) => {

    const formData = new FormData();

    formData.append("file", file);

    const response = await axios.post(

        `${API_URL}/certifications/upload`,

        formData,

        {

            headers: {

                "Content-Type": "multipart/form-data"

            }

        }

    );

    return response.data;

};

// ===============================
// FILTER CERTIFICATIONS
// ===============================

export const filterCertifications = async (

    companyId,

    certificationName,

    status

) => {

    const response = await axios.get(

        `${API_URL}/certifications/filter/${companyId}`,

        {

            params: {

                certification_name: certificationName,

                status: status

            }

        }

    );

    return response.data;

};

// ===============================
// SEARCH CERTIFICATIONS
// ===============================

export const searchCertification = async (

    companyId,

    keyword

) => {

    const response = await axios.get(

        `${API_URL}/certifications/search/${companyId}/${keyword}`

    );

    return response.data;

};

// ===============================
// CERTIFICATION DASHBOARD SUMMARY
// ===============================

export const getCertificationSummary = async (

    employeeId

) => {

    const response = await axios.get(

        `${API_URL}/certifications/summary/${employeeId}`

    );

    return response.data;

};