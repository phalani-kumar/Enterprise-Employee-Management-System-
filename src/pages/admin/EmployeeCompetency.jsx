import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import CompetencyProfileCard from "../../pages/admin/CompetencyProfileCard";

import {

    searchEmployeesBySkill,

    filterEmployees,

    getCompetencyProfile,

    exportCompetencyReport

} from "../../services/adminCompetencyService";

function EmployeeCompetency() {

    const currentUser = JSON.parse(

        localStorage.getItem("authUser")

    );

    // =====================================
    // STATE
    // =====================================

    const [employees, setEmployees] = useState([]);

    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const [searchSkill, setSearchSkill] = useState("");

    const [filters, setFilters] = useState({

        skill: "",

        level: "",

        experience: "",

        certification_status: ""

    });

    // =====================================
    // LOAD EMPLOYEES
    // =====================================

    const loadEmployees = async () => {

        try {

            setLoading(true);

            const data = await filterEmployees(

                currentUser.company_id,

                {}

            );

            setEmployees(data);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadEmployees();

    }, []);

    // =====================================
    // SEARCH
    // =====================================

    const handleSearch = async () => {

        try {

            setLoading(true);

            if (searchSkill.trim() === "") {

                loadEmployees();

                return;

            }

            const data = await searchEmployeesBySkill(

                currentUser.company_id,

                searchSkill

            );

            setEmployees(data);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    // =====================================
    // FILTER
    // =====================================

    const handleFilter = async () => {

        try {

            setLoading(true);

            const data = await filterEmployees(

                currentUser.company_id,

                filters

            );

            setEmployees(data);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    // =====================================
    // VIEW PROFILE
    // =====================================

    const handleViewProfile = async (

        employeeId

    ) => {

        try {

            const profile = await getCompetencyProfile(

                employeeId

            );

            setSelectedEmployee(profile);

        }

        catch (error) {

            console.log(error);

        }

    };

    // =====================================
    // EXPORT REPORT
    // =====================================

    const handleExport = () => {

    if (employees.length === 0) {

        alert("No data to export");

        return;

    }

    const headers = [

        "Employee",

        "Total Skills",

        "Primary Skills",

        "Total Certifications",

        "Active Certifications",

        "Profile Completion"

    ];

    const rows = employees.map(emp => [

        emp.employee_name,

        emp.total_skills,

        emp.primary_skills.join(", "),

        emp.total_certifications,

        emp.active_certifications,

        emp.profile_completion + "%"

    ]);

    const csv = [

        headers.join(","),

        ...rows.map(row => row.join(","))

    ].join("\n");

    const blob = new Blob(

        [csv],

        {

            type: "text/csv"

        }

    );

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "Employee_Competency_Report.csv";

    a.click();

    window.URL.revokeObjectURL(url);

};

    // =====================================
    // UI
    // =====================================

    return (

        <DashboardLayout>

            <div className="page-container">

                <h2>Employee Competency Management</h2>

                {

                    message &&

                    <div

                        style={{

                            background: "#d4edda",

                            color: "#155724",

                            padding: "10px",

                            borderRadius: "6px",

                            marginBottom: "15px"

                        }}

                    >

                        {message}

                    </div>

                }

                {/* ==========================
                    SEARCH & FILTER
                ========================== */}

                <div

                    style={{

                        background: "#ffffff",

                        padding: "20px",

                        borderRadius: "8px",

                        marginBottom: "20px"

                    }}

                >

                    <h3>Search & Filter Employees</h3>

                    <div

                        style={{

                            display: "grid",

                            gridTemplateColumns: "repeat(2,1fr)",

                            gap: "15px"

                        }}

                    >

                        {/* Search Skill */}

                        <div>

                            <label>Search by Skill</label>

                            <input

                                type="text"

                                placeholder="React, Python..."

                                value={searchSkill}

                                onChange={(e) =>

                                    setSearchSkill(

                                        e.target.value

                                    )

                                }

                                className="form-control"

                            />

                        </div>

                        {/* Skill */}

                        <div>

                            <label>Skill</label>

                            <input

                                type="text"

                                value={filters.skill}

                                onChange={(e)=>

                                    setFilters({

                                        ...filters,

                                        skill:e.target.value

                                    })

                                }

                                className="form-control"

                            />

                        </div>

                        {/* Skill Level */}

                        <div>

                            <label>Skill Level</label>

                            <select

                                value={filters.level}

                                onChange={(e)=>

                                    setFilters({

                                        ...filters,

                                        level:e.target.value

                                    })

                                }

                                className="form-control"

                            >

                                <option value="">

                                    All Levels

                                </option>

                                <option>

                                    Beginner

                                </option>

                                <option>

                                    Intermediate

                                </option>

                                <option>

                                    Advanced

                                </option>

                                <option>

                                    Expert

                                </option>

                            </select>

                        </div>

                        {/* Experience */}

                        <div>

                            <label>

                                Minimum Experience

                            </label>

                            <input

                                type="number"

                                min="0"

                                value={filters.experience}

                                onChange={(e)=>

                                    setFilters({

                                        ...filters,

                                        experience:e.target.value

                                    })

                                }

                                className="form-control"

                            />

                        </div>

                        {/* Certification */}

                        <div>

                            <label>

                                Certification Status

                            </label>

                            <select

                                value={filters.certification_status}

                                onChange={(e)=>

                                    setFilters({

                                        ...filters,

                                        certification_status:e.target.value

                                    })

                                }

                                className="form-control"

                            >

                                <option value="">

                                    All

                                </option>

                                <option>

                                    Valid

                                </option>

                                <option>

                                    Expired

                                </option>

                                <option>

                                    Expiring Soon

                                </option>

                            </select>

                        </div>

                    </div>

                    <div

                        style={{

                            marginTop:"20px",

                            display:"flex",

                            gap:"10px"

                        }}

                    >

                        <button

                            onClick={handleSearch}

                        >

                            Search

                        </button>

                        <button

                            onClick={handleFilter}

                        >

                            Apply Filter

                        </button>

                        <button

                            onClick={handleExport}

                        >

                            Export Report

                        </button>

                    </div>

                </div>

                {/* ==========================
                    EMPLOYEE COMPETENCY TABLE
                ========================== */}

                <div

                    style={{

                        background: "#ffffff",

                        padding: "20px",

                        borderRadius: "8px"

                    }}

                >

                    <h3>Employee Competency List</h3>

                    {

                        loading ?

                        (

                            <p>

                                Loading Employees...

                            </p>

                        )

                        :

                        (

                            <table className="employee-table">

                                <thead>

                                    <tr>

                                        <th>Employee</th>

                                        <th>Total Skills</th>

                                        <th>Primary Skills</th>

                                        <th>Total Certifications</th>

                                        <th>Active Certifications</th>

                                        <th>Profile Completion</th>

                                        <th>Actions</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        employees.length === 0 ?

                                        (

                                            <tr>

                                                <td

                                                    colSpan="7"

                                                    style={{

                                                        textAlign: "center"

                                                    }}

                                                >

                                                    No Employees Found

                                                </td>

                                            </tr>

                                        )

                                        :

                                        (

                                            employees.map(employee => (

                                                <tr

                                                    key={employee.employee_id}

                                                >

                                                    <td>

                                                        {employee.employee_name}

                                                    </td>

                                                    <td>

                                                        {employee.total_skills}

                                                    </td>

                                                    <td>

                                                        {

                                                            employee.primary_skills

                                                                ?.length > 0

                                                                ?

                                                                employee.primary_skills.join(", ")

                                                                :

                                                                "-"

                                                        }

                                                    </td>

                                                    <td>

                                                        {employee.total_certifications}

                                                    </td>

                                                    <td>

                                                        {employee.active_certifications}

                                                    </td>

                                                    <td>

                                                        <span

                                                            style={{

                                                                background:

                                                                    employee.profile_completion >= 80

                                                                        ? "#28a745"

                                                                        : employee.profile_completion >= 50

                                                                        ? "#ffc107"

                                                                        : "#dc3545",

                                                                color: "#fff",

                                                                padding: "4px 10px",

                                                                borderRadius: "15px",

                                                                fontSize: "12px"

                                                            }}

                                                        >

                                                            {

                                                                employee.profile_completion

                                                            }%

                                                        </span>

                                                    </td>

                                                    <td>

                                                        <button

                                                            onClick={() =>

                                                                handleViewProfile(

                                                                    employee.employee_id

                                                                )

                                                            }

                                                        >

                                                            View Profile

                                                        </button>

                                                    </td>

                                                </tr>

                                            ))

                                        )

                                    }

                                </tbody>

                            </table>

                        )

                    }

                </div>

                {/* ==========================
                    EMPLOYEE COMPETENCY PROFILE
                ========================== */}

                {
                    selectedEmployee && (
                
                        <CompetencyProfileCard
                
                            employee={selectedEmployee}
                
                            onClose={() => setSelectedEmployee(null)}
                
                        />
                
                    )
                }

            </div>

        </DashboardLayout>

    );

}

export default EmployeeCompetency;