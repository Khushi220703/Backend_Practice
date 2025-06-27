// sync-client.js
const fs = require("fs");
const path = require("path");
const http = require("http");
const https = require("https");

const axios = require("axios"); // install using: npm install axios

const HOST_URL = "http://localhost:4000/files";
const SYNC_DIR = path.join(__dirname, "synced");

if (!fs.existsSync(SYNC_DIR)) {
  fs.mkdirSync(SYNC_DIR);
}

async function syncFiles() {
  try {
    const res = await axios.get(HOST_URL);
    const files = res.data;

    for (const file of files) {
      const fileUrl = `${HOST_URL}/${encodeURIComponent(file)}`;
      const localPath = path.join(SYNC_DIR, file);

      const writer = fs.createWriteStream(localPath);
      const fileRes = await axios.get(`http://localhost:4000/files/${file}`, {
        responseType: "stream",
      });

      fileRes.data.pipe(writer);

      writer.on("finish", () => {
        console.log(`✔ Synced: ${file}`);
      });

      writer.on("error", (err) => {
        console.error(`❌ Error writing ${file}:`, err);
      });
    }
  } catch (err) {
    console.error("Sync error:", err.message);
  }
}


setInterval(syncFiles, 100);
console.log("⏱️ Sync client running... syncing every 30 seconds");
