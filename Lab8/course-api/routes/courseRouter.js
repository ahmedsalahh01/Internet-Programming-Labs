const express = require('express');
const mongoose = require('mongoose');
const Course = require('../models/Course');

const router = express.Router();

const sendResponse = (res, statusCode, success, message, data = null) => {
  res.status(statusCode).json({
    success,
    message,
    data
  });
};

const isInvalidObjectId = (id) => !mongoose.Types.ObjectId.isValid(id);

// GET /api/courses - Get all courses.
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    return sendResponse(res, 200, true, 'Courses retrieved successfully', courses);
  } catch (error) {
    return sendResponse(res, 500, false, 'Server error while retrieving courses');
  }
});

// GET /api/courses/:id - Get one course by MongoDB id.
router.get('/:id', async (req, res) => {
  try {
    if (isInvalidObjectId(req.params.id)) {
      return sendResponse(res, 400, false, 'Invalid course id');
    }

    const course = await Course.findById(req.params.id);

    if (!course) {
      return sendResponse(res, 404, false, 'Course not found');
    }

    return sendResponse(res, 200, true, 'Course retrieved successfully', course);
  } catch (error) {
    return sendResponse(res, 500, false, 'Server error while retrieving the course');
  }
});

// POST /api/courses - Create a new course.
router.post('/', async (req, res) => {
  try {
    const course = await Course.create(req.body);
    return sendResponse(res, 201, true, 'Course created successfully', course);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return sendResponse(res, 400, false, error.message);
    }

    return sendResponse(res, 500, false, 'Server error while creating the course');
  }
});

// PUT /api/courses/:id - Update any course field.
router.put('/:id', async (req, res) => {
  try {
    if (isInvalidObjectId(req.params.id)) {
      return sendResponse(res, 400, false, 'Invalid course id');
    }

    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!course) {
      return sendResponse(res, 404, false, 'Course not found');
    }

    return sendResponse(res, 200, true, 'Course updated successfully', course);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return sendResponse(res, 400, false, error.message);
    }

    return sendResponse(res, 500, false, 'Server error while updating the course');
  }
});

// DELETE /api/courses/:id - Delete a course by MongoDB id.
router.delete('/:id', async (req, res) => {
  try {
    if (isInvalidObjectId(req.params.id)) {
      return sendResponse(res, 400, false, 'Invalid course id');
    }

    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return sendResponse(res, 404, false, 'Course not found');
    }

    return sendResponse(res, 200, true, 'Course deleted successfully', course);
  } catch (error) {
    return sendResponse(res, 500, false, 'Server error while deleting the course');
  }
});

module.exports = router;
