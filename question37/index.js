// Ques37. Custom File Compression and Decompression API
// • Create an HTTP server that provides an API for compressing and decompressing files. The server should accept file uploads, 
// compress them using a popular algorithm (e.g., gzip), and provide a downloadable link for the compressed file. 
// Implement similar functionality for decompressing uploaded files. Use fs for file handling and path to ensure proper file resolution.


const fs = require("fs");
const path = require("path");
const os = require("os");
const express = require("express");
const app = express();
const multer = require("multer");
const zlib = require("zlib");
const { log } = require("util");

const PORT = 5000;


app.get("/compress", async (req,res) =>{

    try {
       
        
        const filename = req.query.file;
        const inputPath = path.join(__dirname,"files", filename);
        const outputPath = inputPath + ".gz";

        fs.createReadStream(inputPath)
         .pipe(zlib.createGzip())
         .pipe(fs.createWriteStream(outputPath))
         .on("finish",()=>{
            res.status(201).sendFile(outputPath)
         })
    } catch (error) {
        console.log(error);
        res.status(500).send("There is an error from server side.");
    }
});

app.get("/decompress", async (req,res) =>{

    try {
        const filename = req.query.file;
        const inputPath = path.join(__dirname,"files",filename);
         const outputPath = inputPath.replace(".gz", "");

        fs.createReadStream(inputPath)
         .pipe(zlib.createGunzip())
         .pipe(fs.createWriteStream(outputPath))
         .on("finish", ()=>{

            res.status(201).sendFile(outputPath);

         })
    } catch (error) {
        console.log(error);
        res.status(500).send("There is an error from server side.");
    }
});

app.listen(PORT, () =>{

    console.log("The server is running at the port,", PORT);
    
});