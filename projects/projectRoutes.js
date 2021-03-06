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

// GETPROJECTACTIONS: get a list of actions for a project
router.get("/projectActions/:id", (req, res) => {
	const { id } = req.params;

	projectDB
		.get(id)
		.then(project => {
			projectDB.getProjectActions(id).then(actions => {
				if (actions.length === 0) {
					res.status(404).json({ message: "project has not actions!" });
				} else {
					res.status(200).json(actions);
				}
			});
		})
		.catch(err => {
			res.status(500).json({
				error:
					"there was a problem retrieving the list of actions for this project"
			});
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

// POST: add a project to the list of project
router.post("/", (req, res) => {
	const newProject = req.body;
	// validate
	if (
		!newProject.name ||
		!newProject.description ||
		newProject.name.length === 0 ||
		newProject.description.length === 0
	) {
		res.status(400).json({
			error: "Please provide a project name and description."
		});
	} else {
		projectDB
			.insert(newProject)
			.then(project => {
				res.status(201).json(project);
			})
			.catch(err => {
				res.status(500).json({
					error: "There was an error saving the project to the database."
				});
			});
	}
});

// DELETE: remove a project from the list
router.delete("/:id", (req, res) => {
	const { id } = req.params;

	projectDB
		.get(id)
		.then(project => {
			let projectToBeDeleted = project;
			projectDB.remove(id).then(count => {
				res.status(200).json(projectToBeDeleted);
			});
		})
		.catch(err => {
			res.status(500).json({ error: "project could not be found and deleted" });
		});
});

// PUT: update a project by id
router.put("/:id", (req, res) => {
	const { id } = req.params;
	const update = req.body;
	// validate
	if (
		!update.name ||
		!update.description ||
		update.name.length === 0 ||
		update.description.length === 0
	) {
		res
			.status(400)
			.json({ message: "please provide a project name and description" });
	} else {
		projectDB
			.get(id)
			.then(user => {
				projectDB.update(id, update).then(count => {
					res.status(200).json(update);
				});
			})
			.catch(err => {
				res
					.status(500)
					.json({ error: "project could not be found and updated" });
			});
	}
});

module.exports = router;
