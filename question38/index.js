// Ques38. File Permissions and Access Control System
// • Build an application that checks file and directory permissions using fs.stat and enforces role-based access controls based 
// on the user’s role (e.g., admin, guest, editor). Create an HTTP API where only authorized users can perform certain file 
// operations (like creating, deleting, or modifying files).

const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();

const PORT = 5000;
app.use(express.json()); // to parse JSON bodies

const rootDir = path.join(__dirname, "files"); // All files stored here

if (!fs.existsSync(rootDir)) {
  fs.mkdirSync(rootDir);
}

const rolePermission = {
  admin: ["create", "delete", "read", "edit"],
  guest: ["read"],
  editor: ["read", "edit"]
};

// Utility to check permission
function hasPermission(role, action) {
  return rolePermission[role]?.includes(action);
}

// GET: Read a file
app.get("/readFile", async (req, res) => {
  const role = req.headers.role;
  const filename = req.query.file;
console.log(req.query)
  if (!hasPermission(role, "read")) {
    return res.status(403).send("Permission Denied!");
  }

  const filePath = path.join(rootDir, filename);

  try {
    const data = fs.readFileSync(filePath, "utf-8");
    res.status(200).send({ content: data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "File not found or read error." });
  }
});

// POST: Create a file
app.post("/addFile", async (req, res) => {
  const role = req.headers.role;
  const { filename, content } = req.body;

  if (!hasPermission(role, "create")) {
    return res.status(403).send("Permission Denied!");
  }

  const filePath = path.join(rootDir, filename);

  try {
    fs.writeFileSync(filePath, content || "");
    res.status(201).send("File created.");
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "File creation failed." });
  }
});

// PUT: Update a file
app.put("/updateFile", async (req, res) => {
  const role = req.headers.role;
  const { filename, content } = req.body;

  if (!hasPermission(role, "edit")) {
    return res.status(403).send("Permission Denied!");
  }

  const filePath = path.join(rootDir, filename);

  try {
    fs.appendFileSync(filePath, `\n${content || ""}`);
    res.status(200).send("File updated.");
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "File update failed." });
  }
});

// DELETE: Delete a file
app.delete("/deleteFile", async (req, res) => {
  const role = req.headers.role;
  const filename = req.query.file;

  if (!hasPermission(role, "delete")) {
    return res.status(403).send("Permission Denied!");
  }

  const filePath = path.join(rootDir, filename);

  try {
    fs.unlinkSync(filePath);
    res.status(200).send("File deleted.");
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "File deletion failed." });
  }
});

app.listen(PORT, () => {
  console.log("The server is running at the port", PORT);
});
