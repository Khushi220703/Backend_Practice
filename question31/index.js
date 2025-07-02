// Configuration Management System
// • Build a Node.js application that manages system configurations stored in JSON files. 
// The application should be able to read configuration files from a specific directory, validate their structure, 
// and update them via an HTTP API. Ensure that only valid paths and formats are used with the help of the fs and path modules, 
// and restrict access to certain files based on file permissions.


const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json()); // Add this to parse JSON body

const readOnlyFiles = ["system1.json", "system2.json"];
const readAndWriteFiles = ["system3.json"];

app.get("/readFile/:filename", (req, res) => {
    try {
        const filename = req.params.filename;
        const filePath = path.join(__dirname, "configs", filename);

        if (!fs.existsSync(filePath)) {
            return res.status(404).send("File does not exist.");
        }

        if (readOnlyFiles.includes(filename) || readAndWriteFiles.includes(filename)) {
            const data = fs.readFileSync(filePath, "utf-8");
            return res.status(200).send(JSON.parse(data));
        }

        return res.status(403).send("Access Denied.");
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error.");
    }
});

app.put("/update/:filename", (req, res) => {
    try {
        const filename = req.params.filename;
        const updates = req.body;
        const filePath = path.join(__dirname, "configs", filename);

        if (!fs.existsSync(filePath)) {
            return res.status(404).send("File does not exist.");
        }

        if (!readAndWriteFiles.includes(filename)) {
            return res.status(403).send("Write access denied.");
        }

        // Read existing file data
        const existingData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        // Validate keys and apply updates
        for (let key in updates) {
            if (existingData.hasOwnProperty(key)) {
                existingData[key] = updates[key];
            } else {
                console.log(`Key '${key}' does not exist in file.`);
            }
        }

        // Write updated data back to file
        fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
        res.status(200).send("File updated successfully.");

    } catch (error) {
        console.log(error);
        res.status(500).send("There was an error from the server side.");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
