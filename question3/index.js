// Ques3: Write a Node.js script that accepts a filename as input, checks if the file exists in the current 
// working directory using the fs module, and if it exists, prints its full absolute path using the path module. 
// If the file doesn't exist, create it.

/*
 0) import all the required libraries..
 1) Get the file name and check for it.
 2) if not exits create it else display current absolute path.
 */

 const fs = require("fs").promises;
const path = require("path");

const dir = path.join(__dirname, "Directory");
const filenameToFind = "file2.css";

async function findFileRecursive(dirPath, filename) {
  const items = await fs.readdir(dirPath, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dirPath, item.name);

    if (item.isDirectory()) {
      const found = await findFileRecursive(fullPath, filename);
      if (found) return found;
    } else {
      if (item.name === filename) {
        return fullPath;
      }
    }
  }

  return null; // file not found
}

(async () => {
  try {
    const foundPath = await findFileRecursive(dir, filenameToFind);

    if (foundPath) {
      console.log(`File found at: ${foundPath}`);
    } else {
      const newFilePath = path.join(dir, filenameToFind);
      await fs.writeFile(newFilePath, "");
      console.log(`File not found. Created new file at: ${newFilePath}`);
    }
  } catch (err) {
    console.error("Error:", err);
  }
})();
