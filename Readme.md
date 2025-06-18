# 🛠 Node.js File System Scripts (SkillAcademy Challenge)

This repository contains solutions to 10 real-world Node.js backend scripting challenges focused on the **file system**, using core modules like `fs`, `path`, and `os`.

## 📚 Topics Covered
- File & Directory operations
- Recursive traversal
- OS-level info handling
- Monitoring file system changes
- Sorting based on metadata
- Merging, moving, and filtering files

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



---

## 📦 Tools & Modules Used
- `fs` – File system operations
- `path` – Cross-platform path handling
- `os` – User/system memory info
- `chokidar` – For file watching (Q7)

## 💡 How to Run
```bash
node index

