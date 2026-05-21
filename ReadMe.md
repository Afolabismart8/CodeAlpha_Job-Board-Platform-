# Job Board Platform API

A production-style backend API for a Job Board Platform built with Node.js, Express.js, and MongoDB. The platform supports authentication, role-based access control, job management, job applications, resume uploads, and admin management features.

---

# 🚀 Features

## 🔐 Authentication & Authorization
- User registration and login
- JWT authentication
- Protected routes
- Role-based access control
  - Admin
  - Employer
  - Candidate

---

## 💼 Job Management
- Employers can create job listings
- Get all jobs with:
  - pagination
  - filtering
  - keyword search
- Get single job details

---

## 📄 Job Applications
- Candidates can apply for jobs
- Prevent duplicate applications
- Employers can:
  - view applications
  - update application status

### Application statuses:
- Pending
- Reviewed
- Shortlisted
- Rejected
- Accepted

---

## 📁 Resume Upload
- Resume upload using Multer
- Local file storage
- Candidate resume management

---

## 🛠️ Admin Features
- View all users
- View all jobs
- Application statistics
- User and job management

---

# 🧰 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- bcryptjs
- dotenv

---

# 📂 Project Structure

```txt
src/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── uploads/
├── utils/
├── config/
└── server.js
```

---

# ⚙️ Installation & Setup

## 1. Clone Repository

```bash
git clone <your-repository-url>
```

## 2. Navigate Into Project

```bash
cd job-board-platform
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Create Environment Variables

Create a `.env` file in the root directory:

```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## 5. Start Development Server

```bash
npm run dev
```

Server runs on:

```txt
http://localhost:8080
```

---

# 📌 API Endpoints

## 🔐 Authentication

### Register User
```http
POST /api/register
```

### Login User
```http
POST /api/login
```

---

## 💼 Jobs

### Create Job
```http
POST /api/
```

### Get All Jobs
```http
GET /api/
```

### Get Single Job
```http
GET /api/:id
```

### Apply For Job
```http
POST /api/:id/apply
```

### Get Job Applications
```http
GET /api/:id/applications
```

### Update Application Status
```http
PATCH /api/applications/:id/status
```

---

## 📁 Resume Upload

### Upload Resume
```http
POST /api/upload-resume
```

---

## 🛠️ Admin

### Get Users
```http
GET /api/users
```

### Get Jobs
```http
GET /api/jobs
```

### Get Platform Statistics
```http
GET /api/stats
```

---

# 🔎 Job Search & Filters

Supported query parameters:

```http
GET /api/jobs?location=Lagos
GET /api/jobs?jobType=full-time
GET /api/jobs?category=backend
GET /api/jobs?search=node
GET /api/jobs?page=1&limit=10
```

---

# 🔒 Security Features

- Password hashing with bcryptjs
- JWT authentication
- Protected API routes
- Role-based authorization
- Duplicate application prevention

---

# 🧪 Testing

API testing was completed using:
- Postman

Tested features include:
- Authentication
- Protected routes
- Job CRUD operations
- Resume uploads
- Job applications
- Application status updates
- Admin endpoints

---

# 📈 Future Improvements

- Cloudinary/AWS S3 resume storage
- Email notifications
- Real-time messaging
- Advanced analytics dashboard
- Docker support
- CI/CD integration

---

# 👨‍💻 Author

Built by Yusuf Afolabi

---

# 📄 License

This project is open-source and available for learning and development purposes.