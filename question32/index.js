// Content Delivery Network (CDN) Simulation
// • Simulate a content delivery system where an HTTP server serves static files (like images, videos, or documents) 
// from multiple directories. Implement a cache mechanism where frequently accessed files are stored temporarily in memory or a 
// temporary directory for faster access. Use fs to handle file reading and path to ensure correct file resolution.


const fs = require("fs");
const path = require("path");
const os = require("os");
const express = require("express");
const app = express();

const PORT = 5000;

const cache = [];
var prevAccessFile = null;
const fileExits = (filePath, filename) => {
  const files = fs.readdirSync(filePath);
  
  for (let file of files) {
    const childFilePath = path.join(filePath, file);
    const fileStat = fs.statSync(childFilePath);

    if (fileStat.isDirectory()) {
      const result = fileExits(childFilePath, filename);  
      if (result) return result; 
    }

    if (file === filename) {
      return childFilePath;
    }
  }

  return null;
};

app.get("/getFile/:filename", async (req,res) =>{

    const filename = req.params.filename;
    const filePath = path.join(__dirname,"dirs");

    try {
        
        if (cache[filename]) {
      console.log("Served from cache");
      return res.status(201).send({ message: "From cache", data: cache[filename].content });
    }
        //finding file in the multple directories of dirs directory.
        const fileFound = fileExits(filePath,filename)
        
        
        if(fileFound){

          const data =  fs.readFileSync(fileFound);
          
          
         if (prevAccessFile === filename ) {
      cache[filename] = {
        content: data,
        cachedAt: Date.now()
      };
    }
           prevAccessFile = filename;
          return res.status(201).send({message:"file found"});
        }
        else{

            return res.status(404).send({message:"File dont exits."})
        }
    } catch (error) {
        console.log(error);
        
        return res.status(500).send({message:"Error from the server side."})
    }
    
})


setInterval(()=>{
   
    const now = Date.now();

    for(let file in cache){

        if(now - file.cachedAt > 3 * 24 * 60 * 60){
             delete cache[file];
        }
    }
},24 * 60 * 60 * 1000)
app.listen(PORT, ()=>{

    console.log("The server is running at the port,", PORT);
    
})

