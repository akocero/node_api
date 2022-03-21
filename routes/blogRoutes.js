const express = require("express");
const router = express.Router();
const {
	blog_index,
	blog_store,
	blog_create,
	blog_show,
	blog_destroy,
} = require("../controllers/blogContoller");

router.get("/", blog_index);
router.get("/create", blog_create);
router.get("/:id", blog_show);
router.post("/", blog_store);
router.delete("/:id", blog_destroy);

module.exports = router;
