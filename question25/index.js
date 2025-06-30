const fs = require("fs");
const path = require("path");
const multer = require("multer");
const express = require("express");

const app = express();
const PORT = 5000;
const QUOTA_LIMIT = 500 * 1024 * 1024; // 500MB

app.use(express.urlencoded({ extended: true }));

const root = path.join(__dirname, "storage");
if (!fs.existsSync(root)) {
  fs.mkdirSync(root);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const username = req.body.username;
    const userRoot = path.join(root, username);

    if (!fs.existsSync(userRoot)) {
      fs.mkdirSync(userRoot);
    }

    // Calculate total size of user's directory
    let totalSize = 0;
    const files = fs.readdirSync(userRoot);

    for (const f of files) {
      const stats = fs.statSync(path.join(userRoot, f));
      totalSize += stats.size;
    }

    const incomingFileSize = parseInt(req.headers["content-length"] || "0");

    if (totalSize + incomingFileSize > QUOTA_LIMIT) {
      return cb(new Error("Storage quota exceeded!"));
    }

    cb(null, userRoot);
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  res.send(" File uploaded successfully.");
});

app.get("/", (req, res) => {
  res.send(`
    <h2>User File Upload (with 500MB quota per user)</h2>
    <form method="POST" action="/upload" enctype="multipart/form-data">
      <input type="text" name="username" placeholder="Enter username" required />
      <input type="file" name="file" required />
      <button type="submit">Upload</button>
    </form>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
