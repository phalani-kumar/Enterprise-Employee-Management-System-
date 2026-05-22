function EmployeeTable({ employees }) {
  return (
    <div className="table-wrapper">
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>

              <td>{employee.email}</td>

              <td>{employee.department}</td>

              <td>{employee.role}</td>

              <td>
                <span
                  className={
                    employee.status === "Active"
                      ? "status active"
                      : "status inactive"
                  }
                >
                  {employee.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button>Previous</button>

        <button className="active-page">1</button>

        <button>2</button>

        <button>3</button>

        <button>Next</button>
      </div>
    </div>
  );
}

export default EmployeeTable;