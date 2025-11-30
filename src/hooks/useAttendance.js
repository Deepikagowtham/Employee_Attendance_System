"use client"

import { useSelector, useDispatch } from "react-redux"
import { setTodayStatus, setMonthlyStats } from "../store/attendanceSlice"
import attendanceService from "../services/attendanceService"
import { useState } from "react"

/**
 * Custom hook for attendance operations
 * Provides attendance data and common operations
 */
export const useAttendance = () => {
  const dispatch = useDispatch()
  const { todayStatus, monthlyStats, attendanceHistory } = useSelector((state) => state.attendance)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchTodayStatus = async () => {
    setLoading(true)
    try {
      const response = await attendanceService.getTodayStatus()
      dispatch(setTodayStatus(response.data))
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchMonthlySummary = async (month, year) => {
    setLoading(true)
    try {
      const response = await attendanceService.getMonthlySummary(month, year)
      dispatch(setMonthlyStats(response.data))
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return {
    todayStatus,
    monthlyStats,
    attendanceHistory,
    loading,
    error,
    fetchTodayStatus,
    fetchMonthlySummary,
  }
}

export default useAttendance
