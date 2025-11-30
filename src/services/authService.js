import apiClient from "./api"
import { mockAuthData } from "./mockData"

// Real API call
export const authService = {
  // Employee Register
  registerEmployee: async (data) => {
    try {
      // Simulate API call - Replace with real API when backend ready
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: mockAuthData.registerSuccess })
        }, 1000)
      })
      // Real implementation: return apiClient.post('/auth/register', data)
    } catch (error) {
      throw error.response?.data || { message: "Registration failed" }
    }
  },

  // Employee Login
  loginEmployee: async (email, password) => {
    try {
      // Simulate API call - Replace with real API when backend ready
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: mockAuthData.loginSuccess })
        }, 1000)
      })
      // Real implementation: return apiClient.post('/auth/login', { email, password, role: 'employee' })
    } catch (error) {
      throw error.response?.data || { message: "Login failed" }
    }
  },

  // Manager Login
  loginManager: async (email, password) => {
    try {
      // Simulate API call - Replace with real API when backend ready
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: mockAuthData.managerLoginSuccess })
        }, 1000)
      })
      // Real implementation: return apiClient.post('/auth/login', { email, password, role: 'manager' })
    } catch (error) {
      throw error.response?.data || { message: "Login failed" }
    }
  },

  // Get current user
  getMe: async () => {
    try {
      return apiClient.get("/auth/me")
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch user" }
    }
  },
}

export default authService
