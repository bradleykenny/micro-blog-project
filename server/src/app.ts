require("dotenv").config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

// TODO: expand the login functionality
app.post("/login", async (req, res) => {
	let { username, password } = req.body;
	await User.findOne({ id: username })
		.then(async (user) => {
			let encPW: string = user?.password ? user?.password.valueOf() : "";

			if (await bcrypt.compare(password, encPW)) {
				const userForToken = {
					id: user?.id,
					avatar: user?.avatar,
					follows: user?.follows,
				};
				const token = jwt.sign(userForToken, "123");

				return res.status(200).json({
					token,
					id: user?.id,
					avatar: user?.avatar,
				});
			} else {
				return res
					.status(401)
					.json({ error: "invalid username or password" });
			}
		})
		.catch((err) => err);
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
		await User.findOne({ id: req.params.username })
			.then((result) => {
				let { followReq } = req.body;
				if (!result?.follows.includes(followReq)) {
					result?.follows.push(followReq);
					result?.save();
					return `${req.params.username} follows ${req.body.followReq}`;
				}

				return `${req.params.username} already follows ${req.body.followReq}`;
			})
			.catch((err) => err)
	);
});

// Posts...

app.get("/posts/all", async (req, res) => {
	res.send(
		await Post.find({})
			.then((result) => {
				return result;
			})
			.catch((err) => err)
	);
});

app.get("/posts/:limit", async (req, res) => {
	res.send(
		await Post.find({})
			.then((result) => {
				return result.slice(0, Number(req.params.limit));
			})
			.catch((err) => err)
	);
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

// Listening...

app.listen(app.get("port"), () => {
	console.log(`Server running on port ${app.get("port")}.`);
}).on("error", (e: object) => console.error(e));
