import Card from "./Card"
import "../styles/stat-card.css"

const StatCard = ({ icon, label, value, trend = null, color = "primary" }) => {
  return (
    <Card className="stat-card" padding="md">
      <div className="stat-content">
        <div className={`stat-icon stat-icon-${color}`}>{icon}</div>
        <div className="stat-text">
          <p className="stat-label">{label}</p>
          <p className="stat-value">{value}</p>
          {trend && (
            <span className={`stat-trend ${trend > 0 ? "positive" : "negative"}`}>
              {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%
            </span>
          )}
        </div>
      </div>
    </Card>
  )
}

export default StatCard
