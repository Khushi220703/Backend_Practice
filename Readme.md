# 🛠 Node.js File System Scripts 

This repository contains solutions to 20 real-world backend scripting challenges using Node.js. These problems involve file system automation, monitoring, server creation, and data synchronization, showcasing how to use core Node.js modules (fs, path, os) and frameworks like Express effectively.

## Topics Covered
✅ File and Directory Operations (read, write, delete, rename)

🔁 Recursive Traversal & Folder Size Calculation

🧠 System & OS-Level Insights (os, path, process, etc.)

🛰 File Uploads with Validation and Quota Enforcement

📡 Real-Time File Monitoring (fs.watch, chokidar, SSE)

🧾 Logging, Rotation, and Compression (fs, zlib, cron-style tasks)

📂 Static File Servers with Access Control and Role-Based Permissions

⏳ CPU, Memory, and Disk Usage Tracking with Threshold Alerts

🌐 File Synchronization Across Environments

📥 Dynamic File Listings, Downloads, and Backup Automation

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

Ques31. Configuration Management System
• Build a Node.js application that manages system configurations stored in JSON files. 
The application should be able to read configuration files from a specific directory, validate their structure, 
and update them via an HTTP API. Ensure that only valid paths and formats are used with the help of the fs and path modules, 
and restrict access to certain files based on file permissions.

Ques31. Configuration Management System
• Build a Node.js application that manages system configurations stored in JSON files. 
The application should be able to read configuration files from a specific directory, validate their structure, 
and update them via an HTTP API. Ensure that only valid paths and formats are used with the help of the fs and path modules, 
and restrict access to certain files based on file permissions.

Ques32. Content Delivery Network (CDN) Simulation
• Simulate a content delivery system where an HTTP server serves static files (like images, videos, or documents) 
from multiple directories. Implement a cache mechanism where frequently accessed files are stored temporarily in memory or a 
temporary directory for faster access. Use fs to handle file reading and path to ensure correct file resolution.

Ques33. File Integrity Checker
• Write a Node.js application that monitors a specific directory and periodically checks the integrity of files using hashing 
(e.g., MD5, SHA-356). If any file has been modified, alert the user via HTTP notifications or log the changes in a report file. 
Use fs to read files and os to gather system information for logging.

Ques34. Custom File-Based Authentication System
• Implement a file-based authentication system where user credentials (username, password hash) are stored in a JSON file. 
Create an HTTP server with endpoints for registering users, logging in, and authenticating users. Use fs to securely read and write user 
credentials and path to handle the correct file paths for different environments.

Ques35. Cross-Platform Application Updater
• Create a Node.js application updater system that checks for new updates from a remote server and downloads 
the update files (e.g., .zip or .tar) via HTTP. Extract the files into a specified directory and validate the integrity of the downloaded files before updating. 
Use the fs module to manage file operations, path for compatibility, and os to detect the operating system.

Ques36. File System Quota Enforcer for Shared Hosting
• Build a system that enforces file system quotas for different users in a shared hosting environment. 
Each user has a limited amount of disk space they can use, and the system should monitor their usage. When a user exceeds their quota, 
prevent further file writes and alert the user. Use the fs and os modules to track storage consumption and perform file operations.

Ques37. Custom File Compression and Decompression API
• Create an HTTP server that provides an API for compressing and decompressing files. The server should accept file uploads, 
compress them using a popular algorithm (e.g., gzip), and provide a downloadable link for the compressed file. 
Implement similar functionality for decompressing uploaded files. Use fs for file handling and path to ensure proper file resolution.

Ques38. File Permissions and Access Control System
• Build an application that checks file and directory permissions using fs.stat and enforces role-based access controls based 
on the user’s role (e.g., admin, guest, editor). Create an HTTP API where only authorized users can perform certain file 
operations (like creating, deleting, or modifying files).

Ques39. File Upload Progress Tracker
• Develop a file upload service where clients can upload large files (multi-GB) via an HTTP API. 
Implement a progress tracker that shows the percentage of the file that has been uploaded. Use fs.createWriteStream to write files 
in chunks and http to handle the upload requests.

Ques40. Operating System Resource Monitor with Alerts
• Create a server health monitor that tracks CPU usage, memory consumption, and disk space usage using the os module.
 If any of these metrics exceed a certain threshold (e.g., CPU > 90%, memory > 80%, disk usage > 90%), send an alert via HTTP to a specified endpoint or 
 log the event in a report file.

Ques41. Version-Controlled Backup System
• Implement a version-controlled backup system that automatically backs up specified directories and files. 
The system should maintain multiple versions of files (based on changes), so when a file is modified, the previous version is archived. 
Use the fs module to copy files and the path module to manage file versioning and backup paths.

Ques42. Real-Time File Collaboration System
• Build a real-time collaboration system where multiple users can edit a shared file simultaneously via an HTTP API. 
Use the fs module to read and write to the shared file and handle concurrency with file locks to ensure no data corruption. 
Broadcast changes to all connected users using WebSockets or HTTP streaming.

Ques43. Dynamic Web Content Generator Using Templates
• Create an HTTP server that dynamically generates web pages based on templates. The server should read HTML templates 
from a directory using fs, insert dynamic content based on user input or data from other files, and serve the final HTML to the client. 
Use path to ensure safe handling of the template paths.

Ques44. File Comparison and Synchronization Tool
• Write a tool that compares two directories and identifies the files that are different (based on size, modification time, or hash). 
The tool should synchronize the directories by copying the updated or missing files from one directory to the other. Use fs for file operations and 
path to ensure cross-platform compatibility.

Ques45. Server-Side File Encryption and Decryption API
• Implement an HTTP API that allows users to upload files for encryption or decryption. The files should be encrypted using a strong algorithm (e.g., AES), 
stored on the server, and made available for download later. Use the fs module to handle file reads and writes, and path to ensure secure file storage.

Ques46. Temporary File Management System
• Develop a system where files uploaded to a server are stored in a temporary directory and automatically deleted after a certain amount of time (e.g., 1 hour). 
Use fs to monitor and delete files at regular intervals, and path to ensure the files are properly stored in the temporary directory.

Ques47. Operating System Information Dashboard
• Build a dashboard that displays real-time operating system information (CPU, memory, network interfaces) using the os module. 
Create an HTTP API that serves this data in JSON format, and periodically update the dashboard with the latest system statistics.

Ques48. User-Specific Data Storage System
• Design a system where each user has a personal directory to store their files. When a user logs in, the system should create or access their 
personal directory (based on their username), ensuring file paths are safe and properly managed. Use fs to create directories and path to manage file paths.

Ques49. Multi-Threaded File Processor
• Write a Node.js application that processes large files (e.g., log files) by splitting them into 
chunks and processing each chunk in parallel using child processes or worker threads. Use the fs module to read and write file chunks and os to determine the number of 
CPU cores available for parallel processing.

Ques50. Custom Log Management with Archiving and Compression
• Develop a log management system that writes logs to a file and automatically rotates the log file after it reaches a specified size (e.g., 10MB). 
Compress old log files (using gzip) and store them in an archive folder, keeping a limited number of archived files. 
Use fs to manage log rotation and path to organize the files correctly.



---

📦 Tools & Modules Used
   `fs` – Core module for file system operations (read, write, delete, streams)

   `path` – For handling file and directory paths in a cross-platform way

   `os` – To access system-level info (CPU, memory, platform)

   `crypto` – For hashing and data integrity checks

   `zlib` – To compress and decompress files (gzip)

   `chokidar` – Efficient file watcher for real-time monitoring

   `express` – Lightweight framework to build RESTful HTTP APIs

   `nodemon` – Development utility to auto-restart server on file changes

   `multer` – Middleware for handling file uploads via multipart/form-data

   

## 💡 How to Run
```bash
node index
nodemon index

