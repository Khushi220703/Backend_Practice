// Large File Upload Handling with Streams
// • Build an HTTP server that allows users to upload large files (greater than 1GB). 
// Use the fs.createWriteStream method to handle the file upload in chunks, 
// preventing the server from running out of memory during the upload process.


const path = require("path")
const fs = require("fs");
const express = require("express");
const app = express();
const PORT = 5000;

const uploadFilePath = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadFilePath)) {

    fs.mkdirSync(uploadFilePath);
}

app.get("/", async (req, res) => {

    try {

        res.send(`
           <h2>Upload Large File</h2>
                 <form method="POST" action="/upload" enctype="multipart/form-data">
                  <input type="file" name="file" />
                   <button type="submit">Upload</button>
                 </form>
            `)
    } catch (error) {
        res.status(500).send("There is an error from the server side.", error)
    }
});

app.post("/upload", async (req,res)=>{

    const filename = `upload_${Date.now()}.bin`;
    const filepath = path.join(uploadFilePath,filename);

    const writeStream = fs.createWriteStream(filepath);

    req.pipe(writeStream);

    writeStream.on("finish", ()=>{
        console.log("File upload sucessFull.");
        res.send("File uploaded and saved successfully!");
        
    });

    writeStream.on("error",()=>{
        console.error("Stream error:", err);
        res.status(500).send("Upload failed.");
    })
})
app.listen(PORT, () => {
    console.log("The server is running at the port.", PORT);

})