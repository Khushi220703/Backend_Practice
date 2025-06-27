// Log File Rotation and Archiving
// Develop a logging system that writes logs to a file.
// When the log file reaches a size threshold (e.g., 5MB), rotate the log by archiving it with a timestamp and create a new one.
// Archived logs should go into a /logs/archive directory.



/*

    => First thing is to import required modules and get logging data.

    => Second check if file exits if not create else if it exits than check for size of not reaches the threshold 4
     store logging data else if more then threshold than rename the logging file and move that logging file to achive folder.


 */

// importing the required modules.

const os = require("os");
const path = require("path");
const fs = require("fs");

const logFile = path.join(__dirname, "log.txt");
const archiveDir = path.join(__dirname, "logs", "archive");
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

// Generate a log entry
const timestamp = new Date().toISOString();
const username = os.userInfo().username;
const system = os.hostname();
const osType = os.type();
const logEntry = `\n[${timestamp}] User "${username}" logged in from "${system}" on OS "${osType}".\n`;

// Helper to rotate log
function rotateLog() {
    if (!fs.existsSync(archiveDir)) {
        fs.mkdirSync(archiveDir, { recursive: true });
    }

    const archivedFileName = `log-${Date.now()}.txt`;
    const archivePath = path.join(archiveDir, archivedFileName);

    fs.renameSync(logFile, archivePath);
    console.log("Log rotated to archive:", archivePath);
}

// Check log file size and rotate if needed
function logData() {
    if (fs.existsSync(logFile)) {
        const stats = fs.statSync(logFile);
        if (stats.size >= MAX_SIZE) {
            rotateLog();
        }
    }

    fs.appendFileSync(logFile, logEntry);
    console.log("Log written to", logFile);
}

logData();
