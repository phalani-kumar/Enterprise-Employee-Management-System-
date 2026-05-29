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
} from "recharts";

import {
  FaUsers,
  FaUserCheck,
  FaBuilding,
  FaClipboardCheck,
} from "react-icons/fa";

import DashboardLayout from "../../components/layout/DashboardLayout";

import {
  getEmployees,
} from "../../services/employeeService";

function Dashboard() {

  const [employees,
    setEmployees] =
    useState([]);

  useEffect(() => {

  fetchEmployees();

  window.addEventListener(
    "storage",
    fetchEmployees
  );

  return () => {

    window.removeEventListener(
      "storage",
      fetchEmployees
    );
  };

}, []);

  const fetchEmployees =
    async () => {

      try {

        const localEmployees =
          localStorage.getItem(
            "employees"
          );

        if (localEmployees) {

          setEmployees(
            JSON.parse(
              localEmployees
            )
          );

        } else {

          const data =
            await getEmployees();

          setEmployees(data);
        }

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

  "#dc2626"
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



  return (

    <DashboardLayout>

      <div className="dashboard-wrapper">

        {/* HEADER */}

        <div className="dashboard-header">

          <div>

            <h1>
              Dashboard Page
            </h1>

            <p>
              Welcome
            </p>

          </div>

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

          {/* ATTENDANCE */}

          <div className="stat-card">

            <div className="stat-icon orange">

              <FaClipboardCheck />

            </div>

            <div>

              <h2>
                {attendance}%
              </h2>

              <p>
                Attendance
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
          <div className="palette-card">
            <h3>Color Palette</h3>

            <div className="colors">
              <div className="color blue-bg"></div>
              <div className="color dark-bg"></div>
              <div className="color light-bg"></div>
              <div className="color green-bg"></div>
              <div className="color orange-bg"></div>
              <div className="color red-bg"></div>
            </div>
          </div>

          <div className="guideline-card">
            <h3>UI/UX Guidelines</h3>

            <div className="guidelines">
              <div>Responsive Layout</div>
              <div>Modern UI</div>
              <div>Reusable Components</div>
              <div>Clean Typography</div>
            </div>
          </div>
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

</div>
        
        </div>
      </div>

    </DashboardLayout>
  );
}

export default Dashboard;