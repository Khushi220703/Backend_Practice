// Ques4: Develop a Node.js program that creates a log file in the current user's home directory. 
// The log file should record the current date and time, OS type, and total system memory 
// each time the script is executed.


/*
  0) Import required libararies.
  1) get user os info.
  2) create log file and store the info in it.
 */

const path = require("path");
const os = require("os");
const fs = require("fs");
const { log } = require("console");



const dateTime = Date();
const osType = os.platform();
const mem = os.totalmem()/ 1048576;

const logData = `\n\nUser login on ${dateTime} with the os type ${osType} having memory ${mem} GB`;


// if file not exits.

const filePath = path.join(__dirname, "log.txt");

fs.access(filePath, fs.constants.F_OK,(err) =>{
    if(err){
        
        // file not exists.

        fs.writeFile("log.txt", logData, (err)=>{

            if(err){
                console.log("There is an error while writing the file =>", err);
                
            }
            else{
                console.log("Your log data is saved to the file log.txt.");
                
            }
        })
        
    }
    else{
        // file exists.

        fs.appendFile("log.txt", logData, (err)=>{

            if(err){
                console.log("There is an error while writing the file =>", err);
                
            }
            else{
                console.log("Your log data is saved to the file log.txt.");
                
            }
        })
    }
})

