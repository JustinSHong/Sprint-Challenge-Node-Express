const express = require("express");
const helmet = require("helmet");
const server = express();

// middleware
server.use(helmet());
server.use(express.json());

// import sub-applications
// const actionRoutes = require("./actions/actionRoutes.js");
const projectRoutes = require("./projects/projectRoutes.js");

// test
server.get("/", (req, res) => {
	res.send("API running");
});

// route handlers
// server.use("/api/actions", actionRoutes);
server.use("/api/projects", projectRoutes);

// server at port 5000
server.listen(5000, () => {
	console.log("\n== API Running on port 5000 ==\n");
});
