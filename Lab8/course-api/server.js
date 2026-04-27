const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const courseRouter = require('./routes/courseRouter');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/course-api';

// Parse incoming JSON request bodies.
app.use(express.json());

// Group all course endpoints under /api/courses.
app.use('/api/courses', courseRouter);

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Course Management REST API is running',
    data: null
  });
});

// Return a consistent response for unknown routes.
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    data: null
  });
});

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000
    });
    console.log('MongoDB connected successfully');

    app.listen(PORT, () => {
      console.log(`Server started successfully on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
};

startServer();
