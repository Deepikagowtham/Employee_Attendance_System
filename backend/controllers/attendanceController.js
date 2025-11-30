import Attendance from "../models/Attendance.js"
import User from "../models/User.js"
import { generateCSV } from "../utils/csvExporter.js"

// Check-in
export const checkIn = async (req, res) => {
  try {
    const userId = req.user.id
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Check if already checked in today
    let attendance = await Attendance.findOne({
      userId,
      date: { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) },
    })

    if (attendance && attendance.checkInTime) {
      return res.status(400).json({
        success: false,
        message: "Already checked in today",
      })
    }

    const checkInTime = new Date()
    const hour = checkInTime.getHours()

    // Determine status based on check-in time (assuming office hours start at 9 AM)
    let status = "present"
    if (hour > 9) {
      status = "late"
    }

    if (!attendance) {
      attendance = new Attendance({
        userId,
        date: today,
        checkInTime,
        status,
      })
    } else {
      attendance.checkInTime = checkInTime
      attendance.status = status
    }

    await attendance.save()

    res.json({
      success: true,
      message: "Check-in successful",
      attendance: {
        checkInTime: attendance.checkInTime,
        status: attendance.status,
      },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Check-out
export const checkOut = async (req, res) => {
  try {
    const userId = req.user.id
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const attendance = await Attendance.findOne({
      userId,
      date: { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) },
    })

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "No check-in found for today",
      })
    }

    if (attendance.checkOutTime) {
      return res.status(400).json({
        success: false,
        message: "Already checked out today",
      })
    }

    const checkOutTime = new Date()
    attendance.checkOutTime = checkOutTime

    // Calculate total hours
    if (attendance.checkInTime) {
      const diffMs = checkOutTime - attendance.checkInTime
      attendance.totalHours = Math.round((diffMs / (1000 * 60 * 60)) * 10) / 10
    }

    await attendance.save()

    res.json({
      success: true,
      message: "Check-out successful",
      attendance: {
        checkOutTime: attendance.checkOutTime,
        totalHours: attendance.totalHours,
      },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Get my attendance history
export const getMyHistory = async (req, res) => {
  try {
    const userId = req.user.id
    const { month, year } = req.query

    const filter = { userId }

    if (month && year) {
      const startDate = new Date(year, month - 1, 1)
      const endDate = new Date(year, month, 0)
      filter.date = { $gte: startDate, $lte: endDate }
    }

    const attendance = await Attendance.find(filter).sort({ date: -1 })

    res.json({
      success: true,
      count: attendance.length,
      attendance,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Get my monthly summary
export const getMySummary = async (req, res) => {
  try {
    const userId = req.user.id
    const { month, year } = req.query

    const currentDate = new Date()
    const monthValue = month || currentDate.getMonth() + 1
    const yearValue = year || currentDate.getFullYear()

    const startDate = new Date(yearValue, monthValue - 1, 1)
    const endDate = new Date(yearValue, monthValue, 0)

    const attendance = await Attendance.find({
      userId,
      date: { $gte: startDate, $lte: endDate },
    })

    const summary = {
      present: attendance.filter((a) => a.status === "present").length,
      absent: attendance.filter((a) => a.status === "absent").length,
      late: attendance.filter((a) => a.status === "late").length,
      halfDay: attendance.filter((a) => a.status === "half-day").length,
      leave: attendance.filter((a) => a.status === "leave").length,
      totalHours: attendance.reduce((sum, a) => sum + a.totalHours, 0),
      totalDays: attendance.length,
    }

    res.json({
      success: true,
      month: monthValue,
      year: yearValue,
      summary,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Get today's attendance
export const getToday = async (req, res) => {
  try {
    const userId = req.user.id
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const attendance = await Attendance.findOne({
      userId,
      date: { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) },
    })

    if (!attendance) {
      return res.json({
        success: true,
        attendance: {
          status: "absent",
          checkInTime: null,
          checkOutTime: null,
        },
      })
    }

    res.json({
      success: true,
      attendance: {
        status: attendance.status,
        checkInTime: attendance.checkInTime,
        checkOutTime: attendance.checkOutTime,
        totalHours: attendance.totalHours,
      },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Get all attendance (manager only)
export const getAll = async (req, res) => {
  try {
    const { page = 1, limit = 20, employeeId, status, date } = req.query

    const filter = {}

    if (employeeId) {
      const user = await User.findOne({ employeeId })
      if (user) filter.userId = user._id
    }

    if (status) {
      filter.status = status
    }

    if (date) {
      const dateObj = new Date(date)
      dateObj.setHours(0, 0, 0, 0)
      filter.date = {
        $gte: dateObj,
        $lt: new Date(dateObj.getTime() + 24 * 60 * 60 * 1000),
      }
    }

    const skip = (page - 1) * limit
    const attendance = await Attendance.find(filter)
      .populate("userId", "name email employeeId department")
      .sort({ date: -1 })
      .skip(skip)
      .limit(Number.parseInt(limit))

    const total = await Attendance.countDocuments(filter)

    res.json({
      success: true,
      total,
      page: Number.parseInt(page),
      limit: Number.parseInt(limit),
      attendance,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Get specific employee attendance
export const getEmployeeAttendance = async (req, res) => {
  try {
    const { id } = req.params
    const { month, year } = req.query

    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ success: false, message: "Employee not found" })
    }

    const filter = { userId: id }

    if (month && year) {
      const startDate = new Date(year, month - 1, 1)
      const endDate = new Date(year, month, 0)
      filter.date = { $gte: startDate, $lte: endDate }
    }

    const attendance = await Attendance.find(filter).sort({ date: -1 })

    res.json({
      success: true,
      employee: {
        id: user._id,
        name: user.name,
        employeeId: user.employeeId,
      },
      attendance,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Get team summary (manager)
export const getTeamSummary = async (req, res) => {
  try {
    const { month, year } = req.query

    const currentDate = new Date()
    const monthValue = month || currentDate.getMonth() + 1
    const yearValue = year || currentDate.getFullYear()

    const startDate = new Date(yearValue, monthValue - 1, 1)
    const endDate = new Date(yearValue, monthValue, 0)

    const attendance = await Attendance.find({
      date: { $gte: startDate, $lte: endDate },
    }).populate("userId", "name employeeId department")

    const summaryByEmployee = {}

    attendance.forEach((record) => {
      const empId = record.userId.employeeId
      if (!summaryByEmployee[empId]) {
        summaryByEmployee[empId] = {
          name: record.userId.name,
          employeeId: empId,
          department: record.userId.department,
          present: 0,
          absent: 0,
          late: 0,
          halfDay: 0,
          leave: 0,
          totalHours: 0,
        }
      }

      summaryByEmployee[empId][record.status === "half-day" ? "halfDay" : record.status]++
      summaryByEmployee[empId].totalHours += record.totalHours
    })

    res.json({
      success: true,
      month: monthValue,
      year: yearValue,
      summary: Object.values(summaryByEmployee),
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Export CSV (manager)
export const exportCSV = async (req, res) => {
  try {
    const { month, year } = req.query

    const currentDate = new Date()
    const monthValue = month || currentDate.getMonth() + 1
    const yearValue = year || currentDate.getFullYear()

    const startDate = new Date(yearValue, monthValue - 1, 1)
    const endDate = new Date(yearValue, monthValue, 0)

    const attendance = await Attendance.find({
      date: { $gte: startDate, $lte: endDate },
    }).populate("userId", "name employeeId department")

    const csvData = attendance.map((record) => ({
      employeeId: record.userId.employeeId,
      employeeName: record.userId.name,
      department: record.userId.department,
      date: record.date.toISOString().split("T")[0],
      checkInTime: record.checkInTime ? record.checkInTime.toLocaleTimeString() : "N/A",
      checkOutTime: record.checkOutTime ? record.checkOutTime.toLocaleTimeString() : "N/A",
      status: record.status,
      totalHours: record.totalHours,
    }))

    const headers = {
      employeeId: "Employee ID",
      employeeName: "Employee Name",
      department: "Department",
      date: "Date",
      checkInTime: "Check-In Time",
      checkOutTime: "Check-Out Time",
      status: "Status",
      totalHours: "Total Hours",
    }

    const csv = generateCSV(csvData, headers)

    res.setHeader("Content-Type", "text/csv")
    res.setHeader("Content-Disposition", `attachment; filename="attendance_${yearValue}_${monthValue}.csv"`)
    res.send(csv)
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Get today's status for all employees (manager)
export const getTodayStatus = async (req, res) => {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const attendance = await Attendance.find({
      date: { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) },
    }).populate("userId", "name employeeId department")

    const summary = {
      present: attendance.filter((a) => a.status === "present").length,
      absent: attendance.filter((a) => a.status === "absent").length,
      late: attendance.filter((a) => a.status === "late").length,
      halfDay: attendance.filter((a) => a.status === "half-day").length,
      leave: attendance.filter((a) => a.status === "leave").length,
      total: attendance.length,
    }

    res.json({
      success: true,
      summary,
      details: attendance,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
