import express from "express"
import { getEmployeeDashboard, getManagerDashboard } from "../controllers/dashboardController.js"
import { authenticateToken, authorize } from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/employee", authenticateToken, authorize("employee"), getEmployeeDashboard)
router.get("/manager", authenticateToken, authorize("manager"), getManagerDashboard)

export default router
