// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api"

// User Roles
export const ROLES = {
  EMPLOYEE: "employee",
  MANAGER: "manager",
}

// Attendance Status
export const ATTENDANCE_STATUS = {
  PRESENT: "present",
  ABSENT: "absent",
  LATE: "late",
  ON_LEAVE: "on_leave",
}

// Date format constants
export const DATE_FORMAT = "YYYY-MM-DD"
export const DISPLAY_DATE_FORMAT = "DD MMM YYYY"
export const TIME_FORMAT = "HH:mm:ss"

// Local Storage keys
export const STORAGE_KEYS = {
  TOKEN: "auth_token",
  USER: "user_data",
  THEME: "theme",
}

// Color Palette
export const COLORS = {
  PRIMARY: "#161D6F",
  SECONDARY: "#98DED9",
  SUCCESS: "#C7FFD8",
  BACKGROUND: "#F6F6F6",
  TEXT: "#161D6F",
  BORDER: "#E0E0E0",
  ERROR: "#FF6B6B",
  WARNING: "#FFB74D",
}
