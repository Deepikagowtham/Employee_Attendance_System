"use client"

import { useState } from "react"
import "../styles/calendar.css"

const Calendar = ({ onDateSelect = null, selectedDate = null }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())

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

  const handleDateClick = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    onDateSelect?.(date)
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
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>←</button>
        <h3>{monthName}</h3>
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
          <button
            key={idx}
            className={`calendar-day ${day ? "active" : "empty"} ${selectedDate?.getDate() === day ? "selected" : ""}`}
            onClick={() => day && handleDateClick(day)}
            disabled={!day}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Calendar
