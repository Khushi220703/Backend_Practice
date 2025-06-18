// Ques5: Create a Node.js script that traverses all files in a given directory and logs the size 
// and file type of each file using the fs, path, and os modules, and prints out 
// the total number of files processed.


/* 0) Import all the necessary modules.
   1) recusively traverse all the files in the directory and get info like size,type and number of file in the folder.
   2) print the output.
 */


const fs = require("fs");
const path = require("path");


const filePath = path.join(__dirname, "Demo");
var fileCount = 0;
console.log(filePath);

const getTheFolderFiles = (filePaths) =>{



    fs.readdir(filePaths,{withFileTypes:true},(err,files)=>{
         
       if(err){
          console.log("There is an error for filepath", err);
          
       }
       else{

          files.forEach((file)=>{
               const newFilePath = path.join(filePaths,file.name);
              if(file.isDirectory()){
                
                 getTheFolderFiles(newFilePath);
              }
              else{

                 fs.stat(newFilePath,(err,stats)=>{

                   if(err){
                    console.log("There is an error:", err);
                    
                   }else{
                      const size = stats.size;
                      const extension = path.extname(newFilePath);
                      fileCount++;
                      console.log(newFilePath);
                      
                      console.log(`The size of file is ${size} bytes having extension ${extension}\n `);
                      
                   }
                 })

              }
          })
       }
    })

}
 


// iterating the folder..
console.log(filePath);

getTheFolderFiles(filePath);

console.log("The total number of file processed are: ", fileCount);
