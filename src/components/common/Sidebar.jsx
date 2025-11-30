"use client"

import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../store/authSlice"
import "../styles/sidebar.css"

const Sidebar = ({ userRole }) => {
  const [isOpen, setIsOpen] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate(userRole === "manager" ? "/manager/login" : "/employee/login")
  }

  const isActive = (path) => location.pathname === path

  const employeeLinks = [
    { label: "Dashboard", path: "/employee/dashboard", icon: "📊" },
    { label: "Mark Attendance", path: "/employee/mark-attendance", icon: "✓" },
    { label: "History", path: "/employee/attendance-history", icon: "📋" },
    { label: "Profile", path: "/employee/profile", icon: "👤" },
  ]

  const managerLinks = [
    { label: "Dashboard", path: "/manager/dashboard", icon: "📊" },
    { label: "All Attendance", path: "/manager/all-attendance", icon: "📅" },
    { label: "Team Calendar", path: "/manager/team-calendar", icon: "🗓️" },
    { label: "Reports", path: "/manager/reports", icon: "📈" },
  ]

  const links = userRole === "manager" ? managerLinks : employeeLinks

  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <h1 className="sidebar-logo">EAS</h1>
        <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
      </div>

      <nav className="sidebar-nav">
        {links.map((link) => (
          <Link key={link.path} to={link.path} className={`nav-link ${isActive(link.path) ? "active" : ""}`}>
            <span className="nav-icon">{link.icon}</span>
            {isOpen && <span className="nav-label">{link.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-info" title={user?.name}>
          <div className="user-avatar">{user?.name?.charAt(0)}</div>
          {isOpen && (
            <div className="user-details">
              <p className="user-name">{user?.name}</p>
              <p className="user-role">{user?.role}</p>
            </div>
          )}
        </div>
        <button className="logout-btn" onClick={handleLogout} title="Logout">
          🚪
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
