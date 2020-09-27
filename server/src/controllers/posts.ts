import express from "express";
import dateformat from "dateformat";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";

import { Post, IPost, TPost, User, IUser } from "../db";

export const postRouter = express.Router();

// Posts...

// Get all posts by a provided username
postRouter.get("/api/posts/user/:username/:limit", async (req, res) => {
	res.send(
		await Post.find({ user: req.params.username })
			.sort({ timestamp: -1 })
			.then(async (result) => {
				const limit = Number(req.params.limit);
				if (result.length > limit) {
					let newArr = result.slice(0, limit);
					return await getUsersForPosts(newArr);
				}
				return await getUsersForPosts(result);
			})
			.catch((err) => err)
	);
});

// Get first `:limit` posts
postRouter.get("/api/posts/:limit", async (req, res) => {
	res.send(
		await Post.find({})
			.sort({ timestamp: -1 })
			.then(async (result) => {
				const limit = Number(req.params.limit);
				if (result.length > limit) {
					let newArr = result.slice(0, limit);
					return await getUsersForPosts(newArr);
				}
				return await getUsersForPosts(result);
			})
			.catch((err) => err)
	);
});

postRouter.get("/api/posts/all", async (req, res) => {
	res.send(
		await Post.find({})
			.then((result) => {
				return result;
			})
			.catch((err) => err)
	);
});

// Create a new post
postRouter.post("/api/posts/create", async (req, res) => {
	const token = getTokenFrom(req);
	if (!token) {
		return res.status(401).json({ error: "invalid token" });
	}

	const decodedToken: any = jwt.verify(token, String(process.env.SECRETKEY));
	if (!token || !decodedToken.username) {
		return res.status(401).json({ error: "invalid token" });
	}

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
		id: uuid(),
		user: decodedToken.username,
		timestamp: dateformat(Date.now(), "yyyy-mm-dd HH:MM:ss"),
		content: formattedContent,
		likes: [],
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

// Like a post given its ID
postRouter.post("/api/posts/:id/like", async (req, res) => {
	const token = getTokenFrom(req);
	if (!token) {
		return res.status(401).json({ error: "invalid token" });
	}

	const decodedToken: any = jwt.verify(token, String(process.env.SECRETKEY));
	if (!token || !decodedToken.username) {
		return res.status(401).json({ error: "invalid token" });
	}

	res.send(
		await Post.findOne({ id: req.params.id })
			.then((result) => {
				const user = decodedToken.username;
				if (!result?.likes.includes(user)) {
					result?.likes.push(user);
					result?.save();
				} else {
					result.likes = result?.likes.filter((u) => u !== user);
					result?.save();
				}
			})
			.catch((err) => err)
	);
});

// Get a post by its ID
postRouter.get("/api/posts/get/:id", async (req, res) => {
	res.send(
		await Post.findOne({ id: req.params.id })
			.then((result) => {
				return result;
			})
			.catch((err) => err)
	);
});

// Get posts only by users following and OURSELF
postRouter.get("/api/posts/:username/followers", async (req, res) => {
	const followers = <string[]>await getFollowers(req.params.username);
	await Post.find({ user: { $in: followers } })
		.sort({ timestamp: -1 })
		.then((result) => {
			res.json(result);
		});
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

// Return an array of all people a user is following
const getFollowers = async (user: string) => {
	return await User.findOne({ username: user }).then((result) => {
		return result ? [user, ...result.follows] : [user];
	});
};

const atTagForUser = (user: string) => {
	return '<a href="/profile/' + user + '">@' + user + "</a>";
};

// Auth check

const getTokenFrom = (request: any) => {
	const authorization = request.get("authorization");
	if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
		return authorization.substring(7);
	}
	return null;
};

export default postRouter;
