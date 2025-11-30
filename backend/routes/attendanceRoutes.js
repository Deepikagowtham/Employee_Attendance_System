import express from "express"
import {
  checkIn,
  checkOut,
  getMyHistory,
  getMySummary,
  getToday,
  getAll,
  getEmployeeAttendance,
  getTeamSummary,
  exportCSV,
  getTodayStatus,
} from "../controllers/attendanceController.js"
import { authenticateToken, authorize } from "../middleware/authMiddleware.js"

const router = express.Router()

// Employee routes
router.post("/checkin", authenticateToken, checkIn)
router.post("/checkout", authenticateToken, checkOut)
router.get("/my-history", authenticateToken, getMyHistory)
router.get("/my-summary", authenticateToken, getMySummary)
router.get("/today", authenticateToken, getToday)

// Manager routes
router.get("/all", authenticateToken, authorize("manager"), getAll)
router.get("/employee/:id", authenticateToken, authorize("manager"), getEmployeeAttendance)
router.get("/summary", authenticateToken, authorize("manager"), getTeamSummary)
router.get("/export", authenticateToken, authorize("manager"), exportCSV)
router.get("/today-status", authenticateToken, authorize("manager"), getTodayStatus)

export default router
