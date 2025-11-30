/**
 * General Helper Functions
 * Utility functions for common operations
 */

export const getInitials = (name) => {
  if (!name) return "?"
  return name
    .split(" ")
    .map((n) => n.charAt(0))
    .join("")
    .toUpperCase()
}

export const getStatusColor = (status) => {
  const colors = {
    present: "#C7FFD8",
    absent: "#FF6B6B",
    late: "#FFB74D",
    on_leave: "#98DED9",
  }
  return colors[status] || "#F6F6F6"
}

export const getStatusLabel = (status) => {
  const labels = {
    present: "Present",
    absent: "Absent",
    late: "Late",
    on_leave: "On Leave",
  }
  return labels[status] || status
}

export const calculateAttendancePercentage = (present, total) => {
  if (total === 0) return 0
  return Math.round((present / total) * 100)
}

export const sortByDate = (data, dateKey = "date", order = "desc") => {
  return [...data].sort((a, b) => {
    const dateA = new Date(a[dateKey])
    const dateB = new Date(b[dateKey])
    return order === "desc" ? dateB - dateA : dateA - dateB
  })
}

export const groupByProperty = (data, property) => {
  return data.reduce((grouped, item) => {
    const key = item[property]
    if (!grouped[key]) {
      grouped[key] = []
    }
    grouped[key].push(item)
    return grouped
  }, {})
}

export const debounce = (func, delay) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

export const throttle = (func, limit) => {
  let inThrottle
  return (...args) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
