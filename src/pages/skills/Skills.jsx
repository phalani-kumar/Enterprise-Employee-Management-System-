import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";

import {
    getSkills,
    addSkill,
    updateSkill,
    deleteSkill
} from "../../services/skillsService";

function Skills() {

    const currentUser = JSON.parse(
        localStorage.getItem("authUser")
    );

    const [skills, setSkills] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const [formData, setFormData] = useState({

        employee_id: currentUser.id,

        company_id: currentUser.company_id,

        skill_name: "",

        proficiency_level: "Beginner",

        years_of_experience: 0,

        primary_skill: false

    });

    // ==========================
    // LOAD SKILLS
    // ==========================

    const loadSkills = async () => {

        try {

            setLoading(true);

            const data = await getSkills(
                currentUser.id
            );

            setSkills(data);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadSkills();

    }, []);

    // ==========================
    // HANDLE INPUT
    // ==========================

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormData({

            ...formData,

            [name]:
                type === "checkbox"
                    ? checked
                    : value

        });

    };

    // ==========================
    // RESET FORM
    // ==========================

    const resetForm = () => {

        setEditingId(null);

        setFormData({

            employee_id: currentUser.id,

            company_id: currentUser.company_id,

            skill_name: "",

            proficiency_level: "Beginner",

            years_of_experience: 0,

            primary_skill: false

        });

    };

    // ==========================
    // EDIT SKILL
    // ==========================

    const handleEdit = (skill) => {

        setEditingId(skill.id);

        setFormData({

            employee_id: skill.employee_id,

            company_id: skill.company_id,

            skill_name: skill.skill_name,

            proficiency_level: skill.proficiency_level,

            years_of_experience:
                skill.years_of_experience,

            primary_skill:
                skill.primary_skill

        });

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    };

    // ==========================
    // DELETE SKILL
    // ==========================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(

            "Delete this skill?"

        );

        if (!confirmDelete) return;

        try {

            await deleteSkill(id);

            setMessage("Skill Deleted Successfully");

            loadSkills();

        }

        catch (error) {

            console.log(error);

        }

    };

    // ==========================
    // SAVE SKILL
    // ==========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editingId) {

                await updateSkill(

                    editingId,

                    formData

                );

                setMessage(

                    "Skill Updated Successfully"

                );

            }

            else {

                await addSkill(formData);

                setMessage(

                    "Skill Added Successfully"

                );

            }

            resetForm();

            loadSkills();

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
    
                    <h2>Skills & Certifications</h2>
    
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
    
                                    ? "Edit Skill"
    
                                    : "Add New Skill"
    
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
    
                                    Skill Name
    
                                </label>
    
                                <input
    
                                    type="text"
    
                                    name="skill_name"
    
                                    value={formData.skill_name}
    
                                    onChange={handleChange}
    
                                    required
    
                                    className="form-control"
    
                                />
    
                            </div>
    
                            <div>
    
                                <label>
    
                                    Proficiency Level
    
                                </label>
    
                                <select
    
                                    name="proficiency_level"
    
                                    value={formData.proficiency_level}
    
                                    onChange={handleChange}
    
                                    className="form-control"
    
                                >
    
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
    
                            <div>
    
                                <label>
    
                                    Years of Experience
    
                                </label>
    
                                <input
    
                                    type="number"
    
                                    name="years_of_experience"
    
                                    min="0"
    
                                    value={formData.years_of_experience}
    
                                    onChange={handleChange}
    
                                    className="form-control"
    
                                />
    
                            </div>
    
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginTop: "28px"
                                }}
                            >
    
                                <input
    
                                    type="checkbox"
    
                                    name="primary_skill"
    
                                    checked={formData.primary_skill}
    
                                    onChange={handleChange}
    
                                />
    
                                <label
                                    style={{
                                        marginLeft: "10px"
                                    }}
                                >
    
                                    Primary Skill
    
                                </label>
    
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
    
                                        ? "Update Skill"
    
                                        : "Add Skill"
    
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
                SKILLS TABLE
            =========================== */}

            <div
                style={{
                    background: "#ffffff",
                    padding: "20px",
                    borderRadius: "8px"
                }}
            >

                <h3>My Skills</h3>

                {

                    loading ?

                    (

                        <p>

                            Loading Skills...

                        </p>

                    )

                    :

                    (

                        <table className="employee-table">

                            <thead>

                                <tr>

                                    <th>Skill</th>

                                    <th>Level</th>

                                    <th>Experience</th>

                                    <th>Primary</th>

                                    <th>Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    skills.length === 0 ?

                                    (

                                        <tr>

                                            <td
                                                colSpan="5"
                                                style={{
                                                    textAlign: "center"
                                                }}
                                            >

                                                No Skills Added

                                            </td>

                                        </tr>

                                    )

                                    :

                                    (

                                        skills.map(skill => (

                                            <tr
                                                key={skill.id}
                                            >

                                                <td>

                                                    {skill.skill_name}

                                                </td>

                                                <td>

                                                    {skill.proficiency_level}

                                                </td>

                                                <td>

                                                    {skill.years_of_experience} Years

                                                </td>

                                                <td>

                                                    {

                                                        skill.primary_skill ?

                                                        (

                                                            <span
                                                                style={{
                                                                    background: "#28a745",
                                                                    color: "#fff",
                                                                    padding: "4px 10px",
                                                                    borderRadius: "15px",
                                                                    fontSize: "12px"
                                                                }}
                                                            >

                                                                ⭐ Primary

                                                            </span>

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

                                                            handleEdit(skill)

                                                        }

                                                        style={{

                                                            marginRight: "8px"

                                                        }}

                                                    >

                                                        Edit

                                                    </button>

                                                    <button

                                                        onClick={() =>

                                                            handleDelete(skill.id)

                                                        }

                                                    >

                                                        Delete

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

        </div>   

        </DashboardLayout>

    );

}

export default Skills;