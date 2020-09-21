require("dotenv").config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { Post } from "./mongo/post";

let bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
app.use(bodyParser.json());

const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PW}@cluster0.eisaa.mongodb.net/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;

mongoose
	.connect(url, { useNewUrlParser: true })
	.then(() => {
		console.log("Connected to MongoDB.");
	})
	.catch((error) => {
		console.log("NOT connected to MongoDB.");
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
	const instance = new Post();
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
