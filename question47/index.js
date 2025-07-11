// Ques47. Operating System Information Dashboard
// • Build a dashboard that displays real-time operating system information (CPU, memory, network interfaces) using the os module. 
// Create an HTTP API that serves this data in JSON format, and periodically update the dashboard with the latest system statistics.

const express = require("express");
const os = require("os");
const app = express();
const PORT = 5000;

// System Info API (GET /system-info)
app.get("/system-info", (req, res) => {
  const cpus = os.cpus();
  const networkInterfaces = os.networkInterfaces();

  const systemInfo = {
    platform: os.platform(),
    arch: os.arch(),
    uptime: os.uptime(),
    cpu: {
      cores: cpus.length,
      model: cpus[0].model,
      speed: cpus[0].speed,
      usage: cpus.map(cpu => cpu.times)
    },
    memory: {
      total: os.totalmem(),
      free: os.freemem(),
      used: os.totalmem() - os.freemem(),
      usagePercent: (((os.totalmem() - os.freemem()) / os.totalmem()) * 100).toFixed(2) + "%"
    },
    network: networkInterfaces,
    loadAvg: os.loadavg()
  };

  res.json(systemInfo);
});

//  Server
app.listen(PORT, () => {
  console.log(`OS Dashboard server running on http://localhost:${PORT}`);
});
