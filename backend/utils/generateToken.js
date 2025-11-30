import jwt from "jsonwebtoken"

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
      employeeId: user.employeeId,
    },
    process.env.JWT_SECRET || "your_secret_key",
    { expiresIn: "7d" },
  )
}
