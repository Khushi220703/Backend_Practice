// Ques45. Server-Side File Encryption and Decryption API
// • Implement an HTTP API that allows users to upload files for encryption or decryption. The files should be encrypted using a strong algorithm (e.g., AES), 
// stored on the server, and made available for download later. Use the fs module to handle file reads and writes, and path to ensure secure file storage.

const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const app = express();
const PORT = 5000;

const ENCRYPTION_KEY = crypto.randomBytes(32); // For demo. Save this securely in real-world apps
const IV = crypto.randomBytes(16);

const upload = multer({ dest: "uploads/" }); // Temp upload folder

const encryptedDir = path.join(__dirname, "encrypted");
const decryptedDir = path.join(__dirname, "decrypted");

// Ensure directories exist
[encryptedDir, decryptedDir].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
});

//  Encrypt file
function encryptFile(inputPath, outputPath) {
  const cipher = crypto.createCipheriv("aes-256-cbc", ENCRYPTION_KEY, IV);
  const input = fs.createReadStream(inputPath);
  const output = fs.createWriteStream(outputPath);

  input.pipe(cipher).pipe(output);
}

//  Decrypt file
function decryptFile(inputPath, outputPath) {
  const decipher = crypto.createDecipheriv("aes-256-cbc", ENCRYPTION_KEY, IV);
  const input = fs.createReadStream(inputPath);
  const output = fs.createWriteStream(outputPath);

  input.pipe(decipher).pipe(output);
}

//  Encrypt endpoint
app.post("/encrypt", upload.single("file"), (req, res) => {
  const file = req.file;
  const encryptedPath = path.join(encryptedDir, `${file.originalname}.enc`);

  encryptFile(file.path, encryptedPath);

  fs.unlinkSync(file.path); // Remove original uploaded file

  res.status(200).send({
    message: "File encrypted successfully.",
    download: `/download/encrypted/${file.originalname}.enc`,
  });
});

//  Decrypt endpoint
app.post("/decrypt", upload.single("file"), (req, res) => {
  const file = req.file;
  const decryptedPath = path.join(decryptedDir, file.originalname.replace(".enc", ""));

  decryptFile(file.path, decryptedPath);

  fs.unlinkSync(file.path); // Remove encrypted uploaded file

  res.status(200).send({
    message: "File decrypted successfully.",
    download: `/download/decrypted/${path.basename(decryptedPath)}`,
  });
});

//  Download route
app.get("/download/:type/:filename", (req, res) => {
  const { type, filename } = req.params;

  let filePath = "";
  if (type === "encrypted") filePath = path.join(encryptedDir, filename);
  else if (type === "decrypted") filePath = path.join(decryptedDir, filename);
  else return res.status(400).send({ message: "Invalid file type" });

  if (!fs.existsSync(filePath)) {
    return res.status(404).send({ message: "File not found" });
  }

  res.download(filePath);
});

app.listen(PORT, () => {
  console.log(` File Encryption API running at http://localhost:${PORT}`);
});
