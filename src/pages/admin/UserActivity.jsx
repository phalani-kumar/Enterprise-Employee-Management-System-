import {
  useEffect,
  useState
}
from "react";

import DashboardLayout
from "../../components/layout/DashboardLayout";

import {
  getActivity
}
from "../../services/activityService";

function UserActivity() {

  const [activity,
    setActivity] =
    useState([]);

  useEffect(() => {

    const currentUser =
    JSON.parse(
      localStorage.getItem(
        "authUser"
      )
    );

    loadActivity(
      currentUser.company_id
    );

  }, []);

  const loadActivity =
  async (companyId) => {

    try {

  const response =
    await getActivity(
      companyId
    );

  setActivity(
    response.data || []
  );

} catch (error) {

  console.log(error);

}
  };

  return (

    <DashboardLayout>

      <h1>
        User Activity
      </h1>

      <table
        className="employee-table"
      >

        <thead>

          <tr>

            <th>Name</th>

            <th>Email</th>

            <th>Last Login</th>

            <th>Last Logout</th>

            <th>Browser</th>

            <th>IP Address</th>

          </tr>

        </thead>

        <tbody>

          {activity.map(
            (item,index) => (

              <tr key={index}>

                <td>
                  {item.user_name}
                </td>

                <td>
                  {item.email}
                </td>

                <td>
                  {item.last_login}
                </td>

                <td>
                  {item.last_logout}
                </td>

                <td>
                  {item.browser}
                </td>

                <td>
                  {item.ip_address}
                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </DashboardLayout>
  );
}

export default UserActivity;