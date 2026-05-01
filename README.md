# Team Task Manager

A full-stack task management application built with the MERN stack.
The app supports user authentication, role-based access, project creation, task tracking, and a clean dashboard experience.

## Project Overview

- Frontend: React
- Backend: Node.js + Express
- Database: MongoDB
- Authentication: JWT
- Features:
  - User signup and login
  - Admin/Member role support
  - Project creation and membership assignment
  - Task creation and status updates
  - Dashboard and task management views

## Folder Structure

- `backend/` – Express API server
- `frontend/` – React client application

## Local Setup

### 1. Backend

1. Open the `backend/` folder.
2. Copy `.env.example` to `.env`.
3. Set your environment values:
   - `MONGO_URI`
   - `JWT_SECRET`
4. Install dependencies and start the server:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

### 2. Frontend

1. Open the `frontend/` folder.
2. Install dependencies and start the client:
   ```bash
   cd frontend
   npm install
   npm start
   ```
3. By default the frontend makes API calls to:
   - `http://localhost:5000/api`

## Deployment Guide

### Backend Deployment (Render)

1. Push your repository to GitHub.
2. Create a new Web Service on Render.
3. Set the root directory to `backend`.
4. Set build command:
   ```bash
   npm install
   ```
5. Set start command:
   ```bash
   npm start
   ```
6. Add environment variables in Render:
   - `MONGO_URI`
   - `JWT_SECRET`
7. Deploy and save the Render service URL.

### Frontend Deployment (Vercel)

1. Create a new Vercel project and connect your repository.
2. Set the root directory to `frontend`.
3. Set build command:
   ```bash
   npm install && npm run build
   ```
4. Set output directory:
   ```bash
   build
   ```
5. Add environment variable in Vercel:
   - `REACT_APP_API_URL=https://your-backend-url/api`
6. Deploy the frontend.

## Configuration Notes

- `backend/.env` is only for local development.
- In production, set equivalent environment variables in your hosting platform.
- The frontend reads the backend URL from `REACT_APP_API_URL`.

## How to Use

1. Register a new user.
2. Login using the created account.
3. Create a project and assign members.
4. Create tasks and update statuses.
5. Use the dashboard to review current project activity.

## Important

- Do not commit real secrets to git.
- Keep `MONGO_URI` and `JWT_SECRET` private.

## Contact

For additional customization or deployment support, feel free to reach out.