import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  employees: [],
  allAttendance: [],
  teamSummary: {
    totalEmployees: 0,
    presentToday: 0,
    absentToday: 0,
    lateToday: 0,
  },
  filteredAttendance: [],
  loading: false,
  error: null,
}

const managerSlice = createSlice({
  name: "manager",
  initialState,
  reducers: {
    // Fetch Start
    fetchStart: (state) => {
      state.loading = true
      state.error = null
    },

    // Fetch Success
    fetchSuccess: (state, action) => {
      state.loading = false
      state.allAttendance = action.payload
    },

    // Fetch Failure
    fetchFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    // Set Employees
    setEmployees: (state, action) => {
      state.employees = action.payload
    },

    // Set Team Summary
    setTeamSummary: (state, action) => {
      state.teamSummary = action.payload
    },

    // Set Filtered Attendance
    setFilteredAttendance: (state, action) => {
      state.filteredAttendance = action.payload
    },

    // Clear error
    clearError: (state) => {
      state.error = null
    },
  },
})

export const {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  setEmployees,
  setTeamSummary,
  setFilteredAttendance,
  clearError,
} = managerSlice.actions

export default managerSlice.reducer
