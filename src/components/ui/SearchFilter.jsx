function SearchFilter({
  searchTerm,
  setSearchTerm,
  department,
  setDepartment,
}) {
  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Search employee by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      >
        <option value="All">All Departments</option>

        <option value="IT">IT</option>

        <option value="HR">HR</option>

        <option value="Finance">Finance</option>

        <option value="Design">Design</option>
      </select>

      <button className="add-btn">
        + Add Employee
      </button>
    </div>
  );
}

export default SearchFilter;