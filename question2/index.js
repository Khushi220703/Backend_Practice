// Ques2: Create a NodeJS script that reads a given directory's contents, filters out only .txt files, moves 
// them into a new directory called txt_files using a path module to construct path


// the folder named as Directory has 6 files 2 of them are .txt file I am using this for the problem..

// steps to solve the problem..
/* 0) importing all required modules.
   1) Create new directory..
   2) Creating the directory for txt files..
   3) Extracting the files and filter them..
   4) Move the extracted file to the new folder..
   */

const fs = require("fs");
const path = require("path");

// getting the folder from which we want data.


const sourceFolderPath = path.join(__dirname, "Directory")
const sourceFolder = path.basename(sourceFolderPath);
console.log(`The files are fetched from this folder => ${sourceFolder} with the path ${sourceFolderPath}`);



//creating the new directory..
const newDirectory = path.join(__dirname, "txt_files");

fs.mkdir(newDirectory,{recursive:true},(err)=>{

    if(err){
        console.log(`There is an error ${err}`);
        return;
    }

    // reading the source folder for txt files..

    fs.readdir(sourceFolderPath,(err,files)=>{

        if(err){
            console.log(`There is an error from the server side => ${err}`);
            return;
        }
        
        
        
        files.forEach((file)=>{
            if(path.extname(file) === ".txt"){
                console.log(path.extname(file));
                
                const srcPath = path.join(sourceFolderPath,file);
                const destPath = path.join(__dirname,"txt_files",file);

                // moving the .txt files..
                fs.rename(srcPath,destPath,(err)=>{

                    if(err){
                        console.log("There is an error while moving the file =>", err);
                        
                    }
                    console.log("One file with .txt is moved", destPath);
                    
                })
            }
        })
    })


    

})



