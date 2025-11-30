"use client"

import { useSelector, useDispatch } from "react-redux"
import { logout, setUserFromStorage } from "../store/authSlice"
import { useEffect } from "react"

/**
 * Custom hook for authentication
 * Provides access to auth state and common auth operations
 */
export const useAuth = () => {
  const dispatch = useDispatch()
  const { user, token, isAuthenticated, loading, error } = useSelector((state) => state.auth)

  // Initialize auth from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token")
    const storedUser = localStorage.getItem("user_data")

    if (storedToken && storedUser) {
      try {
        dispatch(
          setUserFromStorage({
            token: storedToken,
            user: JSON.parse(storedUser),
          }),
        )
      } catch (err) {
        console.error("Error restoring auth:", err)
      }
    }
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
  }

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    logout: handleLogout,
  }
}

export default useAuth
