const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { log } = require('console');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const absolutePath = path.join(__dirname, 'uploads/');
    cb(null, absolutePath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage: storage });

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const posts = [];

app.get('/api/posts', (req, res) => {
  res.json(posts);
});

app.post('/api/posts', upload.single('image'), (req, res) => {
  const { title, content } = req.body;
  const imagePath = req.file ? path.join('uploads', req.file.filename) : null;

  // Log received file information
  console.log('File received:', req.file);

  const newPost = { id: posts.length + 1, title, content, imagePath };

  // Check if the file exists before sending it in the response
  if (req.file && fs.existsSync(req.file.path)) {
    // Log file path where it's saved
    console.log('File saved to:', req.file.path);

    // File exists, proceed with sending the response
    posts.push(newPost);
    res.status(201).json(newPost);
  } else {
    // File doesn't exist, handle the error
    console.error('File not found:', req.file);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.delete('/api/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const index = posts.findIndex((post) => post.id === postId);

  if (index !== -1) {
    const deletedPost = posts.splice(index, 1)[0];
    
    // Delete the image file from the server
    if (deletedPost.imagePath) {
      // const imagePath = path.join(__dirname, 'uploads', deletedPost.imagePath);
      // fs.unlinkSync(imagePath);
      const imagePath = path.join(__dirname, deletedPost.imagePath);
      fs.unlinkSync(imagePath);
      
    }

    res.status(200).json({ message: 'Post deleted successfully', deletedPost });
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
