// Ques13. File Watcher and HTTP Notifier
// Build a system using fs.watch to monitor a directory for changes.
// Whenever a new file is added, modified, or deleted, the server should notify connected HTTP clients via Server-Sent Events (SSE).


const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

const watchedDir = path.join(__dirname, "watched");

// Create directory if it doesn't exist
if (!fs.existsSync(watchedDir)) {
    fs.mkdirSync(watchedDir);
}

// Array to hold SSE client connections
const clients = [];

// SSE endpoint
app.get("/events", (req, res) => {
    // Set headers for SSE
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders(); // Send headers immediately
  
    clients.push(res);

    // Clean up when client disconnects
    req.on("close", () => {
        clients.splice(clients.indexOf(res), 1);
    });
});

fs.watch(watchedDir, (eventType, filename) => {
    if (!filename) return;

    const filePath = path.join(watchedDir, filename);
    let message = "";

    if (eventType === "rename") {
        if (fs.existsSync(filePath)) {
            message = `File added: ${filename}`;
        } else {
            message = `File deleted: ${filename}`;
        }
    } else if (eventType === "change") {
        message = `File modified: ${filename}`;
    }

    console.log("Change detected:", message);

    // Notify all clients
    clients.forEach(client => {
        client.write(`data: ${message}\n\n`);
    });
});


// Basic page to test in browser
app.get("/", (req, res) => {
    res.send(`
        <html>
            <body>
                <h2>📡 Watching Directory Changes...</h2>
                <div id="log"></div>
                <script>
                    const evtSource = new EventSource("/events");
                    evtSource.onmessage = function(event) {
                        const div = document.createElement("div");
                        div.textContent = event.data;
                        document.getElementById("log").appendChild(div);
                    };
                </script>
            </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`SSE server running at http://localhost:${PORT}`);
});
