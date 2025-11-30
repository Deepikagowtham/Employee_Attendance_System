import { mockAttendanceData } from "./mockData"

export const attendanceService = {
  // Check In
  checkIn: async () => {
    try {
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: mockAttendanceData.checkInSuccess })
        }, 500)
      })
      // Real: return apiClient.post('/attendance/checkin')
    } catch (error) {
      throw error.response?.data || { message: "Check-in failed" }
    }
  },

  // Check Out
  checkOut: async () => {
    try {
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: mockAttendanceData.checkOutSuccess })
        }, 500)
      })
      // Real: return apiClient.post('/attendance/checkout')
    } catch (error) {
      throw error.response?.data || { message: "Check-out failed" }
    }
  },

  // Get Attendance History
  getHistory: async (startDate, endDate) => {
    try {
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: mockAttendanceData.history })
        }, 800)
      })
      // Real: return apiClient.get('/attendance/my-history', { params: { startDate, endDate } })
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch history" }
    }
  },

  // Get Monthly Summary
  getMonthlySummary: async (month, year) => {
    try {
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: mockAttendanceData.monthlySummary })
        }, 500)
      })
      // Real: return apiClient.get('/attendance/my-summary', { params: { month, year } })
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch summary" }
    }
  },

  // Get Today's Status
  getTodayStatus: async () => {
    try {
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: mockAttendanceData.todayStatus })
        }, 500)
      })
      // Real: return apiClient.get('/attendance/today')
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch today status" }
    }
  },
}

export default attendanceService
