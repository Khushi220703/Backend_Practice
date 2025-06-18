
// Ques7: Create a Node.js script that monitors a specific directory for any new files being added. 
// When a new file is detected, log its full path and the creation date in a new_files_log.txt file 
// located in the same directory. Use the path and fs modules to handle file paths and system interactions.



/*
   => We will detect the "Demo" folder if new file being added we will log the path and date of creation to the file.
   => I can do one thing here one variable will store last time the monitoring happens and based on this we will check for new file. how?
    like new file creation date have date greater than previous date. but this is complex so there is a way by using a npm pacakge "chokidar"
  */


const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");

const demoDir = path.join(__dirname, "Demo");
const logFilePath = path.join(demoDir, "new_files_log.txt");

// 1. Make sure Demo folder exists
if (!fs.existsSync(demoDir)) {
  fs.mkdirSync(demoDir, { recursive: true });
  console.log("Created Demo directory.");
}

// 2. Make sure log file exists
if (!fs.existsSync(logFilePath)) {
  fs.writeFileSync(logFilePath, ""); // create empty file
  console.log("Created log file: new_files_log.txt");
}

// 3. Start watching
const watcher = chokidar.watch(demoDir, {
  ignored: /(^|[/\\])\../,  // ignore dotfiles
  persistent: true,
  ignoreInitial: true
});

// 4. On file add, log its path and creation time
watcher.on("add", (filePath) => {
  // Avoid logging the log file itself
  if (filePath === logFilePath) return;

  const logEntry = `File added: ${filePath} at ${new Date().toLocaleString()}\n`;

  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
    } else {
      console.log("Logged:", filePath);
    }
  });
});
