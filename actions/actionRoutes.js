const express = require("express");
const actionDB = require("../data/helpers/actionModel");
const router = express.Router();

// routes for "/api/actions"
// DB schema
// id: number, no need to provide it when creating posts, the database will automatically generate it.
// project_id: number, required, must be the id of an existing project.
// description: string, up to 128 characters long, required.
// notes: string, no size limit, not required. Used to record additional notes ore requirements to complete the action.
// completed: boolean to indicate if the action has been completed, not required

// ROUTE HANDLERS /projects/projectRoutes

// GET: list of all actions
router.get("/", (req, res) => {
	actionDB
		.get()
		.then(actions => {
			res.status(200).json(actions);
		})
		.catch(err => {
			res.status(500).json({ error: err });
		});
});

// GET: action by id
router.get("/:id", (req, res) => {
	const { id } = req.params;

	actionDB
		.get(id)
		.then(action => {
			res.status(200).json(action);
		})
		.catch(err => {
			res.status(500).json({ error: "action not found" });
		});
});

// POST: add a action to the list of project
// NOTE: newActions won't get inserted......
// SOLUTION: database requires notes but README.md does not say it is required
router.post("/", (req, res) => {
	const newAction = req.body;

	// validate
	if (
		!newAction.project_id ||
		!newAction.description ||
		!newAction.notes ||
		!newAction.notes.length ||
		newAction.description.length === 0
	) {
		res
			.status(400)
			.json({ message: "please provide a project id, description, and notes" });
	} else {
		actionDB
			.insert(newAction)
			.then(action => {
				res.status(201).json(action);
			})
			.catch(err => {
				res.status(500).json({
					error: "there was an error saving the action to the database"
				});
			});
	}
});

// DELETE: remove an action from the list
router.delete("/:id", (req, res) => {
	const { id } = req.params;

	actionDB
		.get(id)
		.then(action => {
			let actionToBeDeleted = action;
			actionDB.remove(id).then(count => {
				res.status(200).json(actionToBeDeleted);
			});
		})
		.catch(err => {
			res.status(500).json({ error: "action could not be found and deleted" });
		});
});

// PUT: update an action by id
router.put("/:id", (req, res) => {
	const { id } = req.params;
	const update = req.body;
	// validate
	if (!update.id || !update.description || update.description.length === 0) {
		res
			.status(400)
			.json({ message: "please provide an action id and description" });
	} else {
		actionDB
			.get(id)
			.then(action => {
				actionDB.update(id, update).then(count => {
					res.status(200).json(update);
				});
			})
			.catch(err => {
				res
					.status(500)
					.json({ error: "action could not be found and updated" });
			});
	}
});

module.exports = router;
