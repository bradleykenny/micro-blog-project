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
