//  Cross-Platform File Renaming Tool
// • Write a command-line tool that accepts a directory path and renames all files in that directory based on a specific pattern 
// (e.g., appending a timestamp to the filename). The tool should work on both Windows and Unix-based systems, handling paths using 
// the path module for cross-platform compatibility.


const path = require("path")
const fs = require("fs");

const inputFolder = "user1";
const inputFolderPath = path.join(__dirname, inputFolder);

if(!fs.existsSync(inputFolderPath)){

    console.log(`${inputFolder} folder not found`);
    return;

}

fs.readdir(inputFolderPath,(err,files)=>{

    if(err){
        console.log("Error in reading the folder", err);
        return;
    }

    files.forEach((file)=>{

       
        const fileExtn = path.extname(file);
         const filename = path.basename(file,fileExtn);
        const date = new Date().getTime();
        const oldPath = path.join(inputFolderPath , file);
        const newPath = path.join(inputFolderPath, `${filename}${date}${fileExtn}`);

      

        fs.rename(oldPath,newPath,(err)=>{

            if(err){
                console.log("There is an error renaming the file", err);
                return;
            }

            console.log("File renaming succesfull.");
            console.log(`old path is ${oldPath} to new path ${newPath}`);
        })
    })

})