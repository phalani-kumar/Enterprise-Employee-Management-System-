function CompetencyProfileCard({ employee, onClose }) {

    if (!employee) return null;

    return (

        <div
            style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "8px",
                marginTop: "20px"
            }}
        >

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >

                <h3>

                    Employee Competency Profile

                </h3>

                <button onClick={onClose}>

                    Close

                </button>

            </div>

            <hr />

            <p><strong>Name :</strong> {employee.employee_name}</p>

            <p><strong>Total Skills :</strong> {employee.total_skills}</p>

            <p>

                <strong>Primary Skills :</strong>{" "}

                {

                    employee.primary_skills?.join(", ") ||

                    "-"

                }

            </p>

            <p>

                <strong>Total Certifications :</strong>{" "}

                {employee.total_certifications}

            </p>

            <p>

                <strong>Active Certifications :</strong>{" "}

                {employee.active_certifications}

            </p>

            <p>

                <strong>Profile Completion :</strong>{" "}

                {employee.profile_completion}%

            </p>

            <hr />

            <h4>Skills</h4>

            <table className="employee-table">

                <thead>

                    <tr>

                        <th>Skill</th>

                        <th>Level</th>

                        <th>Experience</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        employee.skills?.map(skill => (

                            <tr key={skill.id}>

                                <td>{skill.skill_name}</td>

                                <td>{skill.proficiency_level}</td>

                                <td>{skill.years_of_experience} Years</td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

            <br />

            <h4>Certifications</h4>

            <table className="employee-table">

                <thead>

                    <tr>

                        <th>Name</th>

                        <th>Organization</th>

                        <th>Issue Date</th>

                        <th>Expiry Date</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        employee.certifications?.map(cert => (

                            <tr key={cert.id}>

                                <td>{cert.certification_name}</td>

                                <td>{cert.issuing_organization}</td>

                                <td>{cert.issue_date}</td>

                                <td>{cert.expiry_date || "-"}</td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default CompetencyProfileCard;