import axios from "axios";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const API_URL = "http://127.0.0.1:8000";


// =========================
// CSV
// =========================

export const downloadEmployeesCSV = async (companyId) => {

  const response = await axios.get(
    `${API_URL}/employees/${companyId}`
  );

  const employees = response.data;

  const headers =
    "ID,Name,Email,Department,Role,Status\n";

  const rows = employees
    .map(
      emp =>
        `${emp.id},${emp.name},${emp.email},${emp.department},${emp.role},${emp.status}`
    )
    .join("\n");

  const csvContent = headers + rows;

  const blob = new Blob(
    [csvContent],
    { type: "text/csv" }
  );

  const url =
    window.URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download = "employees.csv";

  link.click();
};

export const downloadAttendanceCSV = async (companyId) => {

  const response = await axios.get(
    `${API_URL}/attendance-report`
  );

  const data = response.data;

  const headers =
    "ID,Name,Department,Attendance\n";

  const rows = data
    .map(
      item =>
        `${item.id},${item.name},${item.department},${item.attendance}`
    )
    .join("\n");

  const blob = new Blob(
    [headers + rows],
    { type: "text/csv" }
  );

  const url =
    window.URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download =
    "attendance.csv";

  link.click();
};

export const downloadLeaveCSV = async (companyId) => {

  const response = await axios.get(
    `${API_URL}/leave/company/${companyId}`
  );

  const data = response.data;

  const headers =
    "Employee,Leave Type,From,To,Status\n";

  const rows = data
    .map(
      item =>
        `${item.user_name},${item.leave_type},${item.from_date},${item.to_date},${item.status}`
    )
    .join("\n");

  const blob = new Blob(
    [headers + rows],
    { type: "text/csv" }
  );

  const url =
    window.URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download =
    "leave_requests.csv";

  link.click();
};

export const downloadAuditLogsCSV = async (companyId) => {

  const response = await axios.get(
    `${API_URL}/audit-logs/${companyId}`
  );

  const data = response.data;

  const headers =
    "User,Action,Employee,Timestamp\n";

  const rows = data
    .map(
      item =>
        `${item.user_name},${item.action},${item.related_employee},${item.timestamp}`
    )
    .join("\n");

  const blob = new Blob(
    [headers + rows],
    { type: "text/csv" }
  );

  const url =
    window.URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download =
    "audit_logs.csv";

  link.click();
};

export const downloadNotificationsCSV = async (companyId) => {

  const response = await axios.get(
    `${API_URL}/notification/company/${companyId}`
  );

  const data = response.data;

  const headers =
    "Message,Time\n";

  const rows = data
    .map(
      item =>
        `${item.message},${item.timestamp}`
    )
    .join("\n");

  const blob = new Blob(
    [headers + rows],
    { type: "text/csv" }
  );

  const url =
    window.URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download =
    "notifications.csv";

  link.click();
};

export const downloadAnalyticsCSV = async (companyId) => {

  const response = await axios.get(
    `${API_URL}/employees/${companyId}`
  );

  const employees = response.data;

  const totalEmployees =
    employees.length;

  const activeEmployees =
    employees.filter(
      emp => emp.status === "Active"
    ).length;

  const inactiveEmployees =
    employees.filter(
      emp => emp.status !== "Active"
    ).length;

  const departments =
    [...new Set(
      employees.map(
        emp => emp.department
      )
    )].length;

  const analyticsData = [

    ["Metric","Value"],

    ["Total Employees",
      totalEmployees
    ],

    ["Active Employees",
      activeEmployees
    ],

    ["Inactive Employees",
      inactiveEmployees
    ],

    ["Departments",
      departments
    ]

  ];

  const csvContent =
    analyticsData
      .map(
        row => row.join(",")
      )
      .join("\n");

  const blob =
    new Blob(
      [csvContent],
      {
        type: "text/csv"
      }
    );

  const url =
    window.URL.createObjectURL(
      blob
    );

  const link =
    document.createElement("a");

  link.href = url;

  link.download =
    "analytics.csv";

  link.click();
};


// =========================
// EXCEL
// =========================

export const downloadEmployeesExcel = async (companyId) => {

  const response = await axios.get(
    `${API_URL}/employees/${companyId}`
  );

  const worksheet =
    XLSX.utils.json_to_sheet(
      response.data
    );

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Employees"
  );

  XLSX.writeFile(
    workbook,
    "employees.xlsx"
  );
};

export const downloadAttendanceExcel = async () => {

  const response =
    await axios.get(
      `${API_URL}/attendance-report`
    );

  const worksheet =
    XLSX.utils.json_to_sheet(
      response.data
    );

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Attendance"
  );

  XLSX.writeFile(
    workbook,
    "attendance.xlsx"
  );
};

export const downloadLeaveExcel = async (companyId) => {

  const response =
    await axios.get(
      `${API_URL}/leave/company/${companyId}`
    );

  const worksheet =
    XLSX.utils.json_to_sheet(
      response.data
    );

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Leave Requests"
  );

  XLSX.writeFile(
    workbook,
    "leave_requests.xlsx"
  );
};

export const downloadAuditLogsExcel = async (companyId) => {

  const response =
    await axios.get(
      `${API_URL}/audit-logs/${companyId}`
    );

  const worksheet =
    XLSX.utils.json_to_sheet(
      response.data
    );

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Audit Logs"
  );

  XLSX.writeFile(
    workbook,
    "audit_logs.xlsx"
  );
};

export const downloadNotificationsExcel = async (companyId) => {

  const response =
    await axios.get(
      `${API_URL}/notification/company/${companyId}`
    );

  const worksheet =
    XLSX.utils.json_to_sheet(
      response.data
    );

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Notifications"
  );

  XLSX.writeFile(
    workbook,
    "notifications.xlsx"
  );
};

export const downloadAnalyticsExcel = async (companyId) => {

  const response = await axios.get(
    `${API_URL}/employees/${companyId}`
  );

  const employees = response.data;

  const analytics = [

    {
      Metric:
      "Total Employees",

      Value:
      employees.length
    },

    {
      Metric:
      "Active Employees",

      Value:
      employees.filter(
        emp => emp.status === "Active"
      ).length
    },

    {
      Metric:
      "Inactive Employees",

      Value:
      employees.filter(
        emp => emp.status !== "Active"
      ).length
    },

    {
      Metric:
      "Departments",

      Value:
      [...new Set(
        employees.map(
          emp => emp.department
        )
      )].length
    }

  ];

  const worksheet =
    XLSX.utils.json_to_sheet(
      analytics
    );

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Analytics"
  );

  XLSX.writeFile(
    workbook,
    "analytics.xlsx"
  );
};


// =========================
// PDF
// =========================

export const downloadEmployeesPDF = async (companyId) => {

  const response = await axios.get(
    `${API_URL}/employees/${companyId}`
  );

  const employees =
    response.data;

  const doc = new jsPDF();

  doc.text(
    "Employees Report",
    14,
    15
  );

  autoTable(doc, {

    startY: 25,

    head: [[
      "ID",
      "Name",
      "Email",
      "Department",
      "Role",
      "Status"
    ]],

    body: employees.map(
      emp => [

        emp.id,

        emp.name,

        emp.email,

        emp.department,

        emp.role,

        emp.status
      ]
    )
  });

  doc.save(
    "employees.pdf"
  );
};

export const downloadAttendancePDF = async () => {

  const response =
    await axios.get(
      `${API_URL}/attendance-report`
    );

  const data =
    response.data;

  const doc =
    new jsPDF();

  doc.text(
    "Attendance Report",
    14,
    15
  );

  autoTable(doc, {

    startY: 25,

    head: [[
      "ID",
      "Name",
      "Department",
      "Attendance"
    ]],

    body: data.map(
      item => [

        item.id,

        item.name,

        item.department,

        item.attendance
      ]
    )
  });

  doc.save(
    "attendance.pdf"
  );
};

export const downloadLeavePDF = async (companyId) => {

  const response =
    await axios.get(
      `${API_URL}/leave/company/${companyId}`
    );

  const data =
    response.data;

  const doc =
    new jsPDF();

  doc.text(
    "Leave Requests",
    14,
    15
  );

  autoTable(doc, {

    startY: 25,

    head: [[
      "Employee",
      "Leave Type",
      "From",
      "To",
      "Status"
    ]],

    body: data.map(
      item => [

        item.user_name,

        item.leave_type,

        item.from_date,

        item.to_date,

        item.status
      ]
    )
  });

  doc.save(
    "leave_requests.pdf"
  );
};

export const downloadAuditLogsPDF = async (companyId) => {

  const response =
    await axios.get(
      `${API_URL}/audit-logs/${companyId}`
    );

  const data =
    response.data;

  const doc =
    new jsPDF();

  doc.text(
    "Audit Logs",
    14,
    15
  );

  autoTable(doc, {

    startY: 25,

    head: [[
      "User",
      "Action",
      "Employee",
      "Timestamp"
    ]],

    body: data.map(
      item => [

        item.user_name,

        item.action,

        item.related_employee,

        item.timestamp
      ]
    )
  });

  doc.save(
    "audit_logs.pdf"
  );
};

export const downloadNotificationsPDF = async (companyId) => {

  const response =
    await axios.get(
      `${API_URL}/notification/company/${companyId}`
    );

  const data =
    response.data;

  const doc =
    new jsPDF();

  doc.text(
    "Notifications",
    14,
    15
  );

  autoTable(doc, {

    startY: 25,

    head: [[
      "Message",
      "Timestamp"
    ]],

    body: data.map(
      item => [

        item.message,

        item.timestamp
      ]
    )
  });

  doc.save(
    "notifications.pdf"
  );
};

export const downloadAnalyticsPDF = async (companyId) => {

  const response = await axios.get(
    `${API_URL}/employees/${companyId}`
  );

  const employees =
    response.data;

  const doc =
    new jsPDF();

  doc.text(
    "Analytics Report",
    14,
    15
  );

  autoTable(doc, {

    startY: 25,

    head: [[
      "Metric",
      "Value"
    ]],

    body: [

      [
        "Total Employees",

        employees.length
      ],

      [
        "Active Employees",

        employees.filter(
          emp => emp.status === "Active"
        ).length
      ],

      [
        "Inactive Employees",

        employees.filter(
          emp => emp.status !== "Active"
        ).length
      ],

      [
        "Departments",

        [...new Set(
          employees.map(
            emp => emp.department
          )
        )].length
      ]

    ]

  });

  doc.save(
    "analytics.pdf"
  );
};

export const exportFunctions = {

  Employees: {

    CSV:
      downloadEmployeesCSV,

    Excel:
      downloadEmployeesExcel,

    PDF:
      downloadEmployeesPDF

  },

  Attendance: {

    CSV:
      downloadAttendanceCSV,

    Excel:
      downloadAttendanceExcel,

    PDF:
      downloadAttendancePDF

  },

  "Leave Requests": {

    CSV:
      downloadLeaveCSV,

    Excel:
      downloadLeaveExcel,

    PDF:
      downloadLeavePDF

  },

  "Audit Logs": {

    CSV:
      downloadAuditLogsCSV,

    Excel:
      downloadAuditLogsExcel,

    PDF:
      downloadAuditLogsPDF

  },

  Notifications: {

    CSV:
      downloadNotificationsCSV,

    Excel:
      downloadNotificationsExcel,

    PDF:
      downloadNotificationsPDF

  },

  Analytics: {

    CSV:
      downloadAnalyticsCSV,

    Excel:
      downloadAnalyticsExcel,

    PDF:
      downloadAnalyticsPDF

  }

};