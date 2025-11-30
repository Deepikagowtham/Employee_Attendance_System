import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  attendanceList: [],
  attendanceHistory: [],
  monthlyStats: {
    present: 0,
    absent: 0,
    late: 0,
    onLeave: 0,
  },
  todayStatus: null,
  loading: false,
  error: null,
}

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    // Fetch History Start
    fetchHistoryStart: (state) => {
      state.loading = true
      state.error = null
    },

    // Fetch History Success
    fetchHistorySuccess: (state, action) => {
      state.loading = false
      state.attendanceHistory = action.payload
    },

    // Fetch History Failure
    fetchHistoryFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    // Check In/Out Success
    checkInOutSuccess: (state, action) => {
      state.todayStatus = action.payload
      state.error = null
    },

    // Monthly Stats
    setMonthlyStats: (state, action) => {
      state.monthlyStats = action.payload
    },

    // Set Today Status
    setTodayStatus: (state, action) => {
      state.todayStatus = action.payload
    },

    // Clear error
    clearError: (state) => {
      state.error = null
    },
  },
})

export const {
  fetchHistoryStart,
  fetchHistorySuccess,
  fetchHistoryFailure,
  checkInOutSuccess,
  setMonthlyStats,
  setTodayStatus,
  clearError,
} = attendanceSlice.actions

export default attendanceSlice.reducer
