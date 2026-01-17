# BloomTrack - Habit Tracking Application

BloomTrack is a full-stack habit tracking application built with React, Node.js, Express, and MongoDB. It allows users to create, track, and manage their daily habits with progress statistics and motivational quotes.

## 🚀 Features

### Authentication System
- User registration with name, email, and password
- Secure login/logout functionality
- JWT-based authentication
- Password hashing with bcrypt

### Habit Management
- Create habits with title, description, and frequency (daily/weekly)
- View all user habits in a dashboard
- Update habit details
- Delete habits
- Data isolation per user

### Progress Tracking
- Mark habits as completed for the day
- Track completion streaks
- Monitor completion percentages
- View summary statistics on the dashboard
- Visualize progress with intuitive cards

### Statistics & Analytics
- Total habits counter
- Habits completed today
- Active streak tracking
- Overall completion rate
- Individual habit statistics

### Motivational Features
- Daily inspirational quotes from external API
- Visual progress indicators
- Achievement tracking

### Frontend UI
- Responsive design using Tailwind CSS
- Clean, modern interface
- Intuitive navigation
- Loading and error states
- Mobile-friendly layout

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime environment
- **Express** - Web framework for Node.js
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Token-based authentication
- **bcryptjs** - Password hashing
- **Axios** - HTTP client

### Frontend
- **React** - JavaScript library for UI
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls

## 📁 Project Structure

```
bloomtrack/
├── models/
│   ├── User.js
│   └── Habit.js
├── controllers/
│   ├── authController.js
│   └── habitController.js
├── routes/
│   ├── auth.js
│   └── habits.js
├── middleware/
│   └── auth.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── contexts/
│   ├── package.json
│   └── tailwind.config.js
├── server.js
├── package.json
└── .env
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local instance or Atlas)

### Installation

1. Clone the repository
2. Install backend dependencies:
```bash
npm install
```
3. Install frontend dependencies:
```bash
cd frontend
npm install
```
4. Create a `.env` file in the root directory with the following:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bloomtrack
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

### Running the Application

1. Start the backend server:
```bash
npm run dev
```
2. In a new terminal, start the frontend:
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api/

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/profile` - Get user profile

### Habits
- `GET /api/habits` - Get all habits for logged-in user
- `POST /api/habits` - Create a new habit
- `GET /api/habits/:id` - Get a specific habit
- `PUT /api/habits/:id` - Update a habit
- `DELETE /api/habits/:id` - Delete a habit
- `PUT /api/habits/:id/complete` - Mark habit as completed
- `GET /api/habits/stats` - Get user statistics

## 📊 Database Models

### User Model
- `_id`: ObjectId (Primary Key)
- `name`: String (Required)
- `email`: String (Required, Unique)
- `password`: String (Required, Hashed)
- `timestamps`: createdAt, updatedAt

### Habit Model
- `_id`: ObjectId (Primary Key)
- `title`: String (Required)
- `description`: String (Required)
- `frequency`: String (Required, Enum: 'daily', 'weekly')
- `userId`: ObjectId (Reference to User, Required)
- `completedDates`: Array of Objects (date, streakCount)
- `isActive`: Boolean (Default: true)
- `timestamps`: createdAt, updatedAt

## 🎨 UI Components

- **Navbar**: Navigation bar with authentication links
- **ProtectedRoute**: Route protection based on authentication
- **StatCard**: Displays statistics with icons
- **HabitCard**: Shows habit details with action buttons
- **LandingPage**: Homepage with app introduction
- **LoginPage**: User login form
- **SignupPage**: User registration form
- **DashboardPage**: Main dashboard with stats and habits
- **HabitFormPage**: Form for creating/editing habits

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- User data isolation
- Secure session management

## 📱 Responsive Design

The application is designed to be fully responsive and works on:
- Desktop screens
- Tablets
- Mobile devices

## 📈 Future Enhancements

- Push notifications for reminders
- Habit categorization
- Advanced analytics and insights
- Social sharing features
- Dark mode toggle
- Calendar view for habit history
- Email notifications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions, please create an issue in the repository.