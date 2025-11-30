// Mock data for development and testing

export const mockAuthData = {
  registerSuccess: {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6ImVtcCIsInJvbGUiOiJlbXBsb3llZSJ9.test",
    user: {
      id: "1",
      name: "John Doe",
      email: "employee@example.com",
      role: "employee",
      department: "Engineering",
      joinDate: "2024-01-15",
    },
  },
  loginSuccess: {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6ImVtcCIsInJvbGUiOiJlbXBsb3llZSJ9.test",
    user: {
      id: "1",
      name: "John Doe",
      email: "employee@example.com",
      role: "employee",
      department: "Engineering",
      joinDate: "2024-01-15",
    },
  },
  managerLoginSuccess: {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU1IiwiZW1haWwiOiJtYW4iLCJyb2xlIjoibWFuYWdlciJ9.test",
    user: {
      id: "55",
      name: "Jane Manager",
      email: "manager@example.com",
      role: "manager",
      department: "HR",
      joinDate: "2023-05-10",
      teamSize: 15,
    },
  },
}

export const mockAttendanceData = {
  checkInSuccess: {
    status: "success",
    message: "Checked in successfully",
    timestamp: new Date().toISOString(),
    checkInTime: "09:30:00",
  },
  checkOutSuccess: {
    status: "success",
    message: "Checked out successfully",
    timestamp: new Date().toISOString(),
    checkOutTime: "18:30:00",
  },
  history: [
    {
      id: "1",
      date: "2024-11-29",
      checkIn: "09:15:00",
      checkOut: "18:45:00",
      status: "present",
      workingHours: "9h 30m",
    },
    {
      id: "2",
      date: "2024-11-28",
      checkIn: "09:35:00",
      checkOut: "18:30:00",
      status: "late",
      workingHours: "8h 55m",
    },
    {
      id: "3",
      date: "2024-11-27",
      checkIn: null,
      checkOut: null,
      status: "absent",
      workingHours: "0h",
    },
    {
      id: "4",
      date: "2024-11-26",
      checkIn: "09:00:00",
      checkOut: "18:00:00",
      status: "present",
      workingHours: "9h 0m",
    },
    {
      id: "5",
      date: "2024-11-25",
      checkIn: "09:05:00",
      checkOut: "17:30:00",
      status: "present",
      workingHours: "8h 25m",
    },
  ],
  monthlySummary: {
    month: 11,
    year: 2024,
    present: 18,
    absent: 2,
    late: 3,
    onLeave: 1,
    totalDays: 24,
  },
  todayStatus: {
    date: new Date().toISOString().split("T")[0],
    checkedIn: true,
    checkInTime: "09:30:00",
    checkedOut: false,
    checkOutTime: null,
    status: "present",
  },
}

export const mockManagerData = {
  allAttendance: [
    {
      id: "1",
      employeeId: "1",
      employeeName: "John Doe",
      department: "Engineering",
      date: "2024-11-29",
      checkIn: "09:15:00",
      checkOut: "18:45:00",
      status: "present",
      workingHours: "9h 30m",
    },
    {
      id: "2",
      employeeId: "2",
      employeeName: "Alice Smith",
      department: "Marketing",
      date: "2024-11-29",
      checkIn: "09:35:00",
      checkOut: "18:30:00",
      status: "late",
      workingHours: "8h 55m",
    },
    {
      id: "3",
      employeeId: "3",
      employeeName: "Bob Johnson",
      department: "Engineering",
      date: "2024-11-29",
      checkIn: null,
      checkOut: null,
      status: "absent",
      workingHours: "0h",
    },
    {
      id: "4",
      employeeId: "4",
      employeeName: "Carol White",
      department: "Finance",
      date: "2024-11-29",
      checkIn: "09:00:00",
      checkOut: "18:00:00",
      status: "present",
      workingHours: "9h 0m",
    },
    {
      id: "5",
      employeeId: "5",
      employeeName: "David Brown",
      department: "HR",
      date: "2024-11-29",
      checkIn: "09:05:00",
      checkOut: "17:30:00",
      status: "present",
      workingHours: "8h 25m",
    },
  ],
  employeeAttendance: [
    {
      id: "1",
      date: "2024-11-29",
      checkIn: "09:15:00",
      checkOut: "18:45:00",
      status: "present",
    },
    {
      id: "2",
      date: "2024-11-28",
      checkIn: "09:35:00",
      checkOut: "18:30:00",
      status: "late",
    },
  ],
  teamSummary: {
    totalEmployees: 15,
    presentToday: 12,
    absentToday: 2,
    lateToday: 1,
    onLeaveToday: 0,
  },
  todayStatus: [
    { employeeId: "1", name: "John Doe", status: "present", checkInTime: "09:15" },
    { employeeId: "2", name: "Alice Smith", status: "late", checkInTime: "09:35" },
    { employeeId: "3", name: "Bob Johnson", status: "absent", checkInTime: null },
  ],
  csvData: `Employee Name,Department,Date,Check In,Check Out,Status,Working Hours
John Doe,Engineering,2024-11-29,09:15,18:45,Present,9h 30m
Alice Smith,Marketing,2024-11-29,09:35,18:30,Late,8h 55m
Bob Johnson,Engineering,2024-11-29,,,Absent,0h`,
}
