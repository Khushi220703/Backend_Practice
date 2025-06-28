//  Disk Space Checker Using OS and FS
// • Write a Node.js application that checks the available disk space on the system using the os module. 
// If the available space falls below a certain threshold (e.g., 10%), delete files from a specified directory 
// based on age or size using the fs module, ensuring not to delete important system files.


// Disk Space Checker Using OS and FS
// Checks disk space and deletes old .csv files from Desktop/CSV if space < 10%

const checkDiskSpace = require('check-disk-space').default;

const os = require("os");
const path = require("path");
const fs = require("fs");

const THRESHOLD_PERCENT = 10; 

const deleteDir = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        console.log(" Folder does not exist:", dirPath);
        return;
    }

    const files = fs.readdirSync(dirPath)
        .filter(file => file.endsWith('.csv'))
        .map(file => {
            const filePath = path.join(dirPath, file); 
            const stats = fs.statSync(filePath);
            return { filePath, mtime: stats.mtime };
        })
        .sort((a, b) => a.mtime - b.mtime); 

    if (files.length === 0) {
        console.log(' No .csv files to delete.');
        return;
    }

    for (const file of files) {
        try {
            fs.unlinkSync(file.filePath);
            console.log(`🗑 Deleted: ${file.filePath}`);
        } catch (err) {
            console.log(` Could not delete ${file.filePath}:`, err.message);
        }
    }
};

checkDiskSpace(os.platform().startsWith('win') ? 'C:/' : '/')
    .then((disk) => {
        const free = disk.free;
        const size = disk.size;
        const freePercent = (free / size) * 100;

        console.log(`Free Disk Space: ${freePercent.toFixed(2)}%`);

        if (freePercent < THRESHOLD_PERCENT) {
            console.log('Low disk space! Initiating cleanup...');
            const dirPath = path.join(os.homedir(), "Desktop", "CSV"); 
            deleteDir(dirPath);
        } else {
            console.log('Sufficient disk space. No cleanup needed.');
        }
    })
    .catch(err => {
        console.error('Error checking disk space:', err);
    });
