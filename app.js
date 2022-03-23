const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
const taskRoutes = require("./routes/taskRoutes");
const dotenv = require("dotenv").config();
// express app
const app = express();
const dbURI = process.env.MONGODB_URI;
mongoose
	.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => {
		console.log("Connected");
		app.listen(process.env.PORT || 5000);
	})
	.catch((err) => {
		console.log(err);
	});
// listen for requests

// register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/blogs", blogRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
	res.redirect("/blogs");
});

app.get("/about", (req, res) => {
	res.render("about", { title: "About" });
});

// 404 page
app.use((req, res) => {
	res.status(404).render("404", { title: "404" });
});
