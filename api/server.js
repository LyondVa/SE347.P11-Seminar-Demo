const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Helper function to read blogs from the JSON file
function getBlogs() {
  const data = fs.readFileSync("blogs.json");
  return JSON.parse(data);
}

// Helper function to write blogs to the JSON file
function saveBlogs(blogs) {
  fs.writeFileSync("blogs.json", JSON.stringify(blogs, null, 2));
}

// GET all blogs
app.get("/api/blogs", (req, res) => {
  res.json(getBlogs());
});

// GET a blog by ID
app.get("/api/blogs/:id", (req, res) => {
  const blogs = getBlogs();
  const blog = blogs.find((b) => b.id === parseInt(req.params.id));
  blog ? res.json(blog) : res.status(404).send("Blog not found");
});

// POST a new blog
app.post("/api/blogs", (req, res) => {
  const blogs = getBlogs();
  const newBlog = {
    id: blogs.length ? blogs[blogs.length - 1].id + 1 : 1,
    title: req.body.title,
    content: req.body.content,
  };
  blogs.push(newBlog);
  saveBlogs(blogs);
  res.status(201).json(newBlog);
});

// PUT (update) a blog
app.put("/api/blogs/:id", (req, res) => {
  const blogs = getBlogs();
  const blogIndex = blogs.findIndex((b) => b.id === parseInt(req.params.id));
  if (blogIndex === -1) return res.status(404).send("Blog not found");

  blogs[blogIndex] = { ...blogs[blogIndex], ...req.body };
  saveBlogs(blogs);
  res.json(blogs[blogIndex]);
});

// DELETE a blog
app.delete("/api/blogs/:id", (req, res) => {
  const blogs = getBlogs();
  const filteredBlogs = blogs.filter((b) => b.id !== parseInt(req.params.id));
  if (blogs.length === filteredBlogs.length) return res.status(404).send("Blog not found");

  saveBlogs(filteredBlogs);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
