import { mockManagerData } from "./mockData"

export const managerService = {
  // Get All Attendance Records
  getAllAttendance: async (filters = {}) => {
    try {
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: mockManagerData.allAttendance })
        }, 1000)
      })
      // Real: return apiClient.get('/attendance/all', { params: filters })
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch attendance" }
    }
  },

  // Get Specific Employee Attendance
  getEmployeeAttendance: async (employeeId, startDate, endDate) => {
    try {
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: mockManagerData.employeeAttendance })
        }, 800)
      })
      // Real: return apiClient.get(`/attendance/employee/${employeeId}`, { params: { startDate, endDate } })
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch employee attendance" }
    }
  },

  // Get Team Summary
  getTeamSummary: async () => {
    try {
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: mockManagerData.teamSummary })
        }, 600)
      })
      // Real: return apiClient.get('/attendance/summary')
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch team summary" }
    }
  },

  // Get Today's Status
  getTodayStatus: async () => {
    try {
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: mockManagerData.todayStatus })
        }, 600)
      })
      // Real: return apiClient.get('/attendance/today-status')
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch today status" }
    }
  },

  // Export Attendance Data
  exportAttendanceCSV: async (filters = {}) => {
    try {
      // Simulate API call - Returns CSV data
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: mockManagerData.csvData })
        }, 500)
      })
      // Real: return apiClient.get('/attendance/export', { params: filters })
    } catch (error) {
      throw error.response?.data || { message: "Failed to export data" }
    }
  },
}

export default managerService
