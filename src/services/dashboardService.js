export const dashboardService = {
  // Get Employee Dashboard Data
  getEmployeeDashboard: async () => {
    try {
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: {
              todayStatus: "present",
              thisMonth: { present: 18, absent: 2, late: 3 },
              recentActivity: [
                { date: "2024-11-29", status: "checked-in", time: "09:30" },
                { date: "2024-11-28", status: "checked-out", time: "18:30" },
              ],
              nextScheduledLeave: "2024-12-25",
            },
          })
        }, 600)
      })
      // Real: return apiClient.get('/dashboard/employee')
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch dashboard data" }
    }
  },

  // Get Manager Dashboard Data
  getManagerDashboard: async () => {
    try {
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: {
              teamStats: {
                total: 15,
                presentToday: 12,
                absentToday: 2,
                lateToday: 1,
              },
              departmentStats: [
                { dept: "Engineering", total: 5, present: 5, absent: 0 },
                { dept: "Marketing", total: 4, present: 3, absent: 1 },
                { dept: "Finance", total: 3, present: 3, absent: 0 },
                { dept: "HR", total: 3, present: 1, absent: 2 },
              ],
              attendanceTrend: [
                { date: "2024-11-25", attendance: 92 },
                { date: "2024-11-26", attendance: 94 },
                { date: "2024-11-27", attendance: 88 },
                { date: "2024-11-28", attendance: 96 },
                { date: "2024-11-29", attendance: 93 },
              ],
            },
          })
        }, 800)
      })
      // Real: return apiClient.get('/dashboard/manager')
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch dashboard data" }
    }
  },
}

export default dashboardService
