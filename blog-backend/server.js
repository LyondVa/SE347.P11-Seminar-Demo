const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const BLOGS_FILE = path.join(__dirname, 'blogs.json');

app.use(cors());
app.use(bodyParser.json());

// Get all blogs
app.get('/blogs', (req, res) => {
  fs.readFile(BLOGS_FILE, (err, data) => {
    if (err) {
      return res.status(500).send('Error reading blogs file');
    }
    res.json(JSON.parse(data));
  });
});

// Get a single blog by ID
app.get('/blogs/:id', (req, res) => {
  const blogId = parseInt(req.params.id, 10);
  fs.readFile(BLOGS_FILE, (err, data) => {
    if (err) {
      return res.status(500).send('Error reading blogs file');
    }
    const blogs = JSON.parse(data);
    const blog = blogs.find(b => b.id === blogId);
    if (!blog) {
      return res.status(404).send('Blog not found');
    }
    res.json(blog);
  });
});

// Add a new blog
app.post('/blogs', (req, res) => {
  const newBlog = req.body;
  fs.readFile(BLOGS_FILE, (err, data) => {
    if (err) {
      return res.status(500).send('Error reading blogs file');
    }
    const blogs = JSON.parse(data);
    newBlog.id = blogs.length ? Math.max(...blogs.map(b => b.id)) + 1 : 1;
    blogs.push(newBlog);
    fs.writeFile(BLOGS_FILE, JSON.stringify(blogs, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error writing blogs file');
      }
      res.status(201).json(newBlog);
    });
  });
});

// Remove a blog by ID
app.delete('/blogs/:id', (req, res) => {
  const blogId = parseInt(req.params.id, 10);
  fs.readFile(BLOGS_FILE, (err, data) => {
    if (err) {
      return res.status(500).send('Error reading blogs file');
    }
    let blogs = JSON.parse(data);
    const index = blogs.findIndex(b => b.id === blogId);
    if (index === -1) {
      return res.status(404).send('Blog not found');
    }
    blogs.splice(index, 1);
    fs.writeFile(BLOGS_FILE, JSON.stringify(blogs, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error writing blogs file');
      }
      res.status(204).send();
    });
  });
});

// Update an existing blog
app.put('/blogs/:id', (req, res) => {
  const blogId = parseInt(req.params.id, 10);
  const updatedBlog = req.body;
  fs.readFile(BLOGS_FILE, (err, data) => {
    if (err) {
      return res.status(500).send('Error reading blogs file');
    }
    let blogs = JSON.parse(data);
    const index = blogs.findIndex(b => b.id === blogId);
    if (index === -1) {
      return res.status(404).send('Blog not found');
    }
    blogs[index] = { ...blogs[index], ...updatedBlog };
    fs.writeFile(BLOGS_FILE, JSON.stringify(blogs, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error writing blogs file');
      }
      res.json(blogs[index]);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
