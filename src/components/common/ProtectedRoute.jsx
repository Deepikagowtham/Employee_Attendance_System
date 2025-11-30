import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import Loading from "./Loading"

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth)

  if (loading) {
    return <Loading />
  }

  console.log(
    "[v0] Route Protection Check - isAuthenticated:",
    isAuthenticated,
    "user:",
    user,
    "requiredRole:",
    requiredRole,
  )

  if (!isAuthenticated) {
    return <Navigate to="/employee/login" replace />
  }

  if (requiredRole && user?.role !== requiredRole) {
    console.log("[v0] Role mismatch - user role:", user?.role, "required:", requiredRole)
    const loginPath = requiredRole === "manager" ? "/manager/login" : "/employee/login"
    return <Navigate to={loginPath} replace />
  }

  return children
}

export default ProtectedRoute
