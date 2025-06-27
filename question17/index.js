// Custom Static File Server with Path Security
// Implement an HTTP server that serves static files (HTML, CSS, JS) from a /public directory.
// Use path to sanitize file paths and prevent directory traversal attacks (e.g., using ../).



const path = require("path");
const fs = require("fs");
const express = require("express");

const app = express();
const PORT = 5000;

const PUBLIC_DIR = path.join(__dirname, "public");

app.get("*", (req, res) => {
  try {
    // Get the requested file path
    const requestedPath = req.path === "/" ? "/index.html" : req.path;

    // Join with the public directory and normalize
    const filePath = path.join(PUBLIC_DIR, requestedPath);
    const safePath = path.normalize(filePath);

    // Prevent directory traversal
    if (!safePath.startsWith(PUBLIC_DIR)) {
      return res.status(403).send("Access denied.");
    }

    // Check if file exists
    if (!fs.existsSync(safePath)) {
      return res.status(404).send("File not found.");
    }

    // Set appropriate content type (optional enhancement)
    const ext = path.extname(safePath);
    const contentTypeMap = {
      ".html": "text/html",
      ".css": "text/css",
      ".js": "application/javascript",
      ".png": "image/png",
      ".jpg": "image/jpeg",
    };
    res.setHeader("Content-Type", contentTypeMap[ext] || "text/plain");

    // Stream the file
    fs.createReadStream(safePath).pipe(res); // Efficiently streams the file from disk to client response 
                                             // using pipe (handles large files without loading into memory)


  } catch (error) {
    res.status(500).send("Error from the server side.");
  }
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});


