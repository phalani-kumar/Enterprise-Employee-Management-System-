import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import {

    getCertifications,

    addCertification,

    updateCertification,

    deleteCertification,

    uploadCertificate

} from "../../services/certificationService";

function Certifications() {

    const currentUser = JSON.parse(

        localStorage.getItem("authUser")

    );

    const [certifications, setCertifications] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const [formData, setFormData] = useState({

        employee_id: currentUser.id,

        company_id: currentUser.company_id,

        certification_name: "",

        issuing_organization: "",

        issue_date: "",

        expiry_date: "",

        document: ""

    });

    // ==========================
    // LOAD CERTIFICATIONS
    // ==========================

    const loadCertifications = async () => {

        try {

            setLoading(true);

            const data = await getCertifications(

                currentUser.id

            );

            setCertifications(data);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadCertifications();

    }, []);

    // ==========================
    // HANDLE INPUT
    // ==========================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({

            ...formData,

            [name]: value

        });

    };

    // ==========================
    // FILE UPLOAD
    // ==========================

    const handleFileUpload = async (e) => {

        const file = e.target.files[0];

        if (!file) return;

        try {

            const response = await uploadCertificate(file);

            setFormData({

                ...formData,

                document: response.file_path

            });

        }

        catch (error) {

            console.log(error);

        }

    };

    // ==========================
    // RESET FORM
    // ==========================

    const resetForm = () => {

        setEditingId(null);

        setFormData({

            employee_id: currentUser.id,

            company_id: currentUser.company_id,

            certification_name: "",

            issuing_organization: "",

            issue_date: "",

            expiry_date: "",

            document: ""

        });

    };

    // ==========================
    // EDIT
    // ==========================

    const handleEdit = (certificate) => {

        setEditingId(certificate.id);

        setFormData({

            employee_id: certificate.employee_id,

            company_id: certificate.company_id,

            certification_name: certificate.certification_name,

            issuing_organization: certificate.issuing_organization,

            issue_date: certificate.issue_date,

            expiry_date: certificate.expiry_date,

            document: certificate.document

        });

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    };

    // ==========================
    // DELETE
    // ==========================

    const handleDelete = async (id) => {

        if (

            !window.confirm(

                "Delete this Certification?"

            )

        ) return;

        try {

            await deleteCertification(id);

            setMessage(

                "Certification Deleted Successfully"

            );

            loadCertifications();

        }

        catch (error) {

            console.log(error);

        }

    };

    // ==========================
    // SAVE
    // ==========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (

                formData.expiry_date &&

                formData.expiry_date < formData.issue_date

            ) {

                alert(

                    "Expiry Date cannot be earlier than Issue Date."

                );

                return;

            }

            if (editingId) {

                await updateCertification(

                    editingId,

                    formData

                );

                setMessage(

                    "Certification Updated Successfully"

                );

            }

            else {

                await addCertification(formData);

                setMessage(

                    "Certification Added Successfully"

                );

            }

            resetForm();

            loadCertifications();

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Operation Failed"

            );

        }

    };

    return (

    <DashboardLayout>

        <div className="page-container">

            {

                message &&

                <div
                    style={{
                        background: "#d4edda",
                        color: "#155724",
                        padding: "10px",
                        marginBottom: "15px",
                        borderRadius: "5px"
                    }}
                >

                    {message}

                </div>

            }

    <form

    onSubmit={handleSubmit}

    style={{

        background: "#ffffff",

        padding: "20px",

        borderRadius: "8px",

        marginBottom: "20px"

    }}

>

    <h3>

        {

            editingId

                ? "Edit Certification"

                : "Add Certification"

        }

    </h3>

    <div

        style={{

            display: "grid",

            gridTemplateColumns: "repeat(2,1fr)",

            gap: "15px"

        }}

    >

        <div>

            <label>

                Certification Name

            </label>

            <input

                type="text"

                name="certification_name"

                value={formData.certification_name}

                onChange={handleChange}

                required

                className="form-control"

            />

        </div>

        <div>

            <label>

                Issuing Organization

            </label>

            <input

                type="text"

                name="issuing_organization"

                value={formData.issuing_organization}

                onChange={handleChange}

                required

                className="form-control"

            />

        </div>

        <div>

            <label>

                Issue Date

            </label>

            <input

                type="date"

                name="issue_date"

                value={formData.issue_date}

                onChange={handleChange}

                required

                className="form-control"

            />

        </div>

        <div>

            <label>

                Expiry Date

            </label>

            <input

                type="date"

                name="expiry_date"

                value={formData.expiry_date}

                onChange={handleChange}

                className="form-control"

            />

        </div>

        <div>

            <label>

                Upload Certificate

            </label>

            <input

                type="file"

                accept=".pdf,.png,.jpg,.jpeg"

                onChange={handleFileUpload}

                className="form-control"

            />

        </div>

        <div>

            <label>

                Uploaded Document

            </label>

            <input

                type="text"

                value={formData.document}

                readOnly

                className="form-control"

            />

        </div>

    </div>

    <div

        style={{

            marginTop: "20px",

            display: "flex",

            gap: "10px"

        }}

    >

        <button

            type="submit"

        >

            {

                editingId

                    ? "Update Certification"

                    : "Add Certification"

            }

        </button>

        {

            editingId &&

            <button

                type="button"

                onClick={resetForm}

            >

                Cancel

            </button>

        }

    </div>

</form>

{/* ==========================
    CERTIFICATIONS TABLE
========================== */}

<div
    style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "8px"
    }}
>

    <h3>My Certifications</h3>

    {

        loading ?

        (

            <p>

                Loading Certifications...

            </p>

        )

        :

        (

            <table className="employee-table">

                <thead>

                    <tr>

                        <th>Certification</th>

                        <th>Organization</th>

                        <th>Issue Date</th>

                        <th>Expiry Date</th>

                        <th>Status</th>

                        <th>Document</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        certifications.length === 0 ?

                        (

                            <tr>

                                <td
                                    colSpan="7"
                                    style={{
                                        textAlign: "center"
                                    }}
                                >

                                    No Certifications Added

                                </td>

                            </tr>

                        )

                        :

                        (

                            certifications.map(certificate => {

                                const today = new Date();

                                const expiry = new Date(certificate.expiry_date);

                                const diffDays = Math.ceil(

                                    (expiry - today) /

                                    (1000 * 60 * 60 * 24)

                                );

                                let status = "Valid";

                                let color = "#28a745";

                                if (diffDays < 0) {

                                    status = "Expired";

                                    color = "#dc3545";

                                }

                                else if (diffDays <= 30) {

                                    status = "Expiring Soon";

                                    color = "#ffc107";

                                }

                                return (

                                    <tr key={certificate.id}>

                                        <td>

                                            {certificate.certification_name}

                                        </td>

                                        <td>

                                            {certificate.issuing_organization}

                                        </td>

                                        <td>

                                            {certificate.issue_date}

                                        </td>

                                        <td>

                                            {

                                                certificate.expiry_date ||

                                                "-"

                                            }

                                        </td>

                                        <td>

                                            <span

                                                style={{

                                                    background: color,

                                                    color: "#fff",

                                                    padding: "4px 10px",

                                                    borderRadius: "15px",

                                                    fontSize: "12px"

                                                }}

                                            >

                                                {status}

                                            </span>

                                        </td>

                                        <td>

                                            {

                                                certificate.document ?

                                                (

                                                    <a

                                                        href={certificate.document}

                                                        target="_blank"

                                                        rel="noreferrer"

                                                    >

                                                        View

                                                    </a>

                                                )

                                                :

                                                (

                                                    "-"

                                                )

                                            }

                                        </td>

                                        <td>

                                            <button

                                                onClick={() =>

                                                    handleEdit(certificate)

                                                }

                                                style={{

                                                    marginRight: "8px"

                                                }}

                                            >

                                                Edit

                                            </button>

                                            <button

                                                onClick={() =>

                                                    handleDelete(certificate.id)

                                                }

                                            >

                                                Delete

                                            </button>

                                        </td>

                                    </tr>

                                );

                            })

                        )

                    }

                </tbody>

            </table>

        )

    }

</div>

        </div>

    </DashboardLayout>

);

}

export default Certifications;