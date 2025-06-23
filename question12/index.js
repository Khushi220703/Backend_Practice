// Ques12. Directory Tree Generator
// Write a Node.js application that, given a directory path as input, recursively lists all files and subdirectories using the fs module,
// displaying them in a tree-like structure.
// Use the path module to handle path concatenation across different OS.


const path = require("path");
const os = require("os");
const fs = require("fs");


const destFolder = path.join(__dirname,"Demo");
const getFileName = (name,indent = " ") =>{

   const files =  fs.readdirSync(name,{withFileTypes:true});


       
        files.forEach((file)=>{
            const fileName = path.join(name,file.name)
            if(file.isDirectory()){
             console.log( `${indent}📁${file.name}`);
                
                getFileName(fileName, indent+" ");
                
            }
            else{

                console.log( `${indent}📄${file.name}`);
            }
                
            
            
            
        })

};



getFileName(destFolder);