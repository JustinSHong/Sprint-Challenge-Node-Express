const express = require("express");
const helmet = require("helmet");
const server = express();

// middleware
server.use(helmet());
server.use(express.json());

// import sub-applications

// test
server.get("/", (req, res) => {
	res.send("API running");
});

// route handlers

// server at port 5000
server.listen(5000, () => {
	console.log("\n== API Running on port 5000 ==\n");
});
