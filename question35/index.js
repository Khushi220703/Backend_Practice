// Ques35. Cross-Platform Application Updater
// • Create a Node.js application updater system that checks for new updates from a remote server and downloads 
// the update files (e.g., .zip or .tar) via HTTP. Extract the files into a specified directory and validate the integrity of the downloaded files before updating. 
// Use the fs module to manage file operations, path for compatibility, and os to detect the operating system.

const os = require("os");
const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();
const PORT = 5000;
const crypto = require("crypto");
const chokidar = require("chokidar");


var setIsUpdate = false;
const createHashing = (filePath) =>{
   
    const buffer = fs.readFileSync(filePath);
    const hash = crypto.createHash("sha256");
    hash.update(buffer);
    return hash.digest("hex");
}
const filePath = path.join(__dirname,"Dir");
const filesPath = path.join(filePath,"file1.js")

const watcher = chokidar.watch(filePath, {
  persistent: true,
  ignoreInitial: false, 
});

let currentHash = createHashing(filesPath);

watcher.on("change", (changedPath) => {
    const newHash = createHashing(changedPath);

    if (newHash !== currentHash) {
        setIsUpdate = true;
        currentHash = newHash; // update the current hash
        console.log("Update detected!");
    }
});


app.get("/updateFile", async(req,res) =>{

    try {
        
        if(setIsUpdate){

            const data = fs.readFileSync(filesPath);
            res.status(201).send(data);
        }
        else{
            res.status(404).send({message:"No update found!"});
        }
    } catch (error) {
        
        res.status(500).send({message:"There is an error from the server side!"});
    }
})


app.listen(PORT,()=>{

    console.log("The server is running at the port,", PORT);
    
})