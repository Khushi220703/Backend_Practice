// Ques44. File Comparison and Synchronization Tool
// • Write a tool that compares two directories and identifies the files that are different (based on size, modification time, or hash). 
// The tool should synchronize the directories by copying the updated or missing files from one directory to the other. Use fs for file operations and 
// path to ensure cross-platform compatibility.

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const dirA = path.join(__dirname, "dir1");
const dirB = path.join(__dirname, "dir2");

// Create file hash
function hashFile(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  return crypto.createHash("sha256").update(fileBuffer).digest("hex");
}

// Get all files recursively
function getAllFiles(dirPath, basePath = dirPath) {
  let files = [];
  const entries = fs.readdirSync(dirPath);

  for (let entry of entries) {
    const fullPath = path.join(dirPath, entry);
    const relativePath = path.relative(basePath, fullPath);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files = files.concat(getAllFiles(fullPath, basePath));
    } else {
      files.push(relativePath);
    }
  }

  return files;
}

// Compare and sync
function syncDirectories(sourceDir, targetDir) {
  const sourceFiles = getAllFiles(sourceDir);
  const targetFiles = getAllFiles(targetDir);

  const allFiles = new Set([...sourceFiles, ...targetFiles]);

  allFiles.forEach((file) => {
    const sourceFile = path.join(sourceDir, file);
    const targetFile = path.join(targetDir, file);

    const sourceExists = fs.existsSync(sourceFile);
    const targetExists = fs.existsSync(targetFile);

    if (sourceExists && targetExists) {
      const sourceHash = hashFile(sourceFile);
      const targetHash = hashFile(targetFile);

      if (sourceHash !== targetHash) {
        console.log(` Updating: ${file}`);
        fs.copyFileSync(sourceFile, targetFile);
      }
    } else if (sourceExists && !targetExists) {
      const targetDirPath = path.dirname(targetFile);
      fs.mkdirSync(targetDirPath, { recursive: true });
      console.log(` Copying: ${file}`);
      fs.copyFileSync(sourceFile, targetFile);
    }
  });

  console.log("Synchronization complete.");
}

// Run the sync from DirA → DirB
syncDirectories(dirA, dirB);


