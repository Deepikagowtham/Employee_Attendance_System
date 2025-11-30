"use client"

import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import Layout from "../../components/common/Layout"
import Card from "../../components/common/Card"
import Table from "../../components/common/Table"
import Badge from "../../components/common/Badge"
import { fetchHistorySuccess, setMonthlyStats } from "../../store/attendanceSlice"
import attendanceService from "../../services/attendanceService"
import "./employee.css"

const AttendanceHistory = () => {
  const dispatch = useDispatch()
  const [history, setHistory] = useState([])
  const [monthlyStats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const historyResponse = await attendanceService.getHistory()
        setHistory(historyResponse.data)
        dispatch(fetchHistorySuccess(historyResponse.data))

        const summaryResponse = await attendanceService.getMonthlySummary(month, year)
        setStats(summaryResponse.data)
        dispatch(setMonthlyStats(summaryResponse.data))
      } catch (err) {
        console.error("Error fetching data:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [dispatch, month, year])

  const columns = [
    { key: "date", label: "Date" },
    { key: "checkIn", label: "Check In" },
    { key: "checkOut", label: "Check Out" },
    {
      key: "status",
      label: "Status",
      render: (status) => (
        <Badge variant={status === "present" ? "success" : status === "late" ? "warning" : "error"}>
          {status?.toUpperCase()}
        </Badge>
      ),
    },
    { key: "workingHours", label: "Working Hours" },
  ]

  return (
    <Layout userRole="employee">
      <div className="page-container">
        <h1>Attendance History</h1>

        {monthlyStats && (
          <div className="stats-grid-inline">
            <div className="stat-box">
              <label>Present</label>
              <p className="stat-num">{monthlyStats.present}</p>
            </div>
            <div className="stat-box">
              <label>Absent</label>
              <p className="stat-num">{monthlyStats.absent}</p>
            </div>
            <div className="stat-box">
              <label>Late</label>
              <p className="stat-num">{monthlyStats.late}</p>
            </div>
            <div className="stat-box">
              <label>On Leave</label>
              <p className="stat-num">{monthlyStats.onLeave}</p>
            </div>
          </div>
        )}

        <Card padding="lg">
          <div className="table-header">
            <h2>Attendance Records</h2>
            <div className="filter-controls">
              <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i + 1}>
                    {new Date(2024, i).toLocaleString("default", { month: "long" })}
                  </option>
                ))}
              </select>
              <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
                {[2023, 2024, 2025].map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Table columns={columns} data={history} loading={loading} />
        </Card>
      </div>
    </Layout>
  )
}

export default AttendanceHistory
