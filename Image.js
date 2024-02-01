const express = require('express');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Multer configuration
const storage = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// MongoDB configuration
mongoose.connect( "mongodb+srv://umermujtaba16:admin@cluster0.1dnnuhf.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// MongoDB schema and model
const imageSchema = new mongoose.Schema({
  filePath: String,
});

const ImageModel = mongoose.model('Image', imageSchema);

// Upload endpoint
app.post('/upload', upload.single('image'), async (req, res) => {
  const imagePath = req.file.path;

  try {
    const newImage = new ImageModel({ filePath: imagePath });
    await newImage.save();
    res.json({ filePath: imagePath });
  } catch (error) {
    console.error('Error saving image to MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
