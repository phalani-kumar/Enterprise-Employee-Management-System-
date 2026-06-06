import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import DashboardLayout from
"../../components/layout/DashboardLayout";


function Companies() {

  const [companies,
    setCompanies] =
    useState([]);

  useEffect(() => {

    fetchCompanies();

  }, []);

  const fetchCompanies =
    async () => {

      const response =
        await axios.get(
          "http://127.0.0.1:8000/companies"
        );

      setCompanies(
        response.data
      );
    };

  return (

    <DashboardLayout>

      <div className="companies-page">

        <h1>
          Companies
        </h1>

        <table>

          <thead>

            <tr>

              <th>ID</th>
              <th>Company Name</th>
              <th>Location</th>
              <th>Total Employees</th>
              <th>Total Users</th>
              <th>Admin Email</th>

            </tr>

          </thead>

          <tbody>

            {companies.map(
              (company) => (

                <tr
                  key={company.id}
                >

                  <td>
                    {company.id}
                  </td>

                  <td>
                    {company.name}
                  </td>

                  <td>
                    {company.location}
                  </td>

                  <td>
                    {company.total_employees}
                  </td>

                  <td>
                    {company.total_users}
                  </td>

                  <td>
                    {company.admin_email}
                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
}

export default Companies;
