import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import { Navigate } from "react-router-dom";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import {

getHolidays,

createHoliday,

updateHoliday,

deleteHoliday

}

from "../../services/holidayService";

// import "./HolidayCalendar.css";

function HolidayCalendar() {

    const currentUser = JSON.parse(
        localStorage.getItem("authUser")
    );

    if(currentUser?.role !== "Admin"){

    return <Navigate to="/holiday-view" />;

    }

    const isAdmin = currentUser?.role === "Admin";

    const companyId = currentUser.company_id;

    const [holidays, setHolidays] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [holiday, setHoliday] = useState({

        holiday_name: "",

        holiday_date: "",

        description: "",

        holiday_type: "Company Holiday",

        recurring: false

    });

    const [selectedDate, setSelectedDate] = useState(new Date());

    const loadHolidays = async () => {

        const data = await getHolidays(companyId);

        setHolidays(data);
    };

    useEffect(() => {

        loadHolidays();

    }, []);

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setHoliday({

            ...holiday,

            [name]:

                type === "checkbox"

                    ? checked

                    : value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const payload = {

            ...holiday,

            company_id: companyId,

             created_by: currentUser.name

        };

        if (editingId) {

            const response = await updateHoliday(
        
                editingId,
        
                payload
        
            );
        
            if (!response.success) {
        
                alert(response.message);
        
                return;
        
            }
        
        }
        
        else {
        
            const response = await createHoliday(payload);
        
            if (!response.success) {
        
                alert(response.message);
        
                return;
        
            }
        
        }

        setEditingId(null);

        setHoliday({

            holiday_name: "",

            holiday_date: "",

            description: "",

            holiday_type: "Company Holiday",

            recurring: false

        });

        loadHolidays();
    };

    const handleEdit = (item) => {

        setEditingId(item.id);

        setHoliday(item);
    };

    const handleDelete = async (id) => {

        await deleteHoliday(id);

        loadHolidays();
    };

    const isHoliday = (date) => {
    const formatted = date.toISOString().split("T")[0];

    return holidays.some((holiday) => {
        if (holiday.recurring) {
            const holidayDate = new Date(holiday.holiday_date);

            return (
                holidayDate.getDate() === date.getDate() &&
                holidayDate.getMonth() === date.getMonth()
            );
        }

        return holiday.holiday_date === formatted;
    });
};

    return (

        <DashboardLayout>

            <div className="holiday-container">

                <h2>

                    Holiday Calendar

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="holiday-form"
                >

                    <input

                        type="text"

                        name="holiday_name"

                        placeholder="Holiday Name"

                        value={holiday.holiday_name}

                        onChange={handleChange}

                        required

                    />

                    <input

                        type="date"

                        name="holiday_date"

                        value={holiday.holiday_date}

                        onChange={handleChange}

                        required

                    />

                    <textarea

                        name="description"

                        placeholder="Description"

                        value={holiday.description}

                        onChange={handleChange}

                    />

                    <select

                        name="holiday_type"

                        value={holiday.holiday_type}

                        onChange={handleChange}

                    >

                        <option>

                            Company Holiday

                        </option>

                        <option>

                            Public Holiday

                        </option>

                        <option>

                            Optional Holiday

                        </option>

                    </select>

                    <label>

                        <input

                            type="checkbox"

                            name="recurring"

                            checked={holiday.recurring}

                            onChange={handleChange}

                        />

                        Recurring Every Year

                    </label>

                    {
                    isAdmin && (

                    <button>

                        {

                            editingId

                                ? "Update Holiday"

                                : "Add Holiday"

                        }
 
                    </button>

                    )
                    }

                </form>

                <table className="holiday-table">

                    <thead>

                        <tr>

                            <th>Name</th>

                            <th>Date</th>

                            <th>Type</th>

                            <th>Recurring</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            holidays.map(item => (

                                <tr key={item.id}>

                                    <td>

                                        {item.holiday_name}

                                    </td>

                                    <td>

                                        {item.holiday_date}

                                    </td>

                                    <td>

                                        {item.holiday_type}

                                    </td>

                                    <td>

                                        {

                                            item.recurring

                                                ? "Yes"

                                                : "No"

                                        }

                                    </td>

                                    {
                                    isAdmin && (

                                    <td>

                                        <button

                                            onClick={() =>

                                                handleEdit(item)

                                            }

                                        >

                                            Edit

                                        </button>

                                        <button

                                            onClick={() =>

                                                handleDelete(item.id)

                                            }

                                        >

                                            Delete

                                        </button>

                                    </td>

                                    )
                                    }

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

                <h3 style={{ marginTop: "30px" }}>
                    Holiday Calendar
                </h3>
                
                <Calendar
                    value={selectedDate}
                    onChange={setSelectedDate}
                    tileClassName={({ date }) =>
                        isHoliday(date)
                            ? "holiday-date"
                            : null
                    }
                />

            </div>

        </DashboardLayout>

    );

}

export default HolidayCalendar;