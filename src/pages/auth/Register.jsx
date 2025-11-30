"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { loginStart, registerSuccess, loginFailure } from "../../store/authSlice"
import authService from "../../services/authService"
import Button from "../../components/common/Button"
import Input from "../../components/common/Input"
import Card from "../../components/common/Card"
import "./auth.css"

const EmployeeRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
  })
  const [errors, setErrors] = useState({})

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.auth)

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name) newErrors.name = "Name is required"
    if (!formData.email) newErrors.email = "Email is required"
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email"
    if (!formData.password) newErrors.password = "Password is required"
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters"
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"
    if (!formData.department) newErrors.department = "Department is required"
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      dispatch(loginStart())
      setErrors({})
      const response = await authService.registerEmployee(formData)
      dispatch(registerSuccess(response.data))
      navigate("/employee/dashboard")
    } catch (err) {
      dispatch(loginFailure(err.message || "Registration failed"))
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-header">
          <h1>Join Our Team</h1>
          <p>Create your account to start tracking attendance</p>
        </div>
      </div>

      <div className="auth-right">
        <Card className="auth-card" padding="lg">
          <h2 className="auth-title">Employee Registration</h2>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleRegister}>
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              required
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />

            <div className="form-group">
              <label>Department</label>
              <select name="department" value={formData.department} onChange={handleChange} className="input">
                <option value="">Select Department</option>
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
                <option value="HR">HR</option>
              </select>
            </div>

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
            />

            <Button variant="primary" type="submit" fullWidth loading={loading} size="lg">
              Create Account
            </Button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account? <Link to="/employee/login">Login here</Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default EmployeeRegister
