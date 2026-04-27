const mongoose = require('mongoose');

// Course documents represent sellable learning content, similar to Udemy courses.
const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true
    },
    instructorName: {
      type: String,
      required: [true, 'Instructor name is required'],
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true
    },
    enrolledStudents: {
      type: Number,
      default: 0,
      min: [0, 'Enrolled students cannot be negative']
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Course', courseSchema);
