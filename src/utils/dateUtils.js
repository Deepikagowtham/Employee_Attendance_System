/**
 * Date Utility Functions
 * Helper functions for date manipulation and formatting
 */

export const formatDate = (date, format = "YYYY-MM-DD") => {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")

  if (format === "YYYY-MM-DD") return `${year}-${month}-${day}`
  if (format === "DD/MM/YYYY") return `${day}/${month}/${year}`
  if (format === "MM/DD/YYYY") return `${month}/${day}/${year}`

  return d.toLocaleDateString()
}

export const formatTime = (time) => {
  if (!time) return "N/A"
  const [hours, minutes] = time.split(":")
  return `${hours}:${minutes}`
}

export const getMonthName = (monthIndex) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  return months[monthIndex]
}

export const getDayName = (date) => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  return days[new Date(date).getDay()]
}

export const isToday = (date) => {
  const today = new Date()
  const checkDate = new Date(date)
  return (
    checkDate.getDate() === today.getDate() &&
    checkDate.getMonth() === today.getMonth() &&
    checkDate.getFullYear() === today.getFullYear()
  )
}

export const getWorkingHours = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return "0h 0m"

  const [inHours, inMinutes] = checkIn.split(":").map(Number)
  const [outHours, outMinutes] = checkOut.split(":").map(Number)

  const inTotalMinutes = inHours * 60 + inMinutes
  const outTotalMinutes = outHours * 60 + outMinutes

  const diffMinutes = outTotalMinutes - inTotalMinutes
  const hours = Math.floor(diffMinutes / 60)
  const minutes = diffMinutes % 60

  return `${hours}h ${minutes}m`
}

export const getDateRange = (startDate, endDate) => {
  const dates = []
  const currentDate = new Date(startDate)

  while (currentDate <= new Date(endDate)) {
    dates.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return dates
}
