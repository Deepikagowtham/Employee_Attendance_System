"use client"

import { useState } from "react"
import Layout from "../../components/common/Layout"
import Card from "../../components/common/Card"
import Button from "../../components/common/Button"
import Input from "../../components/common/Input"
import managerService from "../../services/managerService"
import { exportToCSV } from "../../utils/csvExport"
import "./manager.css"

const Reports = () => {
  const [reportType, setReportType] = useState("monthly")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [loading, setLoading] = useState(false)

  const handleExport = async () => {
    setLoading(true)
    try {
      const response = await managerService.exportAttendanceCSV({
        type: reportType,
        startDate,
        endDate,
      })
      exportToCSV(response.data, `attendance-report-${reportType}.csv`)
    } catch (err) {
      console.error("Error exporting:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout userRole="manager">
      <div className="page-container">
        <h1>Reports & Analytics</h1>

        <div className="reports-grid">
          <Card padding="lg" className="report-form-card">
            <h3>Generate Report</h3>

            <div className="form-group">
              <label>Report Type</label>
              <select value={reportType} onChange={(e) => setReportType(e.target.value)} className="input">
                <option value="monthly">Monthly Report</option>
                <option value="weekly">Weekly Report</option>
                <option value="custom">Custom Date Range</option>
              </select>
            </div>

            {reportType === "custom" && (
              <>
                <Input
                  label="Start Date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <Input label="End Date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </>
            )}

            <Button variant="success" fullWidth onClick={handleExport} loading={loading} size="lg">
              📥 Export as CSV
            </Button>
          </Card>

          <Card padding="lg" className="report-info-card">
            <h3>Report Information</h3>
            <div className="info-items">
              <div className="info-item">
                <span className="info-label">Monthly Report:</span>
                <span>Attendance data for current month</span>
              </div>
              <div className="info-item">
                <span className="info-label">Weekly Report:</span>
                <span>Attendance data for current week</span>
              </div>
              <div className="info-item">
                <span className="info-label">Custom Range:</span>
                <span>Attendance data for selected dates</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

export default Reports
