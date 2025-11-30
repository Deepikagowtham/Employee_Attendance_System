"use client"

import { useEffect, useState } from "react"
import Layout from "../../components/common/Layout"
import Card from "../../components/common/Card"
import Table from "../../components/common/Table"
import Badge from "../../components/common/Badge"
import Input from "../../components/common/Input"
import managerService from "../../services/managerService"
import "./manager.css"

const AllAttendance = () => {
  const [attendance, setAttendance] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    employeeName: "",
    status: "",
    date: "",
  })

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await managerService.getAllAttendance()
        setAttendance(response.data)
        setFiltered(response.data)
      } catch (err) {
        console.error("Error fetching attendance:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    let result = attendance

    if (filters.employeeName) {
      result = result.filter((r) => r.employeeName.toLowerCase().includes(filters.employeeName.toLowerCase()))
    }

    if (filters.status) {
      result = result.filter((r) => r.status === filters.status)
    }

    if (filters.date) {
      result = result.filter((r) => r.date === filters.date)
    }

    setFiltered(result)
  }, [filters, attendance])

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const columns = [
    { key: "employeeName", label: "Employee" },
    { key: "department", label: "Department" },
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
    <Layout userRole="manager">
      <div className="page-container">
        <h1>All Employee Attendance</h1>

        <Card padding="lg" className="filter-card">
          <h3>Filters</h3>
          <div className="filter-grid">
            <Input
              label="Employee Name"
              placeholder="Search employee..."
              name="employeeName"
              value={filters.employeeName}
              onChange={handleFilterChange}
            />

            <div className="filter-group">
              <label>Status</label>
              <select name="status" value={filters.status} onChange={handleFilterChange} className="input">
                <option value="">All Status</option>
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="late">Late</option>
              </select>
            </div>

            <Input label="Date" type="date" name="date" value={filters.date} onChange={handleFilterChange} />
          </div>
        </Card>

        <Card padding="lg">
          <h2>Attendance Records</h2>
          <Table columns={columns} data={filtered} loading={loading} />
        </Card>
      </div>
    </Layout>
  )
}

export default AllAttendance
