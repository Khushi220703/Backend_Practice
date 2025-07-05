// Ques40. Operating System Resource Monitor with Alerts
// • Create a server health monitor that tracks CPU usage, memory consumption, and disk space usage using the os module.
//  If any of these metrics exceed a certain threshold (e.g., CPU > 90%, memory > 80%, disk usage > 90%), send an alert via HTTP to a specified endpoint or 
//  log the event in a report file.

const os = require("os");
const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();

const PORT = 5000;

// Thresholds
const CPU_THRESHOLD = 90; 
const MEMORY_THRESHOLD = 80; 
const DISK_THRESHOLD = 90; 

const reportFile = path.join(__dirname, "alert-log.txt");

// Helper to write alerts
function logAlert(message) {
  const timestamp = new Date().toISOString();
  const log = `${timestamp} - ALERT: ${message}\n`;
  fs.appendFileSync(reportFile, log);
  console.log(log);
}

// CPU usage calculation (1-second sample)
function getCpuUsagePercent() {
  return new Promise((resolve) => {
    const start = os.cpus();

    setTimeout(() => {
      const end = os.cpus();

      let idleDiff = 0;
      let totalDiff = 0;

      for (let i = 0; i < start.length; i++) {
        const startIdle = start[i].times.idle;
        const startTotal = Object.values(start[i].times).reduce((a, b) => a + b);

        const endIdle = end[i].times.idle;
        const endTotal = Object.values(end[i].times).reduce((a, b) => a + b);

        idleDiff += endIdle - startIdle;
        totalDiff += endTotal - startTotal;
      }

      const cpuUsage = 100 - Math.floor((idleDiff / totalDiff) * 100);
      resolve(cpuUsage);
    }, 1000);
  });
}

// Memory usage percentage
function getMemoryUsagePercent() {
  const freeMem = os.freemem();
  const totalMem = os.totalmem();
  const usedMem = totalMem - freeMem;
  return Math.floor((usedMem / totalMem) * 100);
}

// Periodic monitoring
setInterval(async () => {
  const cpuUsage = await getCpuUsagePercent();
  const memoryUsage = getMemoryUsagePercent();

  if (cpuUsage > CPU_THRESHOLD) {
    logAlert(`CPU usage is high: ${cpuUsage}%`);
  }

  if (memoryUsage > MEMORY_THRESHOLD) {
    logAlert(`Memory usage is high: ${memoryUsage}%`);
  }

  

}, 5000);


app.get("/status", async (req, res) => {
  const cpu = await getCpuUsagePercent();
  const memory = getMemoryUsagePercent();
  res.send({ cpu: `${cpu}%`, memory: `${memory}%` });
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
