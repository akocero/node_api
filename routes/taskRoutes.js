const { Router } = require("express");
const router = Router();
const {
	task_index,
	task_store,
	task_create,
	task_show,
	task_destroy,
} = require("../controllers/taskController");

router.get("/", task_index);
router.get("/create", task_create);
router.get("/:id", task_show);
router.post("/", task_store);
router.delete("/:id", task_destroy);

module.exports = router;
