import mongoose from "mongoose"

const attendanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: () => {
      const date = new Date()
      date.setHours(0, 0, 0, 0)
      return date
    },
  },
  checkInTime: {
    type: Date,
    default: null,
  },
  checkOutTime: {
    type: Date,
    default: null,
  },
  status: {
    type: String,
    enum: ["present", "absent", "late", "half-day", "leave"],
    default: "absent",
  },
  totalHours: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Prevent duplicate check-in on same day
attendanceSchema.index({ userId: 1, date: 1 }, { unique: true })

export default mongoose.model("Attendance", attendanceSchema)
