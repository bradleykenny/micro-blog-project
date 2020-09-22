require("dotenv").config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { Post, User } from "./mongo";

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
	.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("Connected to MongoDB.");
	})
	.catch((error) => {
		console.log("NOT connected to MongoDB.");
		console.error(error);
	});

app.set("port", 5000);

// Test route to ensure up and running
app.get("/ping", (req, res) => {
	return res.send("pong");
});

// User information

app.post("/login", async (req, res) => {
	res.send("OK");
});

app.post("/register", async (req, res) => {
	res.send("OK");
});

app.get("/user/:username", async (req, res) => {
	res.send(
		await User.findOne({ id: req.params.username })
			.then((result) => {
				return result;
			})
			.catch((err) => err)
	);
});

app.post("/follow/:username", async (req, res) => {
	res.send(
		await User.findOne({ id: req.params.username }).then((result) => {
			let { followReq } = req.body;
			if (!result?.follows.includes(followReq)) {
				result?.follows.push(followReq);
				result?.save();
				return `${req.params.username} follows ${req.body.followReq}`;
			}

			return `${req.params.username} already follows ${req.body.followReq}`;
		})
	);
});

// Posts...

app.get("/posts/all", async (req, res) => {
	res.send("OK");
});

app.get("/posts/:username", async (req, res) => {
	res.send(
		await Post.find({ user: req.params.username })
			.then((result) => {
				return result;
			})
			.catch((err) => err)
	);
});

app.post("/posts/create", async (req, res) => {
	res.send("OK");
});

app.post("/posts/:id/like", async (req, res) => {
	res.send("OK");
});

// Import test data into Mongo

app.get("/data/import/test", (req, res) => {
	return res.send("Test data imported.");
});

// Listening...

app.listen(app.get("port"), () => {
	console.log(`Server running on port ${app.get("port")}.`);
}).on("error", (e: object) => console.error(e));
