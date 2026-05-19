# Team Task Manager 

A professional full-stack task management application built with the MERN stack. This application allows teams to manage projects, track tasks, and collaborate through a central dashboard.

##  Features

- **Authentication**: Secure JWT-based login and signup.
- **Roles**: Support for Admin and Member roles.
- **Projects**: Create projects and manage team membership.
- **Tasks**: Create, assign, and track tasks (Todo, In Progress, Done).
- **Dashboard**: Live overview of projects and tasks for the logged-in user.
- **Responsive**: Fully responsive vanilla CSS UI that works on desktop and mobile devices.

---

##  Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Security**: JWT (JSON Web Tokens), Bcrypt.js
- **Styling**: Vanilla CSS

---

##  Folder Structure

- `server/`: Express.js backend containing configuration, models, controllers, and API routes.
- `client/`: React.js frontend containing components, pages, and UI styles.
- `package.json`: Monorepo root configuration to handle unified install, build, and run commands.

---

##  Local Installation and Setup

Since this is a monorepo setup, you can manage both the client and server directly from the root directory using standard npm commands.

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas URL)

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ITSSONAM-0/Team-Task-Manager-Full-Stack-.git
   cd Team-Task-Manager-Full-Stack-
   ```

2. **Configure Environment Variables:**
   Create a `.env` file inside the `server/` directory:
   ```env
   MONGO_URI=your_mongodb_atlas_or_local_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

3. **Install all dependencies (Client & Server):**
   Run the unified installer script from the root folder:
   ```bash
   npm run install-all
   ```

4. **Run the Application:**
   - To run the backend server:
     ```bash
     cd server && npm start
     ```
   - To run the frontend development server:
     ```bash
     cd client && npm start
     ```

---

##  Deployment on Railway

This project is fully optimized for a unified single-service deployment on **Railway** (or other PaaS platforms).

### Deployment Architecture
- In production, the React frontend is compiled into static files (`client/build`) during the build process.
- The Node.js Express server (`server/server.js`) automatically serves these static client files.
- The entire application runs on a single port, eliminating CORS issues.

### Railway Setup Steps:
1. Connect your GitHub repository to Railway.
2. Railway will automatically detect the root `package.json` and build the project using Nixpacks.
3. Go to the **Variables** tab in your Railway service and add the following Environment Variables:
   - `MONGO_URI`: Your MongoDB connection string.
   - `JWT_SECRET`: Any random security string for generating auth tokens.
   - `NODE_ENV`: `production`
4. Go to the **Settings** tab and under **Networking/Domains**, click **Generate Domain** to get your public live application URL!
