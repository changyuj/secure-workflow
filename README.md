# Secure Workflow Management API

A robust, secure backend service for managing business workflows, built with Node.js, Express, and MySQL. This project demonstrates security best practices including JWT authentication, role-based access control (RBAC), and request validation.

## 🚀 Features

- **Security First**: Implements `helmet` for secure headers and `cors` for cross-origin resource sharing.
- **Authentication**: Secure user registration and login using `bcryptjs` for password hashing and `jsonwebtoken` (JWT) for session management.
- **RBAC**: Role-based access control (Admin/Analyst) to protect sensitive workflow operations.
- **Rate Limiting**: Integrated protection against brute-force and DoS attacks using `express-rate-limit`.
- **Data Integrity**: Input validation using `Joi` schemas.
- **Containerized**: Ready for deployment with Docker.
- **Structured Logging**: Performance and error tracking with `winston`.

## 🛠 Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MySQL](https://www.mysql.com/)
- **Validation**: [Joi](https://joi.dev/)
- **Auth**: JWT & Bcryptjs
- **Testing**: [Jest](https://jestjs.io/) & [Supertest](https://github.com/visionmedia/supertest)

## 📋 Prerequisites

- Node.js (v16+)
- MySQL Server
- Docker (optional)

## ⚙️ Setup & Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd secure-workflow
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Database Configuration**
   - Create a MySQL database.
   - Run the initialization schema (ensure `users` and `workflows` tables are created).
   - Update your `.env` file with your credentials.

4. **Environment Variables**
   Create a `.env` file in the root directory:

   ```env
   PORT=4000
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=your_password
   DB_NAME=secure_workflow
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=1h
   ```

5. **Run the Application**

   ```bash
   # Development mode (with nodemon)
   npm run dev

   # Production mode
   npm start
   ```

## 🐳 Docker Usage

Build and run the container:

```bash
docker build -t secure-workflow .
docker run -p 4000:4000 --env-file .env secure-workflow
```

## 🔌 API Documentation

### Authentication

| Method | Endpoint             | Description           | Auth Required |
| :----- | :------------------- | :-------------------- | :------------ |
| POST   | `/api/auth/register` | Register a new user   | No            |
| POST   | `/api/auth/login`    | Login and receive JWT | No            |

### Workflows

| Method | Endpoint             | Description          | Auth Required | Role          |
| :----- | :------------------- | :------------------- | :------------ | :------------ |
| GET    | `/api/workflows`     | List all workflows   | Yes           | Any           |
| POST   | `/api/workflows`     | Create a workflow    | Yes           | Admin/Analyst |
| GET    | `/api/workflows/:id` | Get workflow details | Yes           | Any           |
| PUT    | `/api/workflows/:id` | Update a workflow    | Yes           | Admin         |

## 🧪 Testing

Run the automated test suite:

```bash
npm test
```

---

_Created for secure enterprise environments._
