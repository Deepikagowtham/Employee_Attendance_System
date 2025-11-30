"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { loginStart, loginSuccess, loginFailure } from "../../store/authSlice"
import authService from "../../services/authService"
import Button from "../../components/common/Button"
import Input from "../../components/common/Input"
import Card from "../../components/common/Card"
import "../auth/auth.css"

const ManagerLogin = () => {
  const [email, setEmail] = useState("manager@example.com")
  const [password, setPassword] = useState("password123")
  const [errors, setErrors] = useState({})

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.auth)

  const validateForm = () => {
    const newErrors = {}
    if (!email) newErrors.email = "Email is required"
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Invalid email"
    if (!password) newErrors.password = "Password is required"
    return newErrors
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      dispatch(loginStart())
      setErrors({})
      const response = await authService.loginManager(email, password)
      dispatch(loginSuccess(response.data))
      navigate("/manager/dashboard")
    } catch (err) {
      dispatch(loginFailure(err.message || "Login failed"))
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-header">
          <h1>Manager Portal</h1>
          <p>Manage your team attendance efficiently</p>
        </div>
      </div>

      <div className="auth-right">
        <Card className="auth-card" padding="lg">
          <h2 className="auth-title">Manager Login</h2>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleLogin}>
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              required
            />

            <Button variant="primary" type="submit" fullWidth loading={loading} size="lg">
              Sign In
            </Button>
          </form>

          <div className="auth-footer">
            <p>
              <Link to="/employee/login">Employee Login</Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default ManagerLogin
