// Ques 6: You are building a backup system for a server. Write a Node.js script that identifies all files larger 
// than 1MB in a specific directory, appends a timestamp to their filenames (e.g., backup_filename_20241005.txt), 
// and moves them to a backups folder. Ensure the script works across different operating systems.


// from demo folder we will check for file having size greater than 10 bytes and move them to backup folder.


// importing all the required modules..
const fs = require("fs");
const path = require("path");

// root directory
const root = path.join(__dirname, "Demo");

const addToBackup = (filePath) => {
  fs.readdir(filePath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.log("There is an error: ", err);
    } else {
      files.forEach((file) => {
        const newFilePath = path.join(filePath, file.name);
        if (file.isDirectory()) {
          addToBackup(newFilePath);
        } else {
          fs.stat(newFilePath, (err, stats) => {
            if (err) {
              console.log("There is an error: ", err);
            } else {
              const size = stats.size;

              if (size > 10) {
                const backupPath = path.join(__dirname, "Backup");

                // create backup folder if it doesn't exist
                if (!fs.existsSync(backupPath)) {
                  fs.mkdirSync(backupPath, { recursive: true });
                }

                // create timestamped filename
                const ext = path.extname(file.name);
                const base = path.basename(file.name, ext);
                const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
                const backupFileName = `backup_${base}_${timestamp}${ext}`;

                const destPath = path.join(backupPath, backupFileName);

                fs.rename(newFilePath, destPath, (err) => {
                  if (err) {
                    console.log("Error while moving the file", err);
                  } else {
                    console.log(newFilePath + " moved to " + destPath);
                  }
                });
              }
            }
          });
        }
      });
    }
  });
};

addToBackup(root);
