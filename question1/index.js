// Ques1- Write a nodejs script to create a new directory named after the current user's os username and 
// create a file named system_info.txt inside that directory. The file should contain details
// of the users home directory, total system mem and platform.


//steps to perform..
/* 1) get all required modules.
   2) get the user name create the directory.
   3) get user os info 
   3) create the file and store the info in it  */

const fs = require("fs");
const os = require("os");
const path = require("path");

//get the current user's name..
const username = os.userInfo().username;

console.log(username);

//create a new directory named after the current user's os username..
const dirPath = path.join(__dirname, username);

console.log(dirPath);

fs.mkdir(dirPath, { recursive: true }, (err) => {

    if (err) {
        console.log("There is an error while creating the folder", err);
        return;
    }

    console.log(`The folder is created with the  name ${username}`);

    // getting the user information..
    const home = os.homedir();
    const memory = os.totalmem();
    const platform = os.platform();

    const data = `Home => ${home}\nMemory => ${memory}\nPlatform => ${platform}`;

    const filePath = path.join(dirPath, "system.txt");

    //creating the file..

    fs.writeFile(filePath, data, (err) => {

        if (err)
            console.log("There is error while creating the file =>", err);
        else
            console.log(`The data is added to the file: ${filePath}`);
    });


});


