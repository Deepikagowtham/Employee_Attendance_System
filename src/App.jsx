import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

// Pages
import EmployeeLogin from "./pages/auth/Login"
import EmployeeRegister from "./pages/auth/Register"
import EmployeeDashboard from "./pages/employee/Dashboard"
import MarkAttendance from "./pages/employee/MarkAttendance"
import AttendanceHistory from "./pages/employee/AttendanceHistory"
import EmployeeProfile from "./pages/employee/Profile"
import ManagerLogin from "./pages/manager/Login"
import ManagerDashboard from "./pages/manager/Dashboard"
import AllAttendance from "./pages/manager/AllAttendance"
import TeamCalendar from "./pages/manager/TeamCalendar"
import Reports from "./pages/manager/Reports"

// Components
import ProtectedRoute from "./components/common/ProtectedRoute"
import Loading from "./components/common/Loading"

function App() {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth)

  if (loading) {
    return <Loading />
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes - Employee */}
        <Route path="/employee/login" element={<EmployeeLogin />} />
        <Route path="/employee/register" element={<EmployeeRegister />} />

        {/* Public Routes - Manager */}
        <Route path="/manager/login" element={<ManagerLogin />} />

        {/* Protected Routes - Employee */}
        <Route
          path="/employee/dashboard"
          element={
            <ProtectedRoute requiredRole="employee">
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/mark-attendance"
          element={
            <ProtectedRoute requiredRole="employee">
              <MarkAttendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/attendance-history"
          element={
            <ProtectedRoute requiredRole="employee">
              <AttendanceHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/profile"
          element={
            <ProtectedRoute requiredRole="employee">
              <EmployeeProfile />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes - Manager */}
        <Route
          path="/manager/dashboard"
          element={
            <ProtectedRoute requiredRole="manager">
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/all-attendance"
          element={
            <ProtectedRoute requiredRole="manager">
              <AllAttendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/team-calendar"
          element={
            <ProtectedRoute requiredRole="manager">
              <TeamCalendar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/reports"
          element={
            <ProtectedRoute requiredRole="manager">
              <Reports />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="/" element={<Navigate to="/employee/login" replace />} />
        <Route path="*" element={<Navigate to="/employee/login" replace />} />
      </Routes>
    </Router>
  )
}

export default App
