// User Directory Setup with OS and FS
// Build an application that, when executed, checks the OS type using the os module.
// Based on the type (Windows, Linux, macOS), create a user-specific directory using the current user’s name in the proper home path.


const os = require("os");
const fs = require("fs");
const path = require("path");


const osType = os.type();
const name = os.userInfo().username;
const homeDir = os.homedir();

let folderName;

if (osType === "Windows_NT") {
    folderName = `${name}_windows`;
} else if (osType === "Linux") {
    folderName = `${name}_linux`;
} else if (osType === "Darwin") {
    folderName = `${name}_mac`;
} else {
    folderName = `${name}_other`;
}

const root = path.join(homeDir , folderName);
if(fs.existsSync(root)){
    
    console.log(root)
    console.log("Folder already exits.")
   return;
}

fs.mkdir(root,(err)=>{
    

    if(err){

        console.log("There is an error:", err);
        return;
    }

    console.log(`Folder creater sucessfully ${root}.`);

})

