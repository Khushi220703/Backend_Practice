// Ques34. Custom File-Based Authentication System
// • Implement a file-based authentication system where user credentials (username, password hash) are stored in a JSON file. 
// Create an HTTP server with endpoints for registering users, logging in, and authenticating users. Use fs to securely read and write user 
// credentials and path to handle the correct file paths for different environments.


const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();
const PORT = 5000;
const bcrypt = require("bcrypt");

app.use(express.json()); // <-- This parses JSON bodies in POST requests

const credentialsFolderPath = path.join(__dirname, "credentials");
const dataFilePath = path.join(credentialsFolderPath, "data.json");

if (!fs.existsSync(credentialsFolderPath)) {
    fs.mkdirSync(credentialsFolderPath);
}

// If data file doesn't exist, create it with an empty object
if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify({}));
}

const passwordhashing = async (password) => {
    const saltrounds = 10;
    return await bcrypt.hash(password, saltrounds);
};

const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

app.post("/signin", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let credentials = {};
        if (fs.existsSync(dataFilePath)) {
            const content = fs.readFileSync(dataFilePath, "utf-8");
            credentials = content.trim() ? JSON.parse(content) : {};
        }
        if (credentials[name].email === email) {
            return res.status(409).send({ message: "Account already exists!" });
        }

        const hashedPassword = await passwordhashing(password);

        credentials[name] = {
            email: email,
            password: hashedPassword,
        };

        fs.writeFileSync(dataFilePath, JSON.stringify(credentials, null, 2));

        res.status(201).send({ message: "Account created" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "There is an error from the server side." });
    }
});


app.get("/login", async(req,res)=>{
    const {name,email,password} = req.body;
    try {
        
        let credentials = {};
        if(fs.existsSync(dataFilePath)){

            const content = fs.readFileSync(dataFilePath, "utf-8");
            credentials = content.trim() ? JSON.parse(content) : {};
        }


        if (credentials[name].email !== email) {
            return res.status(404).send({ message: "Account do not exists!" });
        }

        if(comparePassword(password,credentials[name].password)){

            return res.status(201).send({message:"Welcome back! Login successful!"});
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "There is an error from the server side." });
    }
})
app.listen(PORT, () => {
    console.log("The server is running at the port", PORT);
});
