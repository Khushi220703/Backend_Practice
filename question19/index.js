// host-server.js
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 4000;
const hostedDir = path.join(__dirname, "hosted");

// Serve list of files
app.get("/files", (req, res) => {
  fs.readdir(hostedDir, (err, files) => {
    if (err) return res.status(500).send("Error reading directory");
    res.json(files);
  });
});

// Serve file content
app.get("/files/:filename", (req, res) => {
  const filePath = path.join(hostedDir, path.basename(req.params.filename));
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send("File not found");
  }
});

app.listen(PORT, () => {
  console.log(`File host server running at http://localhost:${PORT}`);
});
