"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Layout from "../../components/common/Layout"
import StatCard from "../../components/common/StatCard"
import Card from "../../components/common/Card"
import dashboardService from "../../services/dashboardService"
import "./manager.css"

const ManagerDashboard = () => {
  const { user } = useSelector((state) => state.auth)
  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await dashboardService.getManagerDashboard()
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
      <Layout userRole="manager">
        <div>Loading...</div>
      </Layout>
    )
  }

  return (
    <Layout userRole="manager">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Manager Dashboard 📊</h1>
          <p className="dashboard-subtitle">Team: {user?.department}</p>
        </div>

        <div className="stats-grid">
          <StatCard icon="👥" label="Total Employees" value={dashboard?.teamStats?.total || 0} color="primary" />
          <StatCard icon="✓" label="Present Today" value={dashboard?.teamStats?.presentToday || 0} color="success" />
          <StatCard icon="✗" label="Absent Today" value={dashboard?.teamStats?.absentToday || 0} color="error" />
          <StatCard icon="⏰" label="Late Today" value={dashboard?.teamStats?.lateToday || 0} color="warning" />
        </div>

        <div className="dashboard-grid">
          <Card padding="lg" className="department-card">
            <h3>Department Breakdown</h3>
            <div className="dept-table">
              <div className="dept-header">
                <div>Department</div>
                <div>Total</div>
                <div>Present</div>
                <div>Absent</div>
              </div>
              {dashboard?.departmentStats?.map((dept, idx) => (
                <div key={idx} className="dept-row">
                  <div>{dept.dept}</div>
                  <div className="dept-value">{dept.total}</div>
                  <div className="dept-present">{dept.present}</div>
                  <div className="dept-absent">{dept.absent}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card padding="lg" className="trend-card">
            <h3>Attendance Trend (Last 5 Days)</h3>
            <div className="trend-list">
              {dashboard?.attendanceTrend?.map((day, idx) => (
                <div key={idx} className="trend-item">
                  <span className="trend-date">{day.date}</span>
                  <div className="trend-bar">
                    <div className="trend-fill" style={{ width: `${day.attendance}%` }}></div>
                  </div>
                  <span className="trend-percent">{day.attendance}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="quick-links">
          <h3>Quick Actions</h3>
          <div className="links-grid">
            <a href="/manager/all-attendance" className="link-card">
              <span className="link-icon">📋</span>
              <span className="link-text">View All Attendance</span>
            </a>
            <a href="/manager/team-calendar" className="link-card">
              <span className="link-icon">🗓️</span>
              <span className="link-text">Team Calendar</span>
            </a>
            <a href="/manager/reports" className="link-card">
              <span className="link-icon">📈</span>
              <span className="link-text">Generate Reports</span>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ManagerDashboard
