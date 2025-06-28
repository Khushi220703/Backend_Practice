// Concurrent File Access Handling
// • Build a system that writes and reads from the same file concurrently using multiple HTTP requests. 
// Implement a mechanism using fs to handle concurrent access (e.g., using file locks) to prevent data 
// corruption when multiple clients attempt to write to the file at the same time.



const os = require("os");
const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const PORT = 5000;

const root = path.join(__dirname, "log.txt");
var isWriting = false;

app.get("/request-1", async (req, res) => {


    if (isWriting) {

        return res.status(429).send("Server is busy. Try again.");
    }

    isWriting = true;

    fs.appendFile("log.txt", `User logged at ${Date.now()}\n`, (err) => {
        isWriting = false;
        if (err) return res.status(500).send("Error");
        res.send("Logged!");
    });
})

app.get("/request-2", async (req, res) => {

    if (isWriting) {

        return res.status(429).send("Server is busy. Try again.");
    }
    isWriting = true;

    fs.appendFile("log.txt", `User logged at ${Date.now()}\n`, (err) => {
        isWriting = false;
        if (err) return res.status(500).send("Error");
        res.send("Logged!");
    });
})

app.listen(PORT, () => {

    console.log("The server is listening at port", PORT);

})


