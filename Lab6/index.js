const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let posts = [];
let nextId = 1;

function sendResponse(res, statusCode, success, data, message) {
  return res.status(statusCode).json({
    success,
    data,
    message
  });
}

function isBlank(value) {
  return typeof value !== "string" || value.trim() === "";
}

function findPostById(id) {
  return posts.find((post) => post.id === id);
}

// Create a new post.
app.post("/posts", (req, res) => {
  const { title, content } = req.body;

  if (isBlank(title) || isBlank(content)) {
    return sendResponse(
      res,
      400,
      false,
      null,
      "Title and content are required and cannot be empty."
    );
  }

  const post = {
    id: nextId,
    title: title.trim(),
    content: content.trim()
  };

  posts.push(post);
  nextId += 1;

  console.log("Created post:", post);

  return sendResponse(res, 201, true, post, "Post created successfully.");
});

// Get all posts.
app.get("/posts", (req, res) => {
  return sendResponse(res, 200, true, posts, "Posts returned successfully.");
});

// Get one post by id.
app.get("/posts/:id", (req, res) => {
  const id = Number(req.params.id);
  const post = findPostById(id);

  if (!post) {
    return sendResponse(res, 404, false, null, "Post not found.");
  }

  return sendResponse(res, 200, true, post, "Post returned successfully.");
});

// Update a post by id.
app.put("/posts/:id", (req, res) => {
  const id = Number(req.params.id);
  const post = findPostById(id);
  const { title, content } = req.body;

  if (!post) {
    return sendResponse(res, 404, false, null, "Post not found.");
  }

  if (title !== undefined && isBlank(title)) {
    return sendResponse(res, 400, false, null, "Title cannot be empty.");
  }

  if (content !== undefined && isBlank(content)) {
    return sendResponse(res, 400, false, null, "Content cannot be empty.");
  }

  if (title === undefined && content === undefined) {
    return sendResponse(
      res,
      400,
      false,
      null,
      "Provide title and/or content to update."
    );
  }

  if (title !== undefined) {
    post.title = title.trim();
  }

  if (content !== undefined) {
    post.content = content.trim();
  }

  console.log("Updated post:", post);

  return sendResponse(res, 200, true, post, "Post updated successfully.");
});

// Delete a post by id.
app.delete("/posts/:id", (req, res) => {
  const id = Number(req.params.id);
  const postIndex = posts.findIndex((post) => post.id === id);

  if (postIndex === -1) {
    return sendResponse(res, 404, false, null, "Post not found.");
  }

  const deletedPost = posts.splice(postIndex, 1)[0];

  console.log("Deleted post:", deletedPost);

  return sendResponse(res, 200, true, deletedPost, "Post deleted successfully.");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
