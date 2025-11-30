"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Layout from "../../components/common/Layout"
import StatCard from "../../components/common/StatCard"
import Card from "../../components/common/Card"
import Button from "../../components/common/Button"
import dashboardService from "../../services/dashboardService"
import "./employee.css"

const EmployeeDashboard = () => {
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await dashboardService.getEmployeeDashboard()
        setDashboard(response.data)
      } catch (err) {
        console.error("Error fetching dashboard:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchDashboard()
  }, [])

  if (loading) {
    return (
      <Layout userRole="employee">
        <div>Loading...</div>
      </Layout>
    )
  }

  return (
    <Layout userRole="employee">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Welcome, {user?.name}! 👋</h1>
          <p className="dashboard-subtitle">Department: {user?.department}</p>
        </div>

        <div className="stats-grid">
          <StatCard icon="✓" label="Present This Month" value={dashboard?.thisMonth?.present || 0} color="success" />
          <StatCard icon="✗" label="Absent" value={dashboard?.thisMonth?.absent || 0} color="primary" />
          <StatCard icon="⏰" label="Late Arrivals" value={dashboard?.thisMonth?.late || 0} color="secondary" />
          <StatCard
            icon="📊"
            label="Attendance Rate"
            value={`${Math.round((dashboard?.thisMonth?.present / 20) * 100)}%`}
            color="primary"
          />
        </div>

        <div className="dashboard-grid">
          <Card className="quick-actions-card" padding="lg">
            <h3>Quick Actions</h3>
            <div className="actions-grid">
              <Button variant="primary" fullWidth onClick={() => navigate("/employee/mark-attendance")}>
                Mark Attendance
              </Button>
              <Button variant="secondary" fullWidth onClick={() => navigate("/employee/attendance-history")}>
                View History
              </Button>
              <Button variant="outline" fullWidth onClick={() => navigate("/employee/profile")}>
                View Profile
              </Button>
            </div>
          </Card>

          <Card className="recent-activity-card" padding="lg">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              {dashboard?.recentActivity?.map((activity, idx) => (
                <div key={idx} className="activity-item">
                  <span className="activity-date">{activity.date}</span>
                  <span className="activity-status">{activity.status}</span>
                  <span className="activity-time">{activity.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

export default EmployeeDashboard
