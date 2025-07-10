// Ques42. Real-Time File Collaboration System
// • Build a real-time collaboration system where multiple users can edit a shared file simultaneously via an HTTP API. 
// Use the fs module to read and write to the shared file and handle concurrency with file locks to ensure no data corruption. 
// Broadcast changes to all connected users using WebSockets or HTTP streaming.


const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const PORT = 5000;
const WebSocket = require("ws");

app.use(express.json());

const filepath = path.join(__dirname, "log.txt");

app.get("/", (req, res) => {
  res.send("Welcome to the Real-Time File Collaboration System!");
});


app.put("/modify", async (req, res) => {
  const data = req.body.data;

  try {
    if (!fs.existsSync(filepath)) {
      fs.writeFile(filepath, data, (err) => {
        if (err) return res.status(500).send({ message: "Unable to write in the file." });
        broadcastToClients(data);
        return res.status(201).send({ message: "File created and data written." });
      });
    } else {
      fs.appendFile(filepath, data, (err) => {
        if (err) return res.status(500).send({ message: "Unable to append to the file." });
        broadcastToClients(data);
        return res.status(201).send({ message: "Data appended to the file." });
      });
    }
  } catch (error) {
    res.status(500).send({ message: "There is an error from the server side." });
  }
});

app.get("/read", (req, res) => {
  try {
    if (!fs.existsSync(filepath)) {
      return res.status(404).send({ message: "Nothing in the log file" });
    }

    const read = fs.createReadStream(filepath, "utf-8");
    read.pipe(res);
  } catch (error) {
    res.status(500).send({ message: "There is an error from the server side." });
  }
});

const server = app.listen(PORT, () => {
  console.log("The server is running at the port,", PORT);
});

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.send("Welcome! Listening to log.txt updates...");

  // Optional: Stream the initial file content
  if (fs.existsSync(filepath)) {
    const content = fs.readFileSync(filepath, "utf-8");
    ws.send(content);
  }
});

// Inside fs.appendFile and fs.writeFile, broadcast to clients:
function broadcastToClients(message) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}