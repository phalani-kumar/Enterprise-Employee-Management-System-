// import {
//   useEffect,
//   useState,
// } from "react";

// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
// } from "recharts";

// import {
//   FaUsers,
//   FaUserCheck,
//   FaBuilding,
//   FaClipboardCheck,
// } from "react-icons/fa";

// import DashboardLayout from "../../components/layout/DashboardLayout";

// import {
//   getEmployees,
// } from "../../services/employeeService";

// function Dashboard() {

//   const [employees,
//     setEmployees] =
//     useState([]);

//   useEffect(() => {

//     fetchEmployees();

//   }, []);

//   const fetchEmployees =
//     async () => {

//       try {

//         const localEmployees =
//           localStorage.getItem(
//             "employees"
//           );

//         if (localEmployees) {

//           setEmployees(
//             JSON.parse(
//               localEmployees
//             )
//           );

//         } else {

//           const data =
//             await getEmployees();

//           setEmployees(data);
//         }

//       } catch (error) {

//         console.log(error);
//       }
//     };

//   /* ACTIVE */

//   const activeEmployees =
//     employees.filter(
//       (employee) =>
//         employee.status ===
//         "Active"
//     ).length;

//   /* DEPARTMENTS */

//   const departments =
//     [...new Set(
//       employees.map(
//         (employee) =>
//           employee.department
//       )
//     )];

//   /* ATTENDANCE */

//   const attendance =
//     Math.floor(
//       (activeEmployees /
//         employees.length) *
//         100 || 0
//     );

//   /* GRAPH DATA */

//   const chartData =
//     departments.map(
//       (department) => ({

//         department,

//         employees:
//           employees.filter(
//             (employee) =>
//               employee.department ===
//               department
//           ).length,
//       })
//     );

//   return (

//     <DashboardLayout>

//       <div className="dashboard-wrapper">

//         {/* HEADER */}

//         <div className="dashboard-header">

//           <div>

//             <h1>
//               Dashboard Page
//             </h1>

//             <p>
//               Welcome
//             </p>

//           </div>

//         </div>

//         {/* STATS */}

//         <div className="stats-grid">

//           {/* TOTAL */}

//           <div className="stat-card">

//             <div className="stat-icon blue">

//               <FaUsers />

//             </div>

//             <div>

//               <h2>
//                 {employees.length}
//               </h2>

//               <p>
//                 Total Employees
//               </p>

//             </div>

//           </div>

//           {/* ACTIVE */}

//           <div className="stat-card">

//             <div className="stat-icon green">

//               <FaUserCheck />

//             </div>

//             <div>

//               <h2>
//                 {activeEmployees}
//               </h2>

//               <p>
//                 Active Employees
//               </p>

//             </div>

//           </div>

//           {/* DEPARTMENTS */}

//           <div className="stat-card">

//             <div className="stat-icon purple">

//               <FaBuilding />

//             </div>

//             <div>

//               <h2>
//                 {departments.length}
//               </h2>

//               <p>
//                 Departments
//               </p>

//             </div>

//           </div>

//           {/* ATTENDANCE */}

//           <div className="stat-card">

//             <div className="stat-icon orange">

//               <FaClipboardCheck />

//             </div>

//             <div>

//               <h2>
//                 {attendance}%
//               </h2>

//               <p>
//                 Attendance
//               </p>

//             </div>

//           </div>

//         </div>

//         {/* GRAPH + RECENT */}

//         <div className="dashboard-content">

//           {/* GRAPH */}

//           <div className="chart-section">

//             <div className="section-header">

//               <h2>
//                 Employee Overview
//               </h2>

//             </div>

//             <div className="chart-container">

//               <ResponsiveContainer
//                 width="100%"
//                 height={300}
//               >

//                 <LineChart
//                   data={chartData}
//                 >

//                   <CartesianGrid
//                     strokeDasharray="3 3"
//                   />

//                   <XAxis
//                     dataKey="department"
//                   />

//                   <YAxis />

//                   <Tooltip />

//                   <Line
//                     type="monotone"
//                     dataKey="employees"
//                     stroke="#2563eb"
//                     strokeWidth={3}
//                   />

//                 </LineChart>

//               </ResponsiveContainer>

//             </div>

//           </div>

//           {/* RECENT EMPLOYEES */}

//           <div className="employee-section">

//             <div className="section-header">

//               <h2>
//                 Recent Employees
//               </h2>

//             </div>

//             {employees
//               .slice(0, 5)
//               .map((employee) => (

//               <div
//                 className="employee-item"
//                 key={employee.id}
//               >

//                 <div>

//                   <h4>
//                     {employee.name}
//                   </h4>

//                   <p>
//                     {employee.role}
//                   </p>

//                 </div>

//                 <span
//                   className={
//                     employee.status ===
//                     "Active"
//                       ? "status active"
//                       : "status inactive"
//                   }
//                 >
//                   {employee.status}
//                 </span>

//               </div>
//             ))}

//           </div>

//         </div>

//         <div className="extra-sections">
//           <div className="palette-card">
//             <h3>Color Palette</h3>

//             <div className="colors">
//               <div className="color blue-bg"></div>
//               <div className="color dark-bg"></div>
//               <div className="color light-bg"></div>
//               <div className="color green-bg"></div>
//               <div className="color orange-bg"></div>
//               <div className="color red-bg"></div>
//             </div>
//           </div>

//           <div className="guideline-card">
//             <h3>UI/UX Guidelines</h3>

//             <div className="guidelines">
//               <div>Responsive Layout</div>
//               <div>Modern UI</div>
//               <div>Reusable Components</div>
//               <div>Clean Typography</div>
//             </div>
//           </div>
//         </div>
//       </div>

//     </DashboardLayout>
//   );
// }

// export default Dashboard;

import {
  useEffect,
  useState,
} from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import {
  FaUsers,
  FaUserCheck,
  FaBuilding,
  FaClipboardCheck,
} from "react-icons/fa";

import DashboardLayout from "../../components/layout/DashboardLayout";

import {
  getEmployees
} from "../../services/employeeService";

import {

    getProfileCompletion

} from "../../services/authService";

function Dashboard() {

  const [pendingRequests,
  setPendingRequests] =
  useState(0);

  const [employees,
    setEmployees] =
    useState([]);

  const [users, setUsers] =
  useState([]); 
  
  const [

    completionUsers,

    setCompletionUsers

  ] = useState([]);

const [

    threshold,

    setThreshold

  ] = useState(80);

useEffect(() => {

  fetchEmployees();

  fetchPendingRequests();

  fetchUsers();

  fetchCompletion();

}, []);

  const fetchEmployees =
    async () => {

      try {

          const data =
            await getEmployees();

          setEmployees(data);

      } catch (error) {

        console.log(error);
      }
    };


  const fetchUsers =
  async () => {

    try {

      const response =
        await fetch(
          "http://127.0.0.1:8000/users"
        );

      const data =
        await response.json();

      setUsers(data);

    } catch (error) {

      console.log(error);
    }
  };

  const fetchCompletion = async () => {

    const data = await getProfileCompletion();

    console.log(data);

    setCompletionUsers(data);

};

  const fetchPendingRequests =
  async () => {

    try {

      
      const currentUser =
  JSON.parse(
    localStorage.getItem("authUser")
  );
  const response =
   await fetch(
  `http://127.0.0.1:8000/role-request/${currentUser.company_id}`
);

      const data =
        await response.json();

      const pending =
        data.filter(
          (request) =>
            request.status ===
            "Pending"
        );

      setPendingRequests(
        pending.length
      );

    } catch (error) {

      console.log(error);

    }
  };  

  /* ACTIVE */

  const activeEmployees =
    employees.filter(
      (employee) =>
        employee.status ===
        "Active"
    ).length;

  /* DEPARTMENTS */

  const departments =
    [...new Set(
      employees.map(
        (employee) =>
          employee.department
      )
    )];

  /* ATTENDANCE */

  const attendance =
    Math.floor(
      (activeEmployees /
        employees.length) *
        100 || 0
    );

  /* GRAPH DATA */

  const chartData =
    departments.map(
      (department) => ({

        department,

        employees:
          employees.filter(
            (employee) =>
              employee.department ===
              department
          ).length,
      })
    );

    const COLORS = [

  "#2563eb",

  "#16a34a",

  "#f59e0b",

  "#dc2626",

  "#8b5cf6",

  "#ec4899"
];

const attendanceAnalytics = 


  employees.map(
    (employee) => ({

      name:
        employee.name
          .split(" ")[0],

      attendance:
        employee.attendance ??

        (100 - (employee.id % 20))
    })
  );

  const departmentData =
  departments.map(
    (department) => ({
      name: department,
      count: employees.filter(
        (employee) =>
          employee.department === department
      ).length,
    })
  );



  return (

    <DashboardLayout>

      <div className="dashboard-wrapper">

        {/* HEADER */}

<div className="dashboard-header">

  <div>
    <h1>Dashboard Page</h1>
    <p>Welcome</p>
  </div>

  <button
  className="refresh-btn"
  onClick={() => window.location.reload()}
>
  Refresh
</button>

</div>

        {/* STATS */}

        <div className="stats-grid">

          {/* TOTAL */}

          <div className="stat-card">

            <div className="stat-icon blue">

              <FaUsers />

            </div>

            <div>

              <h2>
                {employees.length}
              </h2>

              <p>
                Total Employees
              </p>

            </div>

          </div>

          {/* ACTIVE */}

          <div className="stat-card">

            <div className="stat-icon green">

              <FaUserCheck />

            </div>

            <div>

              <h2>
                {activeEmployees}
              </h2>

              <p>
                Active Employees
              </p>

            </div>

          </div>

          {/* DEPARTMENTS */}

          <div className="stat-card">

            <div className="stat-icon purple">

              <FaBuilding />

            </div>

            <div>

              <h2>
                {departments.length}
              </h2>

              <p>
                Departments
              </p>

            </div>

          </div>

          {/* PENDING REQUESTS */}

          <div className="stat-card">
          
            <div className="stat-icon orange">
          
              <FaClipboardCheck />
          
            </div>
          
            <div>
          
              <h2>
                {pendingRequests}
              </h2>
          
              <p>
                Pending Requests
              </p>
          
            </div>
          
          </div>
        </div>

        {/* GRAPH + RECENT */}

        <div className="dashboard-content">

          {/* GRAPH */}

          <div className="chart-section">

            <div className="section-header">

              <h2>
                Employee Overview
              </h2>

            </div>

            <div className="chart-container">

              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <LineChart
                  data={chartData}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    dataKey="department"
                  />

                  <YAxis />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="employees"
                    stroke="#2563eb"
                    strokeWidth={3}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* RECENT EMPLOYEES */}

          <div className="employee-section">

            <div className="section-header">

              <h2>
                Recent Employees
              </h2>

            </div>

            {employees
              .slice(0, 5)
              .map((employee) => (

              <div
                className="employee-item"
                key={employee.id}
              >

                <div>

                  <h4>
                    {employee.name}
                  </h4>

                  <p>
                    {employee.role}
                  </p>

                </div>

                <span
                  className={
                    employee.status ===
                    "Active"
                      ? "status active"
                      : "status inactive"
                  }
                >
                  {employee.status}
                </span>

              </div>
            ))}

          </div>

        </div>

        <div className="extra-sections">
          
          {/* ANALYTICS SECTION */}

<div className="analytics-grid">

  {/* ATTENDANCE ANALYTICS */}


<div className="analytics-card">

  <h2>
    Attendance Analytics
  </h2>

  <ResponsiveContainer
    width="100%"
    height={320}
  >

    <BarChart
      data={
        attendanceAnalytics
      }
    >

      <CartesianGrid
        strokeDasharray="3 3"
      />

      <XAxis
        dataKey="name"
      />

      <YAxis />

      <Tooltip />

      <Bar
        dataKey="attendance"
        fill="#16a34a"
      />

    </BarChart>

  </ResponsiveContainer>

</div>


<div className="analytics-card">

  <h2>
    Employee Distribution By Department
  </h2>

  <ResponsiveContainer
    width="100%"
    height={320}
  >

    <BarChart
      data={departmentData}
    >

      <CartesianGrid
        strokeDasharray="3 3"
      />

      <XAxis
        dataKey="name"
      />

      <YAxis />

      <Tooltip />

      <Bar
        dataKey="count"
        fill="#f59e0b"
      />

    </BarChart>

  </ResponsiveContainer>

</div>


<div className="analytics-card">

  <h2>
    Employee Count By Role
  </h2>

  <ResponsiveContainer
    width="100%"
    height={320}
  >

    <PieChart>

      <Pie
       data={[
  {
    role: "Admin",
    count: users.filter(
      (user) =>
        user.role === "Admin"
    ).length
  },

  {
    role: "User",
    count: users.filter(
      (user) =>
        user.role === "User"
    ).length
  }
]}
        dataKey="count"
        nameKey="role"
        cx="50%"
        cy="50%"
        outerRadius={100}
        label
      >

        {Object.values(
          employees.reduce(
            (acc, employee) => {

              if (!acc[employee.role]) {

                acc[employee.role] = {
                  role: employee.role,
                  count: 0,
                };
              }

              acc[employee.role].count++;

              return acc;

            },
            {}
          )
        ).map((entry, index) => (

          <Cell
            key={index}
            fill={
              COLORS[
                index % COLORS.length
              ]
            }
          />

        ))}

      </Pie>

      <Tooltip />

      <Legend />

    </PieChart>

  </ResponsiveContainer>

</div>

<div className="analytics-card">

  <h2>
    Employee Status Overview
  </h2>

  <ResponsiveContainer
    width="100%"
    height={320}
  >

    <PieChart>

      <Pie
        data={[
          {
            status: "Active",
            count: employees.filter(
              (employee) =>
                employee.status === "Active"
            ).length,
          },
          {
            status: "Inactive",
            count: employees.filter(
              (employee) =>
                employee.status === "Inactive"
            ).length,
          },
          {
            status: "On Leave",
            count: employees.filter(
              (employee) =>
                employee.status === "On Leave"
            ).length,
          },
        ]}
        dataKey="count"
        nameKey="status"
        cx="50%"
        cy="50%"
        outerRadius={100}
        label
      >

        <Cell fill="#16a34a" />
        <Cell fill="#dc2626" />
        <Cell fill="#f59e0b" />

      </Pie>

      <Tooltip />

      <Legend />

    </PieChart>

  </ResponsiveContainer>

</div>

{
JSON.parse(localStorage.getItem("authUser"))?.role === "Admin" && (

<div className="analytics-card">

<h2>

User Profile Completion

</h2>

<div style={{marginBottom:"15px"}}>

<label>

Completion Threshold :

</label>

<select

value={threshold}

onChange={(e)=>

setThreshold(Number(e.target.value))

}

>

<option value={100}>100%</option>

{/* <option value={90}>90%</option> */}

<option value={80}>80%</option>

{/* <option value={70}>70%</option> */}

<option value={50}>50%</option>

<option value={40}>40%</option>

</select>

</div>

<table className="completion-table">

<thead>

<tr>

<th>Name</th>

<th>Role</th>

<th>Completion</th>

<th>Status</th>

</tr>

</thead>

<tbody>

{

completionUsers

.filter(

user =>

user.profile_completion <= threshold

)

.map(user=>(

<tr key={user.id}>

<td>{user.name}</td>

<td>{user.role}</td>

<td>

<div className="mini-progress">

<div

className="mini-progress-fill"

style={{

width:`${user.profile_completion}%`

}}

></div>

</div>

<span>

{user.profile_completion}%

</span>

</td>

<td>

{

user.profile_completion===100 ?

"Complete"

:

user.profile_completion>=80 ?

"Good"

:

user.profile_completion>=50 ?

"Incomplete"

:

"At Risk"

}

</td>

</tr>

))

}

</tbody>

</table>

</div>

)
}

</div>
        
        </div>
      </div>

    </DashboardLayout>
  );
}

export default Dashboard;