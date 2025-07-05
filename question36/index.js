// Ques36. File System Quota Enforcer for Shared Hosting
// • Build a system that enforces file system quotas for different users in a shared hosting environment. 
// Each user has a limited amount of disk space they can use, and the system should monitor their usage. When a user exceeds their quota, 
// prevent further file writes and alert the user. Use the fs and os modules to track storage consumption and perform file operations.


const os = require("os");
const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const multer = require("multer");

const PORT = 5000;

// this directory stores all the directories of diffrent users.
const rootDirPath = path.join(__dirname,"Dir");

function getFolderSize(folderPath) {
  let totalSize = 0;

  const files = fs.readdirSync(folderPath);

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isFile()) {
      totalSize += stats.size;
    } else if (stats.isDirectory()) {
      totalSize += getFolderSize(filePath); // recursive call
    }
  }

  return totalSize; // in bytes
}

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        const username = req.body.username;

         if (!username) return cb(new Error("Username not provided"));

        const userFolderPath = path.join(rootDirPath,username);
        if(!fs.existsSync(userFolderPath)){

            fs.mkdirSync(userFolderPath, {recursive:true});
        }

        const userFolderSize = getFolderSize(userFolderPath);
        
    
        if(userFolderSize  < 5 * 1024 * 1024){

            cb(null,userFolderPath);
        }else{
           cb(new Error("Your quota exceeds 5MB"));
        }
        
    },
    filename:function(req,file,cb){

        
        cb(null,`${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({storage});

app.post("/storeFile", upload.single("file") ,async (req,res)=>{

   

    try {
        
        res.status(201).send("File uploaded");

    } catch (error) {
        

        res.status(500).send({message:"There is an error from the server side."});
    }
})

app.use((err, req, res, next) => {
  if (err) {
    res.status(400).send({ message: err.message });
  } else {
    next();
  }
});

app.listen(PORT, ()=>{

    console.log("The server is running at the port,", PORT);
    
})