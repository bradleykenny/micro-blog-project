require("dotenv").config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dateformat from "dateformat";

import { Post, IPost, TPost, User, IUser } from "./db";

let bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
app.use(bodyParser.json());
app.use(express.static("../client/build"));

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

app.set("port", process.env.PORT || 5000);

// Test route to ensure up and running
app.get("/api/ping", (req, res) => {
	return res.send("pong");
});

// User information

// TODO: expand the login functionality
app.post("/api/login", async (req, res) => {
	let { username, password } = req.body;
	await User.findOne({ username: username })
		.then(async (user) => {
			let encPW: string = user?.password ? user?.password.valueOf() : "";

			if (await bcrypt.compare(password, encPW)) {
				const userForToken = {
					username: user?.username,
					avatar: user?.avatar,
					follows: user?.follows,
				};
				const token = jwt.sign(
					userForToken,
					String(process.env.SECRETKEY)
				);

				return res.status(200).json({
					token,
					username: user?.username,
					avatar: user?.avatar,
					follows: user?.follows,
				});
			} else {
				return res
					.status(401)
					.json({ error: "invalid username or password" });
			}
		})
		.catch((err) => err);
});

app.post("/api/register", async (req, res) => {
	const { username, password, password2 } = req.body;
	if (password === password2) {
		bcrypt.hash(password, 10).then((encPW) => {
			User.create({
				username: username,
				password: encPW,
				avatar: "https://robohash.org/" + username,
				follows: [],
			}).then((result) => {
				res.send("OK");
			});
		});
	} else {
		console.log(password, password2);
		res.send("passwords not the same");
	}
});

app.get("/api/user/:username", async (req, res) => {
	res.send(
		await User.findOne({ username: req.params.username })
			.then((result) => {
				return result;
			})
			.catch((err) => err)
	);
});

app.post("/api/follow/:username", async (req, res) => {
	res.send(
		await User.findOne({ username: req.params.username })
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

app.get("/api/posts/all", async (req, res) => {
	res.send(
		await Post.find({})
			.then((result) => {
				return result;
			})
			.catch((err) => err)
	);
});

app.get("/api/posts/:limit", async (req, res) => {
	res.send(
		await Post.find({})
			.sort({ timestamp: -1 })
			.then(async (result) => {
				let newArr = result.slice(0, Number(req.params.limit));
				return await getUsersForPosts(newArr);
			})
			.catch((err) => err)
	);
});

app.get("/api/posts/:username", async (req, res) => {
	res.send(
		await Post.find({ user: req.params.username })
			.then((result) => {
				return result;
			})
			.catch((err) => err)
	);
});

app.post("/api/posts/create", async (req, res) => {
	let formattedContent: string = req.body.content;
	let atRegex: RegExp = new RegExp("@[a-zA-Z]+");
	let atUser: string[] = formattedContent.match(atRegex)!;
	if (atUser) {
		formattedContent = formattedContent.replace(
			new RegExp("@[a-zA-Z]+"),
			atTagForUser(atUser[0].substring(1))
		);
	}

	const newPost = new Post({
		user: req.body.user,
		timestamp: dateformat(Date.now(), "yyyy-mm-dd HH:MM:ss"),
		content: formattedContent,
		likes: req.body.likes,
	});

	newPost
		.save()
		.then((result) => {
			res.send("post saved to mongo");
		})
		.catch((error) => {
			console.error(error);
			res.send("error");
		});
});

app.post("/api/posts/:id/like", async (req, res) => {
	res.send("OK");
});

// Helper functions

const getUsersForPosts = async (posts: IPost[]) => {
	const usersInPromise = posts.map(async (post: IPost) => {
		return await User.findOne({ username: post.user }).then((res) => res);
	});

	const users = await Promise.all(usersInPromise).then((res) => res);
	return posts.map((p: IPost, idx: number) => {
		let { id, user, timestamp, content, likes } = p;
		let temp: TPost = {
			avatar: users[idx]?.avatar.valueOf(),
			id: id,
			user: user,
			timestamp: timestamp,
			content: content,
			likes: likes,
		};
		return temp;
	});
};

const atTagForUser = (user: string) => {
	return '<a href="/profile/"' + user + '">@' + user + "</a>";
};

// Listening...

app.listen(app.get("port"), () => {
	console.log(`Server running on port ${app.get("port")}.`);
}).on("error", (e: object) => console.error(e));
