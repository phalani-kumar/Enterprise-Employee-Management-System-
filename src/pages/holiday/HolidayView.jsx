import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import { getHolidays } from "../../services/holidayService";

// import "./HolidayView.css";

function HolidayView() {

    const currentUser = JSON.parse(

        localStorage.getItem("authUser")

    );

    const companyId = currentUser.company_id;

    const [holidays, setHolidays] = useState([]);

    const [search, setSearch] = useState("");

    const [monthFilter, setMonthFilter] = useState("");
    
    const [yearFilter, setYearFilter] = useState("");
    
    const [typeFilter, setTypeFilter] = useState("");

    useEffect(() => {

        loadHolidays();

    }, []);

    const loadHolidays = async () => {

        try {

            const data = await getHolidays(companyId);

            setHolidays(data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const today = new Date();

    const filteredHolidays = holidays.filter((holiday) => {

        const holidayDate = new Date(holiday.holiday_date);
    
        const holidayMonth = holidayDate.getMonth() + 1;
    
        const holidayYear = holidayDate.getFullYear();
    
        const matchesSearch =
    
            holiday.holiday_name
    
                .toLowerCase()
    
                .includes(search.toLowerCase());
    
        const matchesMonth =
    
            monthFilter === "" ||
    
            holidayMonth === Number(monthFilter);
    
        const matchesYear =
    
            yearFilter === "" ||
    
            holidayYear === Number(yearFilter);
    
        const matchesType =
    
            typeFilter === "" ||
    
            holiday.holiday_type === typeFilter;
    
        return (
    
            matchesSearch &&
    
            matchesMonth &&
    
            matchesYear &&
    
            matchesType
    
        );
    
    });
    
    const upcomingHolidays = filteredHolidays.filter(
    
        holiday =>
    
            new Date(holiday.holiday_date) >= today
    
    );
    
    const pastHolidays = filteredHolidays.filter(
    
        holiday =>
    
            new Date(holiday.holiday_date) < today
    
    );

    return (

        <DashboardLayout>

            <div className="holiday-view-container">

                <h2>

                    Company Holidays

                </h2>

                {/* Upcoming Holidays */}

                <div className="holiday-section">

                    <div className="holiday-filters">

                        <input
                    
                            type="text"
                    
                            placeholder="Search Holiday"
                    
                            value={search}
                    
                            onChange={(e)=>
                    
                                setSearch(e.target.value)
                    
                            }
                    
                        />
                    
                        <select
                    
                            value={monthFilter}
                    
                            onChange={(e)=>
                    
                                setMonthFilter(e.target.value)
                    
                            }
                    
                        >
                    
                            <option value="">
                    
                                All Months
                    
                            </option>
                    
                            <option value="1">January</option>
                    
                            <option value="2">February</option>
                    
                            <option value="3">March</option>
                    
                            <option value="4">April</option>
                    
                            <option value="5">May</option>
                    
                            <option value="6">June</option>
                    
                            <option value="7">July</option>
                    
                            <option value="8">August</option>
                    
                            <option value="9">September</option>
                    
                            <option value="10">October</option>
                    
                            <option value="11">November</option>
                    
                            <option value="12">December</option>
                    
                        </select>
                    
                        <select
                    
                            value={yearFilter}
                    
                            onChange={(e)=>
                    
                                setYearFilter(e.target.value)
                    
                            }
                    
                        >
                    
                            <option value="">
                    
                                All Years
                    
                            </option>
                    
                            <option value="2025">2025</option>
                    
                            <option value="2026">2026</option>
                    
                            <option value="2027">2027</option>
                    
                            <option value="2028">2028</option>
                    
                            <option value="2029">2029</option>
                    
                            <option value="2030">2030</option>
                    
                        </select>
                    
                        <select
                    
                            value={typeFilter}
                    
                            onChange={(e)=>
                    
                                setTypeFilter(e.target.value)
                    
                            }
                    
                        >
                    
                            <option value="">
                    
                                All Types
                    
                            </option>
                    
                            <option value="Public Holiday">
                    
                                Public Holiday
                    
                            </option>
                    
                            <option value="Company Holiday">
                    
                                Company Holiday
                    
                            </option>
                    
                            <option value="Optional Holiday">
                    
                                Optional Holiday
                    
                            </option>
                    
                        </select>
                    
                    </div>

                    <h3>

                        Upcoming Holidays

                    </h3>

                    {

                        upcomingHolidays.length === 0 ?

                        (

                            <p>

                                No Upcoming Holidays

                            </p>

                        )

                        :

                        (

                            <table className="holiday-view-table">

                                <thead>

                                    <tr>

                                        <th>Name</th>

                                        <th>Date</th>

                                        <th>Type</th>

                                        <th>Recurring</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        upcomingHolidays.map(

                                            holiday => (

                                                <tr key={holiday.id}>

                                                    <td>

                                                        {holiday.holiday_name}

                                                    </td>

                                                    <td>

                                                        {holiday.holiday_date}

                                                    </td>

                                                    <td>

                                                        {holiday.holiday_type}

                                                    </td>

                                                    <td>

                                                        {

                                                            holiday.recurring ?

                                                            <span className="recurring-badge">

                                                                🔁 Recurring

                                                            </span>

                                                            :

                                                            "-"

                                                        }

                                                    </td>

                                                </tr>

                                            )

                                        )

                                    }

                                </tbody>

                            </table>

                        )

                    }

                </div>

                {/* Past Holidays */}

                <div className="holiday-section">

                    <h3>

                        Past Holidays

                    </h3>

                    {

                        pastHolidays.length === 0 ?

                        (

                            <p>

                                No Past Holidays

                            </p>

                        )

                        :

                        (

                            <table className="holiday-view-table">

                                <thead>

                                    <tr>

                                        <th>Name</th>

                                        <th>Date</th>

                                        <th>Type</th>

                                        <th>Recurring</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        pastHolidays.map(

                                            holiday => (

                                                <tr key={holiday.id}>

                                                    <td>

                                                        {holiday.holiday_name}

                                                    </td>

                                                    <td>

                                                        {holiday.holiday_date}

                                                    </td>

                                                    <td>

                                                        {holiday.holiday_type}

                                                    </td>

                                                    <td>

                                                        {

                                                            holiday.recurring ?

                                                            <span className="recurring-badge">

                                                                🔁 Recurring

                                                            </span>

                                                            :

                                                            "-"

                                                        }

                                                    </td>

                                                </tr>

                                            )

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

export default HolidayView;