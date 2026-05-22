function StatsCard({ title, count, icon, color }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${color}`}>{icon}</div>

      <div>
        <h4>{title}</h4>
        <h2>{count}</h2>
      </div>
    </div>
  );
}

export default StatsCard;