import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User, IUser } from "../db";

export const userRouter = express.Router();

// User information

// TODO: expand the login functionality
userRouter.post("/api/login", async (req, res) => {
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

userRouter.post("/api/register", async (req, res) => {
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

userRouter.get("/api/user/:username", async (req, res) => {
	res.send(
		await User.findOne({ username: req.params.username })
			.then((result) => {
				return result;
			})
			.catch((err) => err)
	);
});

userRouter.post("/api/follow/:username", async (req, res) => {
	const token = getTokenFrom(req);
	if (!token) {
		return res.status(401).json({ error: "invalid token" });
	}

	const decodedToken: any = jwt.verify(token, String(process.env.SECRETKEY));
	if (!token || !decodedToken.username) {
		return res.status(401).json({ error: "invalid token" });
	}

	res.send(
		await User.findOne({ username: decodedToken.username })
			.then((result) => {
				let { username } = req.body;
				if (!result?.follows.includes(username)) {
					console.log("follows");
					console.log(result);
					result?.follows.push(username);
					console.log(result);
					result?.save();
					return `${decodedToken.username} follows ${req.body.username}`;
				} else {
					console.log("unfollows");
					console.log(result);
					result.follows = result?.follows.filter(
						(u) => u !== username
					);
					result?.save();
					return `${decodedToken.username} already follows ${req.body.username}`;
				}
			})
			.catch((err) => err)
	);
});

// Auth check
const getTokenFrom = (request: any) => {
	const authorization = request.get("authorization");
	if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
		return authorization.substring(7);
	}
	return null;
};
