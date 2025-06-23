// Ques11. File Upload Server with Path Validation
// Create an HTTP server that allows users to upload files.
// The server should validate the file path using the path module to ensure that the file is saved within a specific directory (e.g., /uploads).
// If the file's path is outside the permitted directory, reject the upload.


// In Multer, cb stands for callback. It's used to tell Multer what to do next — like setting the filename or rejecting the file. You call it like this:

// cb(null, 'filename') → for success

// cb(new Error('message')) → to reject the file


const http = require("http");
const path = require("path");
const express = require("express");
const multer = require("multer");
const fs = require("fs");

const PORT = 5000;


const app = express();

const correctpath = path.join(__dirname,"uploads");
if(!fs.existsSync(correctpath)){

    fs.mkdirSync(correctpath,{recursive:true});
}


const storage = multer.diskStorage({

    destination:function(req,file,cb){
        cb(null,correctpath);
    },
    filename:function(req,file,cb){
        const storeName = file.originalname;
        cb(null, `${Date.now()}-${storeName}`);
    }
});


const upload = multer({
    storage:storage,
    limits:{fileSize:1024*10*10},
    fileFilter:function(req,file,cb){
        cb(null,true);
    }
})


app.post("/upload", upload.single("file"),(req,res)=>{

    const savedPath = path.resolve(req.file.path);
    console.log(savedPath);
    
    const validBase = path.resolve(correctpath);
    console.log(validBase);
    

    try {
        
        if(!savedPath.startsWith(validBase)){

            res.status(404).send("Invalid file path");
        }

        res.status(200).send("Upload successfull!.")
    } catch (error) {
        
        res.status(500).send("There is an error from the server side.")
    }
});



app.listen(PORT,()=>{
    console.log(`There is a hello from port  ${PORT}.`);
    
});