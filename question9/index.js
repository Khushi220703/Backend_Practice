// Ques 9: Write a Node.js script to traverse a directory recursively and list all files along with their relative paths from the root directory. 
// Print this list to a file called file_structure.txt. Use the path module to correctly handle paths across different operating systems.


const fs = require("fs");
const path = require("path");

const rootDir = path.join(__dirname, "Demo"); // Your root folder
const outputFile = path.join(__dirname, "file_structure.txt");

let allFiles = [];

// Recursive function to collect relative paths
const collectFiles = (currentPath) => {
  const entries = fs.readdirSync(currentPath, { withFileTypes: true });

  entries.forEach((entry) => {
    const fullPath = path.join(currentPath, entry.name);
    const relativePath = path.relative(rootDir, fullPath);

    if (entry.isDirectory()) {
      collectFiles(fullPath);
    } else {
      allFiles.push(relativePath);
    }
  });
};

// Start traversal
collectFiles(rootDir);

// Write to file
fs.writeFile(outputFile, allFiles.join("\n"), (err) => {
  if (err) {
    console.error("Error writing to file:", err);
  } else {
    console.log(`File structure saved to ${outputFile}`);
  }
});
