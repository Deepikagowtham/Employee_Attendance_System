import jwt from "jsonwebtoken"

export const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]

  if (!token) {
    return res.status(401).json({ success: false, message: "No token provided" })
  }

  jwt.verify(token, process.env.JWT_SECRET || "your_secret_key", (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: "Invalid or expired token" })
    }
    req.user = user
    next()
  })
}

export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Unauthorized access" })
    }
    next()
  }
}
