
// File Metadata API
// Create an HTTP server with an endpoint /file-metadata that accepts a file path as input.
// Return the file’s size, creation date, and extension using fs and path.
// If the file does not exist, return a 404 status.


const express = require("express")
const fs = require("fs");
const path = require("path");
const os = require("os");

const app = express();
const PORT = 5000;

  
           
app.get("/file-metadata/:filename", async (req,res) =>{

    try {
        const {filename} = req.params;
        console.log(filename);
        
        const root = path.join(__dirname, "watched",filename);

        if(fs.existsSync(root)){

           
            const stats = fs.statSync(root);
            const size = stats.size;
            const date = stats.birthtime;
            const extension = path.extname(root);
            console.log(fs.statSync(root));
            
            const data  = {
                size:size,
                date:date,
                extension :extension
            }

           res.status(200).send(data);
        }
        else {
    return res.status(404).send({ message: "File not found." });
}
    } catch (error) {
        console.log("There is an error", error);
        res.status(500).send({message:"There is an error from server side.", error})
    }
})


app.get("/", (req, res) => {
    res.send(`
        <html>
            <head>
                <title>File Metadata Viewer</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    label, input { font-size: 16px; }
                    #result { margin-top: 20px; }
                </style>
            </head>
            <body>
                <h2>📄 Get File Metadata</h2>
                <label for="filename">Enter file name:</label>
                <input type="text" id="filename" placeholder="example.txt" />
                <button onclick="getMetadata()">Fetch Metadata</button>

                <div id="result"></div>

                <script>
                    async function getMetadata() {
                        const filename = document.getElementById('filename').value;
                        const res = await fetch('/file-metadata/' + encodeURIComponent(filename));

                        const resultDiv = document.getElementById('result');
                        resultDiv.innerHTML = '';

                        if (res.ok) {
                            const data = await res.json();
                            resultDiv.innerHTML = 
                                '<p><strong>Size:</strong> ' + data.size + ' bytes</p>' +
                                '<p><strong>Created:</strong> ' + new Date(data.date).toLocaleString() + '</p>' +
                                '<p><strong>Extension:</strong> ' + data.extension + '</p>';
                        } else {
                            resultDiv.textContent = "File not found or error occurred.";
                        }
                    }
                </script>
            </body>
        </html>
    `);
});

app.listen(PORT,()=>{
     
    console.log(`Hello from the server side from port ${PORT}`);
    
})