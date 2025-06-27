# 🛠 Node.js File System Scripts 

This repository contains solutions to 20 real-world backend scripting challenges using Node.js. These problems involve file system automation, monitoring, server creation, and data synchronization, showcasing how to use core Node.js modules (fs, path, os) and frameworks like Express effectively.

## 📚 Topics Covered
✅ File and directory operations

🔁 Recursion & directory traversal

🧠 System and OS-level info handling

🛰 File uploads and metadata APIs

📡 File change monitoring (SSE)

🧾 Logging, rotation & archiving

📂 Static and secure file servers

⏳ CPU usage logging

🌐 File syncing between servers

📥 Dynamic file listing & downloads



---

## ✅ Completed Questions

Ques1- Write a nodejs script to create a new directory named after the current user's os username and 
create a file named system_info.txt inside that directory. The file should contain details
of the users home directory, total system mem and platform.

Ques2: Create a NodeJS script that reads a given directory's contents, filters out only .txt files, moves 
them into a new directory called txt_files using a path module to construct path


Ques3: Write a Node.js script that accepts a filename as input, checks if the file exists in the current 
working directory using the fs module, and if it exists, prints its full absolute path using the path module. 
If the file doesn't exist, create it.

Ques4: Develop a Node.js program that creates a log file in the current user's home directory. 
The log file should record the current date and time, OS type, and total system memory 
each time the script is executed.

Ques5: Create a Node.js script that traverses all files in a given directory and logs the size 
and file type of each file using the fs, path, and os modules, and prints out 
the total number of files processed.


Ques 6: You are building a backup system for a server. Write a Node.js script that identifies all files larger 
than 1MB in a specific directory, appends a timestamp to their filenames (e.g., backup_filename_20241005.txt), 
and moves them to a backups folder. Ensure the script works across different operating systems.

Ques7: Create a Node.js script that monitors a specific directory for any new files being added. 
When a new file is detected, log its full path and the creation date in a new_files_log.txt file 
located in the same directory. Use the path and fs modules to handle file paths and system interactions.

Ques 8: Develop a Node.js program that reads all files from a given directory, 
 checks if they are executable files based on their permissions (on Unix-like systems), 
and copies only the executable files to a folder named executables. Use the fs, path, and os modules to achieve this.

Ques 9: Write a Node.js script to traverse a directory recursively and list all files along with their relative paths from the root directory. 
Print this list to a file called file_structure.txt. Use the path module to correctly handle paths across different operating systems.

Ques 10:
 You are developing a utility that merges multiple text files in a directory into one file named merged.txt. 
 Your Node.js script should read all .txt files in the directory, append their content into merged.txt in the order of modification time 
 (oldest first), and delete the original files after merging.

Ques11:
Ques11. File Upload Server with Path Validation
Create an HTTP server that allows users to upload files.
The server should validate the file path using the path module to ensure that the file is saved within a specific directory (e.g., /uploads).
If the file's path is outside the permitted directory, reject the upload.

Ques12. Directory Tree Generator
Write a Node.js application that, given a directory path as input, recursively lists all files and subdirectories using the fs module,
displaying them in a tree-like structure.
Use the path module to handle path concatenation across different OS.

Ques13. File Watcher and HTTP Notifier
Build a system using fs.watch to monitor a directory for changes.
Whenever a new file is added, modified, or deleted, the server should notify connected HTTP clients via Server-Sent Events (SSE).

Ques14. File Metadata API
Create an HTTP server with an endpoint /file-metadata that accepts a file path as input.
Return the file’s size, creation date, and extension using fs and path.
If the file does not exist, return a 404 status.

Ques15. User Directory Setup with OS and FS
Build an application that, when executed, checks the OS type using the os module.
Based on the type (Windows, Linux, macOS), create a user-specific directory using the current user’s name in the proper home path.

Ques16. Log File Rotation and Archiving
Develop a logging system that writes logs to a file.
When the log file reaches a size threshold (e.g., 5MB), rotate the log by archiving it with a timestamp and create a new one.
Archived logs should go into a /logs/archive directory.

Ques17. Custom Static File Server with Path Security
Implement an HTTP server that serves static files (HTML, CSS, JS) from a /public directory.
Use path to sanitize file paths and prevent directory traversal attacks (e.g., using ../).

Ques18. CPU-Usage Logger Using OS and FS
Write an app that logs CPU usage every 10 seconds using the os module.
After 1 hour of logging, archive the log file into a backup/ folder with a timestamped filename.

Ques19. File Synchronization Across Systems
Create a system that synchronizes files between two directories on different servers.
One server hosts the files; the other periodically fetches and saves them locally using HTTP.
Use fs and path to manage file operations.

Ques20. Dynamic Directory Listing and File Download
Create an HTTP server that lists files in a directory as an HTML table.
Each file should have a download link.
Use the fs module to read files and path to construct download paths safely.
---

## 📦 Tools & Modules Used
- `fs` – File system operations
- `path` – Cross-platform path handling
- `os` – User/system memory info
- `chokidar` – For file watching (Q7)
- `express` - For HTTP servers.
- `nodemon` - For running the server.
- `multer` - For file uploads

## 💡 How to Run
```bash
node index
nodemon index

