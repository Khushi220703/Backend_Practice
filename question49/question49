// Ques49. Multi-Threaded File Processor
// • Write a Node.js application that processes large files (e.g., log files) by splitting them into 
// chunks and processing each chunk in parallel using child processes or worker threads. Use the fs module to read and write file chunks and os to determine the number of 
// CPU cores available for parallel processing.


const fs = require("fs");
const path = require("path");
const { Worker } = require("worker_threads");
const os = require("os");

const inputFile = path.join(__dirname, "bigfile.log");
const numThreads = os.cpus().length;
const fileSize = fs.statSync(inputFile).size;
const chunkSize = Math.ceil(fileSize / numThreads);

for (let i = 0; i < numThreads; i++) {
  const start = i * chunkSize;
  const end = (i + 1) * chunkSize - 1;
  const worker = new Worker("./worker.js", { workerData: { inputFile, start, end } });

  worker.on("message", (msg) => console.log(`Worker ${i}:`, msg));
  worker.on("error", (err) => console.error(err));
}
