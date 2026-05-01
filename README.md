# Team Task Manager

A full-stack task management application built with the MERN stack. This application allows teams to manage projects, track tasks, and collaborate through a central dashboard.

## Features

- **Authentication**: Secure JWT-based login and signup.
- **Roles**: Support for Admin and Member roles.
- **Projects**: Create projects and manage team membership.
- **Tasks**: Create, assign, and track tasks (Todo, In Progress, Done).
- **Dashboard**: Overview of projects and tasks for the logged-in user.
- **Responsive**: Works on desktop and mobile devices.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Security**: JWT, Bcrypt.js
- **Styling**: Vanilla CSS

## Installation and Setup

### 1. Backend

1. Go to the `backend` directory.
2. Create a `.env` file:
   ```env
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
3. Run the following commands:
   ```bash
   npm install
   npm run dev
   ```

### 2. Frontend

1. Go to the `frontend` directory.
2. Run the following commands:
   ```bash
   npm install
   npm start
   ```

Note: The frontend is configured to connect to the backend at `http://localhost:5000/api` by default.

## Deployment

### Backend (Render)
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`
- Add environment variables (`MONGO_URI`, `JWT_SECRET`) in the Render dashboard.

### Frontend (Vercel)
- Root Directory: `frontend`
- Environment Variable: `REACT_APP_API_URL` set to your backend API URL.

## Folder Structure

- `backend/`: Server-side code, models, and routes.
- `frontend/`: React application and UI components.