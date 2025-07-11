// Ques43. Dynamic Web Content Generator Using Templates
// • Create an HTTP server that dynamically generates web pages based on templates. The server should read HTML templates 
// from a directory using fs, insert dynamic content based on user input or data from other files, and serve the final HTML to the client. 
// Use path to ensure safe handling of the template paths.


const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const PORT = 5000;

// Folder containing the templates
const htmlDir = path.join(__dirname, "HTMLPages");

// Home route
app.get("/", (req, res) => {
  res.send(`
    <h2>Welcome!</h2>
    <p>To view a template, use the endpoint:</p>
    <code>/getFile/:filename</code><br>
    <p>Example: <a href="/getFile/template1.html">/getFile/template1.html</a></p>
  `);
});

// Serve static templates by filename
app.get("/getFile/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(htmlDir, filename);

  // Security check to avoid path traversal
  if (!filePath.startsWith(htmlDir)) {
    return res.status(400).send("Invalid file path.");
  }

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).send("Template not found.");
  }

  // Send file as response
  res.sendFile(filePath);
});

// Start server
app.listen(PORT, () => {
  console.log("Server running at http://localhost:" + PORT);
});
