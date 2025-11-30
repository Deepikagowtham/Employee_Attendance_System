import { createSlice } from "@reduxjs/toolkit"

const getUserFromStorage = () => {
  try {
    const userData = localStorage.getItem("user_data")
    return userData ? JSON.parse(userData) : null
  } catch (err) {
    return null
  }
}

const initialState = {
  user: getUserFromStorage(),
  token: localStorage.getItem("auth_token") || null,
  isAuthenticated: !!localStorage.getItem("auth_token"),
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Login Start
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },

    // Login Success
    loginSuccess: (state, action) => {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload.user
      state.token = action.payload.token
      localStorage.setItem("auth_token", action.payload.token)
      localStorage.setItem("user_data", JSON.stringify(action.payload.user))
    },

    // Login Failure
    loginFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.isAuthenticated = false
    },

    // Register Success
    registerSuccess: (state, action) => {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload.user
      state.token = action.payload.token
      localStorage.setItem("auth_token", action.payload.token)
      localStorage.setItem("user_data", JSON.stringify(action.payload.user))
    },

    // Logout
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
      localStorage.removeItem("auth_token")
      localStorage.removeItem("user_data")
    },

    // Set User from localStorage
    setUserFromStorage: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      state.loading = false
    },

    // Clear error
    clearError: (state) => {
      state.error = null
    },

    // Update user
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }
      localStorage.setItem("user_data", JSON.stringify(state.user))
    },
  },
})

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerSuccess,
  logout,
  setUserFromStorage,
  clearError,
  updateUser,
} = authSlice.actions

export default authSlice.reducer
