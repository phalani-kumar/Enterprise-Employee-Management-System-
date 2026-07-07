import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import {
    getCompanyDevices,
    revokeSession,
    searchDevices,
    filterDevices
} from "../../services/loginDeviceService";

function DeviceMonitoring() {

    const currentUser = JSON.parse(
        localStorage.getItem("authUser")
    );

    const [devices, setDevices] = useState([]);

    const [search, setSearch] = useState("");

    const [browser, setBrowser] = useState("");
    
    const [status, setStatus] = useState("");
    
    const [loginDate, setLoginDate] = useState("");
    
    const [selected, setSelected] = useState([]);

    const loadDevices = async () => {

        const data = await getCompanyDevices(
            currentUser.company_id
        );

        setDevices(data);

    };

    const handleSearch = async () => {

        if (search.trim() === "") {
    
            loadDevices();
    
            return;
    
        }
    
        const response = await searchDevices(
    
            currentUser.company_id,
    
            search
    
        );
    
        setDevices(response.data);
    
    };

    const applyFilter = async () => {

        const response = await filterDevices(
    
            currentUser.company_id,
    
            browser,
    
            status
    
        );
    
        let filtered = response.data;
    
        if (loginDate) {
    
            filtered = filtered.filter(device =>
    
                device.login_time.startsWith(loginDate)
    
            );
    
        }
    
        setDevices(filtered);
    
    };

    useEffect(() => {

        loadDevices();

    }, []);

    return (

        <DashboardLayout>

            <h2>Device Monitoring</h2>

            <button

                    onClick={async () => {
            
                        for (const id of selected) {
            
                            await revokeSession(id);
            
                        }
            
                        setSelected([]);
            
                        loadDevices();
            
                    }}
            >
                 Force Logout Selected

            </button>
       
            
            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "20px",
                    flexWrap: "wrap"
                }}
            >
            
                <input
            
                    type="text"
            
                    placeholder="Search User"
            
                    value={search}
            
                    onChange={(e) =>
            
                        setSearch(e.target.value)
            
                    }
            
                />
            
                <button
            
                    onClick={handleSearch}
            
                >
            
                    Search
            
                </button>
            
                <select
            
                    value={browser}
            
                    onChange={(e) =>
            
                        setBrowser(e.target.value)
            
                    }
            
                >
            
                    <option value="">
            
                        All Browsers
            
                    </option>
            
                    <option value="Chrome">
            
                        Chrome
            
                    </option>
            
                    <option value="Firefox">
            
                        Firefox
            
                    </option>
            
                    <option value="Edge">
            
                        Edge
            
                    </option>
            
                </select>
            
                <select
            
                    value={status}
            
                    onChange={(e) =>
            
                        setStatus(e.target.value)
            
                    }
            
                >
            
                    <option value="">
            
                        All Status
            
                    </option>
            
                    <option value="Active">
            
                        Active
            
                    </option>
            
                    <option value="Logged Out">
            
                        Logged Out
            
                    </option>
            
                    <option value="Revoked">
            
                        Revoked
            
                    </option>
            
                    <option value="Expired">
            
                        Expired
            
                    </option>
            
                </select>
            
                <input
            
                    type="date"
            
                    value={loginDate}
            
                    onChange={(e) =>
            
                        setLoginDate(e.target.value)
            
                    }
            
                />
            
                <button
            
                    onClick={applyFilter}
            
                >
            
                    Apply Filter
            
                </button>
            
            </div>

            <table className="employee-table">

                <thead>

                    <tr>

                        <th>Select</th>
                        <th>User</th>
                        <th>Device</th>
                        <th>Browser</th>
                        <th>IP</th>
                        <th>Status</th>
                        <th>Login Time</th>
                        <th>Last Activity</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        devices.map(device => (

                            <tr key={device.session_id}>

                                <td>
                            
                                    <input
                            
                                        type="checkbox"
                            
                                        checked={selected.includes(device.session_id)}
                            
                                        onChange={(e) => {
                            
                                            if (e.target.checked) {
                            
                                                setSelected([
                            
                                                    ...selected,
                            
                                                    device.session_id
                            
                                                ]);
                            
                                            }
                            
                                            else {
                            
                                                setSelected(
                            
                                                    selected.filter(
                            
                                                        id =>
                            
                                                        id !== device.session_id
                            
                                                    )
                            
                                                );
                            
                                            }
                            
                                        }}
                            
                                    />
                            
                                </td>

                                <td>{device.user_name}</td>

                                <td>

                                    {device.device_name}
                                
                                    {
                                
                                        device.trusted &&
                                
                                        <span
                                            style={{
                                                color: "green",
                                                marginLeft: "5px"
                                            }}
                                        >
                                
                                            ⭐ Trusted
                                
                                        </span>
                                
                                    }
                                
                                </td>

                                <td>{device.browser}</td>

                                <td>{device.ip_address}</td>

                                <td>{device.status}</td>

                                <td>{device.login_time}</td>

                                <td>{device.last_activity}</td>

                                <td>

                                    {
                                
                                        device.termination_reason ||
                                
                                        "-"
                                
                                    }
                                
                                </td>

                                <td>

                                    {

                                        device.status === "Active" &&

                                        <button

                                            onClick={async () => {

                                                await revokeSession(device.session_id);

                                                loadDevices();

                                            }}

                                        >

                                            Force Logout

                                        </button>

                                    }

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </DashboardLayout>

    );

}

export default DeviceMonitoring;