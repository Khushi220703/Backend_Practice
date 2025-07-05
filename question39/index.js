// Ques39. File Upload Progress Tracker
// • Develop a file upload service where clients can upload large files (multi-GB) via an HTTP API. 
// Implement a progress tracker that shows the percentage of the file that has been uploaded. Use fs.createWriteStream to write files 
// in chunks and http to handle the upload requests.

const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const PORT = 5000;

// Route to upload file
app.post("/uploadFile", (req, res) => {
  const filename = req.headers["x-filename"]; // custom header for filename
  const totalSize = parseInt(req.headers["content-length"]); // total size in bytes

  if (!filename || !totalSize) {
    return res.status(400).send("Filename and Content-Length required.");
  }

  const filePath = path.join(__dirname, "files", filename);
  const writeStream = fs.createWriteStream(filePath);

  let uploadedBytes = 0;

  req.on("data", (chunk) => {
    uploadedBytes += chunk.length;
    const progress = ((uploadedBytes / totalSize) * 100).toFixed(2);
    process.stdout.write(`\rUpload progress: ${progress}%`);
  });

  req.pipe(writeStream);

  writeStream.on("close", () => {
    console.log("\nUpload complete.");
    res.status(200).send("File uploaded successfully!");
  });

  req.on("error", (err) => {
    console.error("Request error:", err);
    res.status(500).send("Upload failed.");
  });

  writeStream.on("error", (err) => {
    console.error("Write error:", err);
    res.status(500).send("File save failed.");
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
