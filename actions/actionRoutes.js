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

module.exports = router;
