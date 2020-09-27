import express from "express";
import dateformat from "dateformat";
import { v4 as uuid } from "uuid";

import { Post, IPost, TPost, User, IUser } from "../db";

export const postRouter = express.Router();

// Posts...

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

postRouter.post("/api/posts/create", async (req, res) => {
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

postRouter.post("/api/posts/:id/like", async (req, res) => {
	res.send(
		await Post.findOne({ id: req.params.id })
			.then((result) => {
				return result;
			})
			.catch((err) => err)
	);
});

postRouter.get("/api/posts/get/:id", async (req, res) => {
	res.send(
		await Post.findOne({ id: req.params.id })
			.then((result) => {
				const user = req.body.user;
				if (!result?.likes.includes(user)) {
					result?.likes.push(user);
					result?.save();
				}
			})
			.catch((err) => err)
	);
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

export default postRouter;
