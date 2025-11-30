import User from "../models/User.js"

export const generateEmployeeId = async (role) => {
  const prefix = role === "manager" ? "MGR" : "EMP"
  const count = await User.countDocuments({ role })
  return `${prefix}${String(count + 1).padStart(4, "0")}`
}
