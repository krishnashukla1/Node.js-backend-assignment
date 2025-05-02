# Node.js Backend User and Document Management

A simple backend for user authentication, role-based document management, and ingestion job tracking using Express.js and PostgreSQL.

A backend service built with NodeJS that manages:
- User authentication with roles
- Document upload & CRUD operations
- Role-based access control (Admin, Editor, Viewer)
- Ingestion job triggering 

---

## ✅ Features

- User Registration & Login (JWT-based)
- Role-based Access: Admin, Editor, Viewer
- Upload & Manage Documents (PDF, DOCX file paths)
- Ingestion Job Trigger 
- Admin-only User Management (list, assign roles)
- PostgreSQL Database Integration

---

## 🛠 Tech Stack

- **Backend**: Node.js, Express
- **Database**: PostgreSQL (via Prisma or TypeORM)
- **Auth**: JWT
- **File Uploads**: Multer
- **API Docs**: Swagger
- **HTTP Calls**: Axios or HTTP Module

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Node.js-backend-assignment.git
cd Node.js-backend-assignment

2. Install Dependencies
npm install

3. Setup Environment Variables
Create a .env file in the root:
touch .env

Add the following:

PORT=3000
DATABASE_URL=postgresql://username:password@localhost:5432/yourdbname
JWT_SECRET=your_jwt_secret_key

4. Setup Database (PostgreSQL)
Make sure PostgreSQL is running.

5. Seed the Database (Optional for Testing)
To generate sample users and documents:

npm run seed
This will insert:

1000+ users
100,000+ documents

Modify the seed.ts or seed.sql as needed.

6. Start the Server

npm run start:dev
=================================================
📦 API Endpoints
You can test all endpoints using Postman or Swagger.

Swagger Documentation:
Open http://localhost:3000/api-docs

🧪 Running Tests
npm run test
=================================================
📂 Folder Structure

src/
├── auth/               # Auth logic (JWT)
├── users/              # User roles
├── documents/          # Document upload and CRUD
├── ingestion/          # Ingestion API simulation
├── middleware/         # Role, token checks
├── database/           # TypeORM config or   PostgreSQL (via Sequelize)
└── app.js             # Entry point

🧾 Sample Postman Requests
=================================================
🔐 Register
POST /auth/register

{
  "email": "test@example.com",
  "password": "password123",
  "role": "ADMIN"
}
=================================================
🔐 Login
POST /auth/login

{
  "email": "test@example.com",
  "password": "password123"
}
Returns JWT token.
=================================================
📄 Upload Document (Editor/Admin)
POST /documents

Header: Authorization: Bearer <token>
FormData: title, description, file (PDF/DOCX)
=================================================
🚀 Trigger Ingestion (Editor/Admin)
POST /ingestion

{
  "document_id": 5
}
=================================================
👥 List Users (Admin Only)

GET /users
Header: Authorization: Bearer <admin-token>


👨‍💻 Author
Krishna Shukla

