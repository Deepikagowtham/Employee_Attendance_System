"use client"

import { useEffect, useState } from "react"
import Layout from "../../components/common/Layout"
import Card from "../../components/common/Card"
import Badge from "../../components/common/Badge"
import managerService from "../../services/managerService"
import "./manager.css"

const TeamCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [attendanceData, setAttendanceData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await managerService.getTodayStatus()
        setAttendanceData(response.data)
      } catch (err) {
        console.error("Error fetching calendar data:", err)
      }
    }
    fetchData()
  }, [])

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const daysInMonth = getDaysInMonth(currentMonth)
  const firstDay = getFirstDayOfMonth(currentMonth)
  const monthName = currentMonth.toLocaleString("default", { month: "long", year: "numeric" })

  const days = []
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  return (
    <Layout userRole="manager">
      <div className="page-container">
        <h1>Team Calendar</h1>

        <div className="calendar-grid">
          <Card padding="lg" className="calendar-card">
            <div className="calendar-header">
              <button onClick={handlePrevMonth}>←</button>
              <h2>{monthName}</h2>
              <button onClick={handleNextMonth}>→</button>
            </div>

            <div className="calendar-weekdays">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>

            <div className="calendar-days">
              {days.map((day, idx) => (
                <div key={idx} className={`calendar-day ${day ? "active" : "empty"}`}>
                  {day && <span>{day}</span>}
                </div>
              ))}
            </div>

            <div className="calendar-legend">
              <div className="legend-item">
                <div className="legend-color present"></div>
                <span>Present</span>
              </div>
              <div className="legend-item">
                <div className="legend-color absent"></div>
                <span>Absent</span>
              </div>
              <div className="legend-item">
                <div className="legend-color late"></div>
                <span>Late</span>
              </div>
            </div>
          </Card>

          <Card padding="lg" className="today-status-card">
            <h3>Today's Presence</h3>
            <div className="presence-list">
              {attendanceData?.map((person, idx) => (
                <div key={idx} className="presence-item">
                  <div className="presence-info">
                    <p className="presence-name">{person.name}</p>
                    <p className="presence-time">{person.checkInTime}</p>
                  </div>
                  <Badge
                    variant={person.status === "present" ? "success" : person.status === "late" ? "warning" : "error"}
                  >
                    {person.status?.toUpperCase()}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

export default TeamCalendar
