// Ques46. Temporary File Management System
// • Develop a system where files uploaded to a server are stored in a temporary directory and automatically deleted after a certain amount of time (e.g., 1 hour). 
// Use fs to monitor and delete files at regular intervals, and path to ensure the files are properly stored in the temporary directory.


const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 5000;

//  Temporary file storage folder
const tempDir = path.join(__dirname, "temp");

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

//  Multer config – save to temp/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

//  Upload route
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(201).send({
    message: "File uploaded successfully!",
    file: req.file.filename,
  });
});

//  Cleanup logic: delete files older than 1 hour
setInterval(() => {
  const files = fs.readdirSync(tempDir);
  const now = Date.now();

  files.forEach((file) => {
    const filePath = path.join(tempDir, file);
    const stats = fs.statSync(filePath);
    const fileAge = now - stats.mtimeMs;

    if (fileAge > 60 * 60 * 1000) {
      // Older than 1 hour
      fs.unlinkSync(filePath);
      console.log(`Deleted: ${file}`);
    }
  });
}, 10 * 60 * 1000); // check every 10 minutes

//  Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Temporary File Upload System.");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
