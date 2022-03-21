const Task = require("../models/task");

const task_index = async (req, res) => {
	try {
		const tasks = await Task.find().sort({ createdAt: -1 });
		// res.render("index", { title: "Home", tasks });
		res.status(200).json(tasks);
	} catch (err) {
		console.log(err);
	}
};

const task_store = async (req, res) => {
	const { title, body } = req.body;

	try {
		if (!title || !body) {
			throw new Error("Invalid Inputs");
		}
		const task = await Task.create({
			title,
			body,
		});
		// res.redirect("/tasks");
		res.status(200).json(task);
	} catch (err) {
		console.log(err);
	}
};

const task_create = (req, res) => {
	res.render("create", { title: "Create a new task" });
};

const task_show = async (req, res) => {
	const id = req.params.id;
	try {
		const task = await Task.findById(id);
		res.status(200).json(task);
		// res.render("details", { title: "Details", task });
	} catch (err) {
		res.status(400).json({ message: "Invalid ID" });
		// res.render("404", { title: "Page not found" });
	}
};

const task_destroy = async (req, res) => {
	const id = req.params.id;

	try {
		await Task.findByIdAndDelete(id);
		res.json({ redirect: "/tasks" });
	} catch (err) {
		console.log(err);
	}
};

module.exports = {
	task_index,
	task_store,
	task_create,
	task_show,
	task_destroy,
};
