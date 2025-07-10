// Ques41. Version-Controlled Backup System
// • Implement a version-controlled backup system that automatically backs up specified directories and files. 
// The system should maintain multiple versions of files (based on changes), so when a file is modified, the previous version is archived. 
// Use the fs module to copy files and the path module to manage file versioning and backup paths.


const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const chokidar = require("chokidar");

const PORT = 5000;

const filePath = path.join(__dirname, "file.js");

const watcher = chokidar.watch(filePath,{
    ignoreInitial:false,
    persistent:true
});

watcher.on("change", (changedFilePath) => {
  const archivedFolderPath = path.join(__dirname, "archived");

  // Ensure archive directory exists
  if (!fs.existsSync(archivedFolderPath)) {
    fs.mkdirSync(archivedFolderPath);
  }

  // Create versioned filename: file_YYYY-MM-DD_HH-MM-SS.js
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const originalName = path.basename(changedFilePath);
  const ext = path.extname(changedFilePath);
  const nameWithoutExt = path.basename(changedFilePath, ext);
  const versionedFileName = `${nameWithoutExt}_${timestamp}${ext}`;

  const destinationPath = path.join(archivedFolderPath, versionedFileName);

  // Copy current content into new versioned file
  fs.copyFile(changedFilePath, destinationPath, (err) => {
    if (err) {
      console.error("Error archiving file:", err);
    } else {
      console.log(`Backup created: ${versionedFileName}`);
    }
  });
});



app.listen(PORT, ()=>{

    console.log("The server is running at the port,", PORT);
    
})