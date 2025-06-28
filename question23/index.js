// Server Health Dashboard Using OS and HTTP
// • Create a real-time server health dashboard that shows CPU load, memory usage, and disk space usage using the os module. 
// Build an HTTP server to serve this data as a JSON API, updating the metrics every few seconds.


const http = require('http');
const os = require('os');
const checkDiskSpace = require('check-disk-space').default;
const PORT = 5000;

// Function to get average CPU usage
function getCpuLoad() {
    const cpus = os.cpus();

    let user = 0, sys = 0, idle = 0;
    cpus.forEach(core => {
        user += core.times.user;
        sys += core.times.sys;
        idle += core.times.idle;
    });

    const total = user + sys + idle;
    return {
        user: ((user / total) * 100).toFixed(2),
        system: ((sys / total) * 100).toFixed(2),
        idle: ((idle / total) * 100).toFixed(2)
    };
}

// Function to get memory usage
function getMemoryUsage() {
    const total = os.totalmem();
    const free = os.freemem();
    const used = total - free;

    return {
        total: (total / 1024 / 1024).toFixed(2) + ' MB',
        used: (used / 1024 / 1024).toFixed(2) + ' MB',
        free: (free / 1024 / 1024).toFixed(2) + ' MB',
        usagePercent: ((used / total) * 100).toFixed(2) + '%'
    };
}

// Function to get disk usage
async function getDiskUsage() {
    const drive = os.platform().startsWith('win') ? 'C:' : '/';
    const disk = await checkDiskSpace(drive);

    const used = disk.size - disk.free;
    return {
        total: (disk.size / 1024 / 1024 / 1024).toFixed(2) + ' GB',
        used: (used / 1024 / 1024 / 1024).toFixed(2) + ' GB',
        free: (disk.free / 1024 / 1024 / 1024).toFixed(2) + ' GB',
        usagePercent: ((used / disk.size) * 100).toFixed(2) + '%'
    };
}

// Create HTTP server
const server = http.createServer(async (req, res) => {
    if (req.url === '/health') {
        const cpu = getCpuLoad();
        const memory = getMemoryUsage();
        const disk = await getDiskUsage();

        const data = {
            cpu,
            memory,
            disk,
            timestamp: new Date().toLocaleString()
        };

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data, null, 2));
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server Health API running at http://localhost:${PORT}/health`);
});
