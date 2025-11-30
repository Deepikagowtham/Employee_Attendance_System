"use client"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Layout from "../../components/common/Layout"
import Card from "../../components/common/Card"
import Button from "../../components/common/Button"
import Input from "../../components/common/Input"
import { updateUser } from "../../store/authSlice"
import "./employee.css"

const EmployeeProfile = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState(user || {})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    dispatch(updateUser(formData))
    setEditMode(false)
  }

  return (
    <Layout userRole="employee">
      <div className="page-container">
        <h1>My Profile</h1>

        <div className="profile-grid">
          <Card padding="lg" className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar">{user?.name?.charAt(0)}</div>
              <div>
                <h2>{user?.name}</h2>
                <p className="profile-role">{user?.role?.toUpperCase()}</p>
              </div>
            </div>

            {!editMode ? (
              <div className="profile-info">
                <div className="info-row">
                  <label>Email</label>
                  <p>{user?.email}</p>
                </div>
                <div className="info-row">
                  <label>Department</label>
                  <p>{user?.department}</p>
                </div>
                <div className="info-row">
                  <label>Join Date</label>
                  <p>{user?.joinDate}</p>
                </div>
                <Button variant="primary" onClick={() => setEditMode(true)}>
                  Edit Profile
                </Button>
              </div>
            ) : (
              <div className="profile-form">
                <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} />
                <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
                <Input label="Department" name="department" value={formData.department} onChange={handleChange} />
                <div className="button-group">
                  <Button variant="success" onClick={handleSave}>
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setEditMode(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </Layout>
  )
}

export default EmployeeProfile
