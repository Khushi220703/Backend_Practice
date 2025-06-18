// Ques 8: Develop a Node.js program that reads all files from a given directory, 
//  checks if they are executable files based on their permissions (on Unix-like systems), 
// and copies only the executable files to a folder named executables. Use the fs, path, and os modules to achieve this.


const fs = require("fs");
const path = require("path");
const os = require("os");

const root = path.join(__dirname, "Demo");
const exeDir = path.join(__dirname, "executables");

// Step 1: Ensure executables folder exists
if (!fs.existsSync(exeDir)) {
  fs.mkdirSync(exeDir);
}

// Step 2: Read all files in root folder
fs.readdir(root, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.log("Error reading directory:", err);
    return;
  }

  files.forEach((file) => {
    if (file.isFile()) {
      const filePath = path.join(root, file.name);

      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.log("Error getting stats:", err);
          return;
        }

        // UNIX: check for execute permission
        const isUnixExecutable = (stats.mode & 0o111) !== 0;

        // Windows: check based on extension
        const isWindowsExecutable =
          file.name.endsWith(".exe") ||
          file.name.endsWith(".bat") ||
          file.name.endsWith(".cmd");

        const isExecutable =
          os.platform() === "win32"
            ? isWindowsExecutable
            : isUnixExecutable;

        if (isExecutable) {
          const destPath = path.join(exeDir, file.name);

          fs.copyFile(filePath, destPath, (err) => {
            if (err) {
              console.log("Error copying file:", err);
            } else {
              console.log(`Copied executable: ${file.name}`);
            }
          });
        }
      });
    }
  });
});
