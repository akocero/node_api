const Blog = require("../models/blog");

const blog_index = async (req, res) => {
	try {
		const blogs = await Blog.find().sort({ createdAt: -1 });
		res.render("index", { title: "Home", blogs });
	} catch (err) {
		console.log(err);
	}
};

const blog_store = async (req, res) => {
	const { title, snippet, body } = req.body;
	try {
		await Blog.create({ title, snippet, body });
		res.redirect("/blogs");
	} catch (err) {
		console.log(err);
	}
};

const blog_create = (req, res) => {
	res.render("create", { title: "Create a new blog" });
};

const blog_show = async (req, res) => {
	const id = req.params.id;
	try {
		const blog = await Blog.findById(id);
		res.render("details", { title: "Details", blog });
	} catch (err) {
		res.render("404", { title: "Page not found" });
	}
};

const blog_destroy = async (req, res) => {
	const id = req.params.id;

	try {
		await Blog.findByIdAndDelete(id);
		res.json({ redirect: "/blogs" });
	} catch (err) {
		console.log(err);
	}
};

module.exports = {
	blog_index,
	blog_store,
	blog_create,
	blog_show,
	blog_destroy,
};
