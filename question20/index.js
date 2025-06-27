// Ques20. Dynamic Directory Listing and File Download
// Create an HTTP server that lists files in a directory as an HTML table.
// Each file should have a download link.
// Use the fs module to read files and path to construct download paths safely.

const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

// Set public directory
const PUBLIC_DIR = path.join(__dirname, "public");

// Route to display files as HTML table
app.get("/", (req, res) => {
  fs.readdir(PUBLIC_DIR, (err, files) => {
    if (err) {
      return res.status(500).send("Error reading directory.");
    }

    const tableRows = files.map(file => {
      const safeName = encodeURIComponent(file);
      return `
        <tr>
          <td>${file}</td>
          <td><a href="/download/${safeName}">Download</a></td>
        </tr>`;
    }).join("");

    res.send(`
      <html>
        <head>
          <title>File Directory</title>
          <style>
            table { width: 60%; border-collapse: collapse; margin: 20px auto; }
            th, td { border: 1px solid #ccc; padding: 10px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h2 style="text-align:center;">Available Files</h2>
          <table>
            <tr><th>File Name</th><th>Action</th></tr>
            ${tableRows}
          </table>
        </body>
      </html>
    `);
  });
});

// Safe file download route
app.get("/download/:filename", (req, res) => {
  const fileName = path.basename(req.params.filename); // prevent directory traversal
  const filePath = path.join(PUBLIC_DIR, fileName);

  if (fs.existsSync(filePath)) {
    res.download(filePath); // set headers and send file
  } else {
    res.status(404).send("File not found.");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
