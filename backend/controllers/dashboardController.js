import Attendance from "../models/Attendance.js"
import User from "../models/User.js"

// Get employee dashboard data
export const getEmployeeDashboard = async (req, res) => {
  try {
    const userId = req.user.id
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Today's attendance
    const todayAttendance = await Attendance.findOne({
      userId,
      date: { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) },
    })

    // This month's attendance
    const currentDate = new Date()
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)

    const monthAttendance = await Attendance.find({
      userId,
      date: { $gte: startDate, $lte: endDate },
    })

    const thisMonthSummary = {
      present: monthAttendance.filter((a) => a.status === "present").length,
      absent: monthAttendance.filter((a) => a.status === "absent").length,
      late: monthAttendance.filter((a) => a.status === "late").length,
      halfDay: monthAttendance.filter((a) => a.status === "half-day").length,
      leave: monthAttendance.filter((a) => a.status === "leave").length,
      totalHours: monthAttendance.reduce((sum, a) => sum + a.totalHours, 0),
    }

    // Recent attendance (last 7 days)
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const recentAttendance = await Attendance.find({
      userId,
      date: { $gte: sevenDaysAgo, $lte: today },
    }).sort({ date: -1 })

    res.json({
      success: true,
      today: {
        status: todayAttendance?.status || "absent",
        checkInTime: todayAttendance?.checkInTime || null,
        checkOutTime: todayAttendance?.checkOutTime || null,
      },
      thisMonth: thisMonthSummary,
      recentActivity: recentAttendance,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Get manager dashboard data
export const getManagerDashboard = async (req, res) => {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Today's summary
    const todayAttendance = await Attendance.find({
      date: { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) },
    }).populate("userId", "name employeeId department")

    const todaySummary = {
      present: todayAttendance.filter((a) => a.status === "present").length,
      absent: todayAttendance.filter((a) => a.status === "absent").length,
      late: todayAttendance.filter((a) => a.status === "late").length,
      halfDay: todayAttendance.filter((a) => a.status === "half-day").length,
      leave: todayAttendance.filter((a) => a.status === "leave").length,
      total: todayAttendance.length,
    }

    // This month's summary
    const currentDate = new Date()
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)

    const monthAttendance = await Attendance.find({
      date: { $gte: startDate, $lte: endDate },
    })

    const thisMonthSummary = {
      present: monthAttendance.filter((a) => a.status === "present").length,
      absent: monthAttendance.filter((a) => a.status === "absent").length,
      late: monthAttendance.filter((a) => a.status === "late").length,
      halfDay: monthAttendance.filter((a) => a.status === "half-day").length,
      leave: monthAttendance.filter((a) => a.status === "leave").length,
    }

    // Total employees
    const totalEmployees = await User.countDocuments({ role: "employee" })

    // Attendance trend (last 7 days)
    const attendanceTrend = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000)
      const dayStart = new Date(date)
      dayStart.setHours(0, 0, 0, 0)
      const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000)

      const dayAttendance = await Attendance.find({
        date: { $gte: dayStart, $lt: dayEnd },
      })

      attendanceTrend.push({
        date: dayStart.toISOString().split("T")[0],
        present: dayAttendance.filter((a) => a.status === "present").length,
        absent: dayAttendance.filter((a) => a.status === "absent").length,
        late: dayAttendance.filter((a) => a.status === "late").length,
      })
    }

    res.json({
      success: true,
      today: todaySummary,
      thisMonth: thisMonthSummary,
      totalEmployees,
      attendanceTrend,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
