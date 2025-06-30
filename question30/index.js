// HTTP Log Parser and Analyzer
// Write a system that reads an HTTP server log file and parses the requests. 
// The application should extract and display information such as the number of requests, the most frequent endpoints, 
// and the status codes. Use the fs module to read the log file and os to get system information for reporting purposes.



const fs = require("fs");
const path = require("path");
const express = require("express");
const os = require("os")
const app = express();

const PORT = 5000;
const file = path.join(__dirname, "Files");
const logFilePath = path.join(__dirname, "log.txt");

app.get("/home", async (req, res) => {

    try {

        const homeFile = path.join(file, "home.html");

        if (!homeFile) {

            const logEntry = `${new Date().toISOString()} - ${req.method} ${req.url} - 400\n`;
            fs.appendFileSync(logFilePath, logEntry);

            res.status(400).send("error");
        }
        const logEntry = `${new Date().toISOString()} - ${req.method} ${req.url} - 200\n`;
        fs.appendFileSync(logFilePath, logEntry);

        res.status(200).sendFile(homeFile);

    } catch (error) {

        const logEntry = `${new Date().toISOString()} - ${req.method} ${req.url} - 500\n`;
        fs.appendFileSync(logFilePath, logEntry);

        res.status(500).send("There is an error from the server side.", error);
    }
});

app.get("/about", async (req, res) => {

    try {
        const aboutFile = path.join(file, "about.html");
        if (!aboutFile) {

            const logEntry = `${new Date().toISOString()} - ${req.method} ${req.url} -400\n`;
            fs.appendFileSync(logFilePath, logEntry);

            res.status(400).send("error");
        }
        const logEntry = `${new Date().toISOString()} - ${req.method} ${req.url} - 200\n`;
        fs.appendFileSync(logFilePath, logEntry);

        res.status(200).sendFile(aboutFile);
    } catch (error) {

        const logEntry = `${new Date().toISOString()} - ${req.method} ${req.url} - 500\n`;
        fs.appendFileSync(logFilePath, logEntry);

        res.status(500).send("There is an error from the server side.", error);
    }
});

app.get("/contact", async (req, res) => {

    try {
        const contactFile = path.join(file, "contact.html");
        if (!contactFile) {

            const logEntry = `${new Date().toISOString()} - ${req.method} ${req.url} - 400\n`;
            fs.appendFileSync(logFilePath, logEntry);

            res.status(400).send("error");
        }
        const logEntry = `${new Date().toISOString()} - ${req.method} ${req.url} - 200\n`;
        fs.appendFileSync(logFilePath, logEntry);

        res.status(200).sendFile(contactFile);
    } catch (error) {

        const logEntry = `${new Date().toISOString()} - ${req.method} ${req.url} - 500\n`;
        fs.appendFileSync(logFilePath, logEntry);

        res.status(500).send("There is an error from the server side.", error);
    }
});

app.get("/service", async (req, res) => {

    try {
        const serviceFile = path.join(file, "service.html");
        if (!serviceFile) {

            const logEntry = `${new Date().toISOString()} - ${req.method} ${req.url} - 400\n`;
            fs.appendFileSync(logFilePath, logEntry);

            res.status(400).send("error");
        }
        const logEntry = `${new Date().toISOString()} - ${req.method} ${req.url} - 200\n`;
        fs.appendFileSync(logFilePath, logEntry);

        res.status(200).sendFile(serviceFile);
    } catch (error) {
        const logEntry = `${new Date().toISOString()} - ${req.method} ${req.url} - 500\n`;
        fs.appendFileSync(logFilePath, logEntry);

        res.status(500).send("There is an error from the server side.", error);
    }
});



app.get("/log", (req, res) => {
  try {
    const logData = fs.readFileSync(logFilePath, "utf8").split("\n").filter(Boolean);

    const stats = {
      totalRequests: logData.length,
      endpoints: {},
      statusCodes: {},
      systemInfo: {
        hostname: os.hostname(),
        platform: os.platform(),
        uptime: `${Math.round(os.uptime() / 60)} minutes`,
      }
    };

    logData.forEach(entry => {
      const [ , , method, url, , status ] = entry.split(" ");
      
      // Count endpoint usage
      const endpoint = `${method} ${url}`;
      stats.endpoints[endpoint] = (stats.endpoints[endpoint] || 0) + 1;

      // Count status code frequency
      stats.statusCodes[status] = (stats.statusCodes[status] || 0) + 1;
    });

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).send("Failed to read or parse logs.");
  }
});


app.listen(PORT, () => {

    console.log("Server is running at the port ", PORT);
})