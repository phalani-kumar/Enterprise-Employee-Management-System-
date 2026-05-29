// import {

//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,

//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,

// } from "recharts";

// function ChartsSection({
//   employees
// }) {

//   const departmentData = [

//     {
//       name: "IT",

//       value:
//         employees.filter(
//           emp =>
//             emp.department ===
//             "IT"
//         ).length
//     },

//     {
//       name: "HR",

//       value:
//         employees.filter(
//           emp =>
//             emp.department ===
//             "HR"
//         ).length
//     },

//     {
//       name: "Finance",

//       value:
//         employees.filter(
//           emp =>
//             emp.department ===
//             "Finance"
//         ).length
//     },

//     {
//       name: "Design",

//       value:
//         employees.filter(
//           emp =>
//             emp.department ===
//             "Design"
//         ).length
//     },
//   ];

//   return (

//     <div className="charts-grid">

//       {/* PIE CHART */}

//       <div className="chart-card">

//         <h3>
//           Department Distribution
//         </h3>

//         <ResponsiveContainer
//           width="100%"
//           height={300}
//         >

//           <PieChart>

//             <Pie
//               data={departmentData}
//               dataKey="value"
//               outerRadius={100}
//               label
//             >

//               <Cell fill="#2563eb" />
//               <Cell fill="#16a34a" />
//               <Cell fill="#f59e0b" />
//               <Cell fill="#dc2626" />

//             </Pie>

//             <Tooltip />

//           </PieChart>

//         </ResponsiveContainer>

//       </div>

//       {/* BAR CHART */}

//       <div className="chart-card">

//         <h3>
//           Attendance Analytics
//         </h3>

//         <ResponsiveContainer
//           width="100%"
//           height={300}
//         >

//           <BarChart data={employees}>

//             <CartesianGrid
//               strokeDasharray="3 3"
//             />

//             <XAxis dataKey="name" />

//             <YAxis />

//             <Tooltip />

//             <Bar
//               dataKey="attendance"
//               fill="#2563eb"
//             />

//           </BarChart>

//         </ResponsiveContainer>

//       </div>

//     </div>
//   );
// }

// export default ChartsSection;