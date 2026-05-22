function EmployeeCard({ employee }) {
  return (
    <div className="employee-card">
      <div className="employee-top">
        <div className="employee-avatar">
          {employee.name.charAt(0)}
        </div>

        <div>
          <h3>{employee.name}</h3>

          <p>{employee.role}</p>
        </div>
      </div>

      <div className="employee-info">
        <div>
          <span>Department</span>

          <h4>{employee.department}</h4>
        </div>

        <div>
          <span>Status</span>

          <h4
            className={
              employee.status === "Active"
                ? "active-text"
                : "inactive-text"
            }
          >
            {employee.status}
          </h4>
        </div>
      </div>
    </div>
  );
}

export default EmployeeCard;