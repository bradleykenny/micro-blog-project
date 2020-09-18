require("dotenv").config();

import express from "express";
import mongoose from "mongoose";

import { BlogPost } from "./mongo/posts";

let bodyParser = require("body-parser");
const app = express();

app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
app.use(bodyParser.json());

const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PW}@cluster0.eisaa.mongodb.net/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;

mongoose
	.connect(url, { useNewUrlParser: true })
	.then((result) => {
		console.log("connected to mongo");
		console.log(result);
	})
	.catch((error) => {
		console.log("NOT connected to mongo");
		console.error(error);
	});

let db = mongoose.connection;

app.set("port", 5000);

// Test routes to ensure up and running

app.get("/test", (req, res) => {
	return res.send("test");
});

app.get("/ping", (req, res) => {
	return res.send("pong");
});

// User information

app.get("/user/:username", (req, res) => {
	return res.json({ username: req.params.username });
});

// Posts...

app.get("/posts", (req, res) => {
	const instance = new BlogPost();
	return "1";
});

// Import test data into Mongo

app.get("/data/import/test", (req, res) => {
	return res.send("Test data imported.");
});

// Listening...

app.listen(app.get("port"), () => {
	console.log(`Server running on port ${app.get("port")}.`);
}).on("error", (e: object) => console.error(e));
