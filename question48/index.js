// Ques48. User-Specific Data Storage System
// • Design a system where each user has a personal directory to store their files. When a user logs in, the system should create or access their 
// personal directory (based on their username), ensuring file paths are safe and properly managed. Use fs to create directories and path to manage file paths.


const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const PORT = 5000;
const usersRootDir = path.join(__dirname, "users");

app.use(express.json());

app.post("/login", (req, res) => {
  const username = req.body.username;
  if (!username) return res.status(400).send({ message: "Username required" });

  const safeName = path.basename(username); // Avoid path traversal
  const userDir = path.join(usersRootDir, safeName);

  if (!fs.existsSync(userDir)) {
    fs.mkdirSync(userDir, { recursive: true });
  }

  res.status(200).send({ message: `User ${safeName} directory ready.` });
});

app.listen(PORT, () => console.log("Server running on port", PORT));
