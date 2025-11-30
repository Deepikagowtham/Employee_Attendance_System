"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Layout from "../../components/common/Layout"
import Card from "../../components/common/Card"
import Button from "../../components/common/Button"
import Badge from "../../components/common/Badge"
import { checkInOutSuccess, setTodayStatus } from "../../store/attendanceSlice"
import attendanceService from "../../services/attendanceService"
import "./employee.css"

const MarkAttendance = () => {
  const dispatch = useDispatch()
  const { todayStatus } = useSelector((state) => state.attendance)
  const [loading, setLoading] = useState(false)
  const [localStatus, setLocalStatus] = useState(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await attendanceService.getTodayStatus()
        setLocalStatus(response.data)
        dispatch(setTodayStatus(response.data))
      } catch (err) {
        console.error("Error fetching status:", err)
      }
    }
    fetchStatus()
  }, [dispatch])

  const handleCheckIn = async () => {
    setLoading(true)
    setError("")
    setSuccess("")
    try {
      const response = await attendanceService.checkIn()
      dispatch(checkInOutSuccess(response.data))
      setLocalStatus((prev) => ({ ...prev, checkedIn: true, checkInTime: new Date().toLocaleTimeString() }))
      setSuccess("Checked in successfully!")
    } catch (err) {
      setError(err.message || "Check-in failed")
    } finally {
      setLoading(false)
    }
  }

  const handleCheckOut = async () => {
    setLoading(true)
    setError("")
    setSuccess("")
    try {
      const response = await attendanceService.checkOut()
      dispatch(checkInOutSuccess(response.data))
      setLocalStatus((prev) => ({ ...prev, checkedOut: true, checkOutTime: new Date().toLocaleTimeString() }))
      setSuccess("Checked out successfully!")
    } catch (err) {
      setError(err.message || "Check-out failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout userRole="employee">
      <div className="page-container">
        <h1>Mark Attendance</h1>

        <div className="mark-attendance-grid">
          <Card padding="lg" className="status-card">
            <h2>Today's Status</h2>
            <div className="status-content">
              <div className="status-item">
                <label>Date</label>
                <p className="status-value">{new Date().toLocaleDateString()}</p>
              </div>

              <div className="status-item">
                <label>Check-in Time</label>
                <p className="status-value">{localStatus?.checkedIn ? localStatus?.checkInTime : "Not checked in"}</p>
              </div>

              <div className="status-item">
                <label>Check-out Time</label>
                <p className="status-value">
                  {localStatus?.checkedOut ? localStatus?.checkOutTime : "Not checked out"}
                </p>
              </div>

              <div className="status-item">
                <label>Status</label>
                <Badge variant={localStatus?.status === "present" ? "success" : "warning"}>
                  {localStatus?.status?.toUpperCase()}
                </Badge>
              </div>
            </div>
          </Card>

          <Card padding="lg" className="actions-card">
            <h2>Actions</h2>

            {error && <div className="error-box">{error}</div>}
            {success && <div className="success-box">{success}</div>}

            <div className="attendance-actions">
              <Button
                variant="success"
                size="lg"
                fullWidth
                onClick={handleCheckIn}
                disabled={localStatus?.checkedIn || loading}
                loading={loading}
              >
                ✓ Check In
              </Button>

              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleCheckOut}
                disabled={!localStatus?.checkedIn || localStatus?.checkedOut || loading}
                loading={loading}
              >
                Check Out
              </Button>
            </div>

            <div className="info-box">
              <p>✓ Check in when you arrive at office</p>
              <p>✓ Check out when you leave office</p>
              <p>ℹ️ Both timestamps are recorded in system</p>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

export default MarkAttendance
