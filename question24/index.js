// File Backup and Restore System
// • Develop a backup and restore system that allows users to backup files via an HTTP request to a server. 
//   The server should store the files in a compressed format using fs and path, and users should be able to restore any 
//   file by sending a request with the backup file name.


const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const zlib = require("zlib");

const app = express();
const PORT = 5000;

// Ensure backup directory exists
const backupDir = path.join(__dirname, "backups");
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir);
}

// Multer config to store uploaded files in the "backups" folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, backupDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

//  Backup: Upload and compress the file
app.post("/backup", upload.single("myFile"), (req, res) => {
  const originalPath = req.file.path;
  const compressedPath = originalPath + ".gz";

  const readStream = fs.createReadStream(originalPath);
  const writeStream = fs.createWriteStream(compressedPath);
  const gzip = zlib.createGzip();

  readStream.pipe(gzip).pipe(writeStream).on("finish", () => {
    fs.unlinkSync(originalPath); // Optional: remove the original uncompressed file
    res.status(200).send(`File compressed and backed up as ${path.basename(compressedPath)}`);
  });
});

//  Restore: Download and decompress the file
app.get("/restore/:filename", (req, res) => {
  const filename = req.params.filename;
  const compressedPath = path.join(backupDir, filename);
  const restoredPath = path.join(backupDir, `restored-${Date.now()}-${filename.replace(".gz", "")}`);

  if (!fs.existsSync(compressedPath)) {
    return res.status(404).send(" Backup file not found.");
  }

  const readStream = fs.createReadStream(compressedPath);
  const writeStream = fs.createWriteStream(restoredPath);
  const gunzip = zlib.createGunzip();

  readStream.pipe(gunzip).pipe(writeStream).on("finish", () => {
    res.download(restoredPath, (err) => {
      if (err) console.error("Error sending file:", err);
      fs.unlinkSync(restoredPath); // optional cleanup
    });
  });
});

app.get("/", (req, res) => {
  const files = fs.readdirSync(backupDir).filter(file => file.endsWith(".gz"));

  const rows = files.map(file => `
    <tr>
      <td>${file}</td>
      <td><a href="/restore/${file}" download><button>Download</button></a></td>
    </tr>
  `).join("");

  res.send(`
    <html>
      <head>
        <title>Backup Manager</title>
        <style>
          body { font-family: Arial; padding: 20px; }
          table { border-collapse: collapse; margin-top: 20px; width: 100%; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          input[type="file"] { margin-right: 10px; }
        </style>
      </head>
      <body>
        <h2 Backup Your Files</h2>
        <form action="/backup" method="POST" enctype="multipart/form-data">
          <input type="file" name="myFile" required />
          <button type="submit">Backup</button>
        </form>

        <h3> Available Backups</h3>
        <table>
          <tr><th>Filename</th><th>Action</th></tr>
          ${rows || '<tr><td colspan="2">No backups found.</td></tr>'}
        </table>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
