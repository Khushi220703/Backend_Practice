//  Custom File Search CLI with Path and FS
// •Create a command-line tool that searches for files within a specified directory (and its subdirectories) 
// based on a file extension or part of the filename. Use the fs and path modules 
// to traverse the directory tree and handle file paths across platforms.


const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();

const PORT = 5000;
const rootDir = path.join(__dirname, "uploads");
let matchingFiles = [];

const searchFile = (dir, exp) => {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      searchFile(filePath, exp);
    } else {
      if (file.toLowerCase().includes(exp.toLowerCase())) {
        matchingFiles.push(filePath); // store full path or just file name
      }
    }
  });
};

app.get("/search", (req, res) => {
  const query = req.query.q; 
  if (!query) return res.send("Please provide a search query (?q=...)");

  matchingFiles = []; // clear previous results
  try {
    searchFile(rootDir, query);
    res.send(matchingFiles);
  } catch (err) {
    res.status(500).send("Server error: " + err.message);
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
