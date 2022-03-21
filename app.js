const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
// express app
const app = express();
const dbURI =
	"mongodb+srv://user1:Password1@cluster0.difxa.mongodb.net/node-tuts?retryWrites=true&w=majority";

mongoose
	.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => {
		console.log("Connected");
		app.listen(3000);
	})
	.catch((err) => {
		console.log("Error");
	});
// listen for requests

// register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/blogs", blogRoutes);

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
