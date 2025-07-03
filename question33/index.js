// Ques33. File Integrity Checker
// • Write a Node.js application that monitors a specific directory and periodically checks the integrity of files using hashing 
// (e.g., MD5, SHA-356). If any file has been modified, alert the user via HTTP notifications or log the changes in a report file. 
// Use fs to read files and os to gather system information for logging.


const os = require("os");
const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");
const crypto = require("crypto");

const filePath = path.join(__dirname,"Dir");
const logFile = path.join(__dirname, "log.txt");
const fileHashes = new Map();
//creating the hash of a file.
const createHashing = (filePath) =>{

    const fileBuffer = fs.readFileSync(filePath); 
  const hash = crypto.createHash("sha256");     
  hash.update(fileBuffer);                      
  return hash.digest("hex");       

}
// Initialize watcher
const watcher = chokidar.watch(filePath, {
  persistent: true,
  ignoreInitial: false, 
});

// Watch for events
watcher
  .on('add', path => {
    const hash = createHashing(path);
    fileHashes.set(path,hash);
    console.log(`File added: ${path}`)})

  .on('change', path => {

    const hostname = os.hostname();
    const osType = os.type();
    const platform  = os.platform();
    const date = Date.now();
    const oldHash = fileHashes.get(path);

    const newHash = createHashing(path);

    if(newHash != oldHash){

        const osData = `\nThe file ${path} is modified by the hostname  ${hostname}, with the OS type is ${osType} , the platform is ${platform} on ${date} the file was ${oldHash}
     and now ${newHash}\n `

    fs.appendFileSync(logFile,osData);
    console.log("Check the log file a file have been changed.", path);
    }
    
    
  })
  .on('unlink', path => console.log(`File removed: ${path}`))
  .on('addDir', path => console.log(`Directory added: ${path}`))
  .on('unlinkDir', path => {
    fileHashes.delete(path);
    console.log(` Directory removed: ${path}`)})
  .on('error', error => console.log(` Error: ${error}`));
