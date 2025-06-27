// CPU-Usage Logger Using OS and FS
// Write an app that logs CPU usage every 10 seconds using the os module.
// After 1 hour of logging, archive the log file into a backup/ folder with a timestamped filename.


const fs = require("fs");
const os = require("os");
const path = require("path");

const LOG_FILE = path.join(__dirname, "log.txt");
const BACKUP_DIR = path.join(__dirname, "backup");

// Helper: Get average CPU times
function getCPUInfo() {
    const cpus = os.cpus();
    let idle = 0, total = 0;

    cpus.forEach(core => {
        const { user, nice, sys, idle: i, irq } = core.times;
        const t = user + nice + sys + i + irq;

        idle += i;
        total += t;
    });

    return {
        idle: idle / cpus.length,
        total: total / cpus.length
    };
}

// Helper: Calculate CPU usage % over 1 second
function calculateCPUUsage(callback) {
    const start = getCPUInfo();

    setTimeout(() => {
        const end = getCPUInfo();
        const idleDiff = end.idle - start.idle;
        const totalDiff = end.total - start.total;

        const usage = 100 - Math.round(100 * idleDiff / totalDiff);
        callback(usage);
    }, 1000);
}

// Ensure backup directory exists
if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR);
}

let logStartTime = Date.now();

function logCPU() {
    calculateCPUUsage(usage => {
        const time = new Date().toLocaleString();
        const logLine = `${time} - CPU Usage: ${usage}%\n`;

        fs.appendFileSync(LOG_FILE, logLine);
        console.log(logLine.trim());

        // If 1 hour passed, archive the file
        const elapsed = Date.now() - logStartTime;
        if (elapsed >= 60 * 60 * 1000) {
            const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
            const archivePath = path.join(BACKUP_DIR, `log-${timestamp}.txt`);

            fs.renameSync(LOG_FILE, archivePath);
            console.log(` Archived log to ${archivePath}`);
            logStartTime = Date.now(); // Reset timer
        }
    });
}

// Log every 10 seconds
setInterval(logCPU, 10 * 1000);

console.log("🚀 CPU Logger started. Logging every 10s...");
