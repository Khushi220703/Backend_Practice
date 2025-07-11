const { workerData, parentPort } = require("worker_threads");
const fs = require("fs");

const { inputFile, start, end } = workerData;
const stream = fs.createReadStream(inputFile, { start, end, encoding: "utf-8" });

let chunk = "";

stream.on("data", (data) => (chunk += data));
stream.on("end", () => {
  // do your processing here (e.g., count lines, parse logs, etc.)
  const lines = chunk.split("\n").length;
  parentPort.postMessage(`Processed ${lines} lines`);
});
