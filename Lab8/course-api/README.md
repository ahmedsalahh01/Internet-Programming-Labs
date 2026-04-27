# Course API

A Course Management REST API similar to Udemy, built with Express.js, MongoDB, Mongoose, dotenv, and Express Router.

## Folder Structure

```text
course-api/
  server.js
  routes/
    courseRouter.js
  models/
    Course.js
  package.json
  .env
  README.md
```

## Setup

Run these commands from inside the `course-api` folder:

```bash
npm init -y
npm install express mongoose dotenv
npm install --save-dev nodemon
```

This project already includes the final `package.json`, so after downloading or cloning it you can simply run:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/course-api
```

Make sure MongoDB is running locally before starting the server.

## Run

Start in production mode:

```bash
npm start
```

Start in development mode with nodemon:

```bash
npm run dev
```

The API runs at:

```text
http://localhost:3000
```

## Course Schema

```js
{
  title: String, // required
  description: String, // required
  instructorName: String, // required
  price: Number, // required
  category: String, // required
  enrolledStudents: Number // default: 0
}
```

Example categories:

- Web Development
- Design
- Marketing

## API Endpoints

All responses follow this JSON shape:

```json
{
  "success": true,
  "message": "...",
  "data": {}
}
```

### Get all courses

```http
GET /api/courses
```

Success status: `200`

### Get one course

```http
GET /api/courses/:id
```

Success status: `200`

Not found status: `404`

### Create a course

```http
POST /api/courses
Content-Type: application/json
```

Sample body:

```json
{
  "title": "React for Beginners",
  "description": "Learn React from scratch",
  "instructorName": "Ahmed Ali",
  "price": 499,
  "category": "Web Development"
}
```

Success status: `201`

Validation error status: `400`

### Update a course

```http
PUT /api/courses/:id
Content-Type: application/json
```

Sample body:

```json
{
  "price": 599,
  "enrolledStudents": 25
}
```

Success status: `200`

Not found status: `404`

### Delete a course

```http
DELETE /api/courses/:id
```

Success status: `200`

Not found status: `404`

## Test With cURL

Create a course:

```bash
curl -X POST http://localhost:3000/api/courses \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"React for Beginners\",\"description\":\"Learn React from scratch\",\"instructorName\":\"Ahmed Ali\",\"price\":499,\"category\":\"Web Development\"}"
```

Get all courses:

```bash
curl http://localhost:3000/api/courses
```

Get one course:

```bash
curl http://localhost:3000/api/courses/COURSE_ID
```

Update a course:

```bash
curl -X PUT http://localhost:3000/api/courses/COURSE_ID \
  -H "Content-Type: application/json" \
  -d "{\"price\":599,\"enrolledStudents\":25}"
```

Delete a course:

```bash
curl -X DELETE http://localhost:3000/api/courses/COURSE_ID
```
