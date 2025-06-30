// Directory Watcher with Backup and Notification
// • Create a system that watches a directory for changes using fs.watch. When a file is added, modified, or 
// deleted, back up the file (or delete it from the backup if removed), and notify a user via an HTTP request sent to a specified endpoint.



const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const PORT = 5000;

const rootPath = path.join(__dirname, "workDirectory");

// Make sure directory exists
if (!fs.existsSync(rootPath)) {
  console.log("workDirectory folder not found. Creating it...");
  fs.mkdirSync(rootPath);
}

let message = "Watching for changes...";

// Watch for changes in the directory
fs.watch(rootPath, (eventType, filename) => {
  if (!filename) return;

  const fullPath = path.join(rootPath, filename);

  if (eventType === "rename") {
    if (fs.existsSync(fullPath)) {
      console.log(`${filename} was added.`);
      message = `${filename} was added.`;
      const sourcePath = path.join(rootPath, filename); // original file
const backupPath = path.join(__dirname, "backupDirectory", filename); // backup copy

fs.copyFileSync(sourcePath, backupPath);
console.log(`${filename} has been backed up.`);
    } else {
      console.log(`${filename} was deleted.`);
      message = `${filename} was deleted.`;
    }
  } else if (eventType === "change") {
    console.log(`${filename} was modified.`);
    message = `${filename} was modified.`;
  }
});

// Serve the latest message on GET /
app.get("/", (req, res) => {
 res.send(`
    <html>
      <head>
        <title>File Watcher</title>
        <meta http-equiv="refresh" content="2" />
      </head>
      <body>
        <h2>File Watcher Message:</h2>
        <p>${message}</p>
      </body>
    </html>
  `);
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
