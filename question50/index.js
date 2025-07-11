// Ques50. Custom Log Management with Archiving and Compression
// • Develop a log management system that writes logs to a file and automatically rotates the log file after it reaches a specified size (e.g., 10MB). 
// Compress old log files (using gzip) and store them in an archive folder, keeping a limited number of archived files. 
// Use fs to manage log rotation and path to organize the files correctly.



const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const logDir = path.join(__dirname, "logs");
const archiveDir = path.join(logDir, "archive");
const logFile = path.join(logDir, "app.log");

if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);
if (!fs.existsSync(archiveDir)) fs.mkdirSync(archiveDir);

function rotateLogs() {
  const stats = fs.statSync(logFile);
  if (stats.size < 10 * 1024 * 1024) return; // < 10MB

  const timestamp = Date.now();
  const compressedLog = fs.createReadStream(logFile)
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(path.join(archiveDir, `app-${timestamp}.log.gz`)));

  compressedLog.on("finish", () => {
    fs.writeFileSync(logFile, ""); // Clear original log
    cleanupOldLogs();
  });
}

function cleanupOldLogs() {
  const files = fs.readdirSync(archiveDir)
    .filter(f => f.endsWith(".gz"))
    .sort((a, b) => fs.statSync(path.join(archiveDir, b)).mtime - fs.statSync(path.join(archiveDir, a)).mtime);

  while (files.length > 5) {
    const oldFile = files.pop();
    fs.unlinkSync(path.join(archiveDir, oldFile));
  }
}

// Example usage
setInterval(() => {
  fs.appendFileSync(logFile, `Log at ${new Date().toISOString()}\n`);
  rotateLogs();
}, 2000);
