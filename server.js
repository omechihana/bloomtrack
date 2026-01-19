const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Global database flag
global.useInMemoryDb = false;

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/bloomtrack';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
})
.then(() => {
  console.log('✓ MongoDB connected successfully');
  global.useInMemoryDb = false;

  // Optional: create a test document to verify DB connection
  const testSchema = new mongoose.Schema({ name: String });
  const Test = mongoose.model('Test', testSchema);
  Test.create({ name: 'Omega' })
    .then(() => console.log('Test document added'))
    .catch(() => {}); // Ignore if already exists
})
.catch(err => {
  console.error('✗ MongoDB connection error:', err.message);
  console.log('⚠️  Using in-memory database for development');
  global.useInMemoryDb = true;
});

// Health check route
app.get('/health', (req, res) => {
  const status = global.useInMemoryDb ? 'Using in-memory DB' : 'MongoDB connected';
  res.json({ status: `Backend is running. ${status}` });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/habits', require('./routes/habits'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
