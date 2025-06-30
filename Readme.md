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

Ques21. Concurrent File Access Handling
• Build a system that writes and reads from the same file concurrently using multiple HTTP requests. 
Implement a mechanism using fs to handle concurrent access (e.g., using file locks) to prevent data 
corruption when multiple clients attempt to write to the file at the same time.

Ques22. Disk Space Checker Using OS and FS
• Write a Node.js application that checks the available disk space on the system using the os module. 
If the available space falls below a certain threshold (e.g., 10%), delete files from a specified directory 
based on age or size using the fs module, ensuring not to delete important system files.

Ques23. Server Health Dashboard Using OS and HTTP
• Create a real-time server health dashboard that shows CPU load, memory usage, and disk space usage using the os module. 
Build an HTTP server to serve this data as a JSON API, updating the metrics every few seconds.

Ques24. File Backup and Restore System
• Develop a backup and restore system that allows users to backup files via an HTTP request to a server. 
The server should store the files in a compressed format using fs and path, and users should be able to restore any 
file by sending a request with the backup file name.

Ques25. User File Storage Quota Management
• Create a file storage service where each user has a defined storage quota (e.g., 500MB). Use the fs module to 
track each user's total storage usage, and reject file uploads if their quota is exceeded. Use the path module to ensure each user's 
files are stored in separate directories.

Ques26. Cross-Platform File Renaming Tool
• Write a command-line tool that accepts a directory path and renames all files in that directory based on a specific pattern 
(e.g., appending a timestamp to the filename). The tool should work on both Windows and Unix-based systems, handling paths using 
the path module for cross-platform compatibility.

Ques27. Directory Watcher with Backup and Notification
• Create a system that watches a directory for changes using fs.watch. When a file is added, modified, or 
deleted, back up the file (or delete it from the backup if removed), and notify a user via an HTTP request sent to a specified endpoint.

Ques28. Large File Upload Handling with Streams
• Build an HTTP server that allows users to upload large files (greater than 1GB). Use the fs.createWriteStream method to handle the file upload in chunks, 
preventing the server from running out of memory during the upload process.

Ques29. Custom File Search CLI with Path and FS
• Create a command-line tool that searches for files within a specified directory (and its subdirectories) 
based on a file extension or part of the filename. Use the fs and path modules to traverse the directory tree and handle file paths across platforms.

Ques30. HTTP Log Parser and Analyzer
• Write a system that reads an HTTP server log file and parses the requests. 
The application should extract and display information such as the number of requests, the most frequent endpoints, 
and the status codes. Use the fs module to read the log file and os to get system information for reporting purposes.


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

