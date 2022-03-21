const Blog = require("../models/blog");

const blog_index = (req, res) => {
	Blog.find()
		.sort({ createdAt: -1 })
		.then((result) => {
			// res.send(result);
			// let blogs = result;
			res.render("index", { title: "Home", blogs: result });
		})
		.catch((err) => {
			console.log(err);
		});
};

const blog_store = (req, res) => {
	const blog = new Blog(req.body);

	blog.save()
		.then(() => {
			res.redirect("/blogs");
		})
		.catch((err) => {
			console.log(err);
		});
};

const blog_create = (req, res) => {
	res.render("create", { title: "Create a new blog" });
};

const blog_show = (req, res) => {
	const id = req.params.id;
	Blog.findById(id)
		.then((result) => {
			// res.send(result);
			res.render("details", { title: "Details", blog: result });
		})
		.catch((err) => {
			res.render("404", { title: "Page not found" });
		});
};

const blog_destroy = (req, res) => {
	const id = req.params.id;
	Blog.findByIdAndDelete(id)
		.then((result) => {
			res.json({ redirect: "/blogs" });
		})
		.catch((err) => {
			console.log(err);
		});
};

module.exports = {
	blog_index,
	blog_store,
	blog_create,
	blog_show,
	blog_destroy,
};
