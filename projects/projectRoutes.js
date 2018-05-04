const express = require("express");
const projectDB = require("../data/helpers/projectModel");
const router = express.Router();

// routes for "/api/projects"
// DB schema
// id: number, no need to provide it when creating projects, the database will generate it.
// name: string, up to 128 characters long, required.
// description: string, up to 128 characters long, required.
// completed: boolean to indicate if the project has been completed, not required

// ROUTE HANDLERS /projects/projectRoutes

// GET: list of all projects
router.get("/", (req, res) => {
	projectDB
		.get()
		.then(users => {
			res.status(200).json(users);
		})
		.catch(err => {
			res.status(500).json({ error: err });
		});
});

// GET: project by id
router.get("/:id", (req, res) => {
	const { id } = req.params;

	projectDB
		.get(id)
		.then(project => {
			res.status(200).json(project);
		})
		.catch(err => {
			res.status(500).json({ error: "project not found" });
		});
});

module.exports = router;
