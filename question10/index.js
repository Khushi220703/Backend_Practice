// Ques 10: You are developing a utility that merges multiple text files in a directory into one file named merged.txt. 
//  Your Node.js script should read all .txt files in the directory, append their content into merged.txt in the order of modification time 
//  (oldest first), and delete the original files after merging.


const os = require("os");
const path = require("path");
const fs = require("fs");

const mergeFilePath = path.join(__dirname, "merged.txt");
const demoFilePath = path.join(__dirname, "Demo");

// Step 1: Create merged.txt if it doesn't exist
if (!fs.existsSync(mergeFilePath)) {
  fs.writeFileSync(mergeFilePath, "Hello this is merged file..\n");
}

// Step 2: Read files in Demo folder
const txtFiles = [];

fs.readdir(demoFilePath, (err, files) => {
  if (err) {
    console.log("There is an error:", err);
    return;
  }

  let pending = files.length;

  files.forEach((file) => {
    if (file.endsWith(".txt")) {
      const filePath = path.join(demoFilePath, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.log("Error getting stats:", err);
          return;
        }

        txtFiles.push({
          file,
          filePath,
          mtime: stats.mtime
        });

        pending--;
        if (pending === 0) processTxtFiles();
      });
    } else {
      pending--;
      if (pending === 0) processTxtFiles();
    }
  });

  function processTxtFiles() {
    // Step 3: Sort by modified time (oldest first)
    txtFiles.sort((a, b) => a.mtime - b.mtime);

    txtFiles.forEach(({ filePath, file }) => {
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          console.log("Error reading file:", err);
          return;
        }

        const content = `\n--- ${file} ---\n${data}\n`;
        fs.appendFile(mergeFilePath, content, (err) => {
          if (err) {
            console.log("Error appending:", err);
            return;
          }

          // Step 4: Delete the original file
          fs.unlink(filePath, (err) => {
            if (err) {
              console.log("Error deleting file:", err);
            } else {
              console.log(`Merged and deleted: ${file}`);
            }
          });
        });
      });
    });
  }
});
