import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import {

    getUserDevices,

    renameDevice,

    removeDevice,

    logoutDevice,

    logoutAllDevices

}

from "../../services/loginDeviceService";

function LoginDevices() {

    const currentUser = JSON.parse(

        localStorage.getItem("authUser")

    );

    console.log("Current User:", currentUser);

    const sessionId = localStorage.getItem(

        "session_id"

    );

    console.log("Current Session:", sessionId);

    const [devices, setDevices] = useState([]);

    const loadDevices = async () => {

        try {
    
            const data = await getUserDevices(
    
                currentUser.company_id,
    
                currentUser.id
    
            );
    
            console.log("Devices:", data);
    
            setDevices(data);
    
        }
    
        catch(error){
    
            console.log(error.response);
    
        }
    
    };
    useEffect(() => {

        loadDevices();

    }, []);

    const handleRename = async (device) => {

        const name = prompt(

            "Rename Device",

            device.device_name

        );

        if (!name) return;

        await renameDevice(

            device.session_id,

            currentUser.id,

            name

        );

        loadDevices();

    };

    const handleRemove = async (device) => {

        console.log({
            sessionId,
            deviceSession: device.session_id,
            userId: currentUser.id
        });

    try {

        await removeDevice(

            device.session_id,

            currentUser.id,

            sessionId

        );

        loadDevices();

    } catch (error) {

        console.log(error.response);

        alert(error.response?.data?.message);

    }

};

    const handleLogout = async (device) => {

    try {

        await logoutDevice(

            device.session_id,

            currentUser.id

        );

        loadDevices();

    } catch (error) {

        console.log(error.response);

        alert(error.response?.data?.message);

    }

};

    const handleLogoutAll = async () => {

        await logoutAllDevices(

            currentUser.id,

            sessionId

        );

        loadDevices();

    };

    return (

        <DashboardLayout>

            <h1>

                Login Devices

            </h1>

            <button

                onClick={handleLogoutAll}

            >

                Logout All Except Current

            </button>

            <table className="device-table">

                <thead>

                    <tr>

                        <th>Device</th>

                        <th>Browser</th>

                        <th>IP</th>

                        <th>Status</th>

                        <th>Trusted</th>

                        <th>Login</th>

                        <th>Last Activity</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        devices.map((device)=>(

                            <tr

                                key={device.session_id}

                            >

                                <td>

                                    {device.device_name}

                                </td>

                                <td>

                                    {device.browser}

                                </td>

                                <td>

                                    {device.ip_address}

                                </td>

                                <td>

                                    {device.status}

                                </td>

                                <td>

                                    {

                                        device.trusted

                                            ? "Yes"

                                            : "No"

                                    }

                                </td>

                                <td>

                                    {device.login_time}

                                </td>

                                <td>

                                    {device.last_activity}

                                </td>

                                <td>

                                    {

                                        device.trusted && (

                                            <button

                                                onClick={()=>

                                                    handleRename(device)

                                                }

                                            >

                                                Rename

                                            </button>

                                        )

                                    }

                                    <button

                                        onClick={()=>

                                            handleRemove(device)

                                        }

                                    >

                                        Remove

                                    </button>

                                    {

                                        device.status==="Active" && (

                                            <button

                                                onClick={()=>

                                                    handleLogout(device)

                                                }

                                            >

                                                Logout

                                            </button>

                                        )

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

export default LoginDevices;