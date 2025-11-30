# 🚀 Employee Attendance System – MERN Stack

A complete full-stack employee management and attendance tracking system built using **MongoDB, Express.js, React (Vite), and Node.js**.

This project is ideal for college submissions, internships, and real-world deployment. It follows a **clean, modular, scalable** folder structure for easy development and maintenance.

---

## 📌 About the Project

The **Employee Attendance System** helps organizations manage employees, record attendance, process leave requests, and visualize attendance data.

This MERN application includes:

- Secure employee login & authentication  
- Daily Check-in / Check-out  
- Admin management dashboard  
- Attendance analytics  
- Leave management system  
- Modular React UI & optimized Express API  

---

## ⭐ Features

### 👥 Employee Features
- Login / Register account  
- Mark **Check-In**  
- Mark **Check-Out**  
- View attendance history  
- Apply for leave  
- Update personal profile  

### 🛠️ Admin Features
- Admin authentication  
- Add / Edit / Delete employees  
- View all employees  
- View daily & monthly attendance sheets  
- Approve / Reject leave requests  
- Dashboard with charts and insights  

### 💻 Tech Stack

**Frontend:**  
- React (Vite)  
- React Router  
- Axios  
- Tailwind CSS / Normal CSS  
- Context API or Redux (optional)

**Backend:**  
- Node.js  
- Express.js  
- MongoDB with Mongoose  
- JWT Authentication  
- bcrypt password hashing  
- CORS handling  

**Tools:**  
- Postman  
- dotenv  

---

## 📂 Project Folder Structure

### Frontend (React + Vite)

Employee_System/
│── node_modules/
│── public/
│── src/
│ ├── assets/
│ ├── components/
│ ├── pages/
│ ├── context/
│ ├── hooks/
│ ├── services/
│ ├── layouts/
│ ├── App.jsx
│ ├── main.jsx
│── package.json
│── vite.config.js
│── README.md


### Backend (Node + Express)


backend/
│── config/
│ └── db.js
│── controllers/
│── middleware/
│── models/
│── routes/
│── utils/
│── server.js
│── .env
│── package.json


---

# ⚙️ How to Set Up the Project (Step-by-Step)

## 1️⃣ Clone the Repository


git clone <your-github-repo-url>
cd Employee_System


---

## 2️⃣ Backend Setup

Go into the backend folder:


cd backend


Install backend dependencies:
npm install


Create `.env` file in `/backend`:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Start the backend server:
npm run dev

Backend will run at:
http://localhost:5000

## 3️⃣ Frontend Setup

Go back to main folder:
cd ..

Install frontend dependencies:
npm install

Start the React app:
npm run dev

Frontend runs at:
http://localhost:5173


---

# 🧪 API Testing (Postman)

Examples:

| Function | Method | Endpoint |
|---------|--------|----------|
| Employee Register | POST | `/api/auth/register` |
| Login | POST | `/api/auth/login` |
| Check-In | POST | `/api/attendance/checkin` |
| Check-Out | POST | `/api/attendance/checkout` |
| Get Attendance | GET | `/api/attendance/:id` |
| Admin Employees | GET | `/api/admin/employees` |

---

# 🔐 Authentication

- JWT is used for secure access tokens  
- Passwords hashed using **bcryptjs**  
- Protected routes require Authorization headers with token  



