# BloomTrack - Setup & Run Guide

## Fixed Issues

### 1. **Backend Issues (Node.js/Express)**
   - ✅ Fixed deprecated `habit.remove()` method → replaced with `findOneAndDelete()`
   - ✅ All routes properly configured (auth, habits)
   - ✅ MongoDB connection setup with proper error handling
   - ✅ JWT authentication middleware implemented
   - ✅ Password hashing with bcrypt working correctly

### 2. **Frontend Issues (React)**
   - ✅ Added missing `postcss.config.js` for Tailwind CSS compilation
   - ✅ Tailwind CSS configuration properly set up in `tailwind.config.js`
   - ✅ Created `.env` file in frontend directory with proper API URL
   - ✅ All React components properly structured
   - ✅ Context API for authentication set up correctly

### 3. **Dependencies**
   - ✅ All npm packages installed successfully
   - ✅ Backend dependencies: express, mongoose, bcryptjs, jsonwebtoken, cors, dotenv
   - ✅ Frontend dependencies: react, react-dom, react-router-dom, axios, react-scripts

### 4. **Configuration Files**
   - ✅ `.env` file in root directory with MongoDB URI and JWT secret
   - ✅ `frontend/.env` created for React environment variables
   - ✅ `.gitignore` files created for both root and frontend
   - ✅ `postcss.config.js` created for Tailwind CSS processing

## How to Run

### Start Backend Server
```bash
cd c:\Users\Vincent Choka\Desktop\BloomTrack
npm run dev
```
Server will run on: `http://localhost:5000`

### Start Frontend (in a new terminal)
```bash
cd c:\Users\Vincent Choka\Desktop\BloomTrack\frontend
npm start
```
Frontend will run on: `http://localhost:3000`

## Environment Variables

### Backend (.env)
- `PORT=5000` - Server port
- `MONGODB_URI=mongodb+srv://...` - MongoDB connection string
- `JWT_SECRET=7ELz7nNLrIuRdkna` - JWT signing secret
- `NODE_ENV=development` - Environment
- `CLIENT_URL=http://localhost:3000` - Frontend URL

### Frontend (.env)
- `REACT_APP_API_URL=http://localhost:5000/api` - Backend API URL

## Application Features

✅ User authentication (Register, Login, Logout)
✅ Create, Read, Update, Delete habits
✅ Mark habits as complete daily
✅ Track streaks for habit consistency
✅ View statistics (total habits, completion rate, active streak)
✅ Motivational quotes on dashboard
✅ Responsive design with Tailwind CSS
✅ Protected routes for authenticated users

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/profile` - Get user profile (protected)

### Habits
- `GET /api/habits` - Get all habits (protected)
- `GET /api/habits/:id` - Get single habit (protected)
- `POST /api/habits` - Create habit (protected)
- `PUT /api/habits/:id` - Update habit (protected)
- `DELETE /api/habits/:id` - Delete habit (protected)
- `PUT /api/habits/:id/complete` - Mark habit complete (protected)
- `GET /api/habits/stats` - Get user statistics (protected)

## Database Models

### User
- name, email, password (hashed), timestamps

### Habit
- title, description, frequency (daily/weekly), userId, completedDates, isActive, timestamps

## All Errors Fixed! ✅

The application is now ready to run without any errors.
