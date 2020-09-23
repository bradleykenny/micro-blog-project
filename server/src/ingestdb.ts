require("dotenv").config();

import mongoose from "mongoose";
import fs from "fs";
import bcrypt from "bcrypt";

import { User } from "./mongo/user";
import { Post } from "./mongo/post";

// Load data from JSON file into memory
const rawData: string = fs.readFileSync("./sampledata.json").toString();
const data: any = JSON.parse(rawData);

const url: string = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PW}@cluster0.eisaa.mongodb.net/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;

console.log(url);

mongoose
	.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => {
		console.log("Connected to MongoDB.");
	})
	.catch((error) => {
		console.log("NOT connected to MongoDB.");
		console.error(error.message);
	});

data.users.map((u: any) => {
	u.password = bcrypt.hash(u.password, 10).then((encPW) => {
		const newUser = new User({
			id: u.id,
			password: encPW,
			avatar: u.avatar,
			followers: u.followers,
		});

		console.log(newUser);

		newUser
			.save()
			.then((result) => {
				console.log("user saved to mongo");
			})
			.catch((error) => {
				console.error("user already there");
			});
	});
});

console.log(data.users);

data.users.map((record: any) => {});

data.posts.map((record: any) => {
	const newPost = new Post({
		id: record.id,
		user: record.user,
		timestamp: record.timestamp,
		content: record.content,
		likes: record.likes,
	});

	newPost
		.save()
		.then((result) => {
			console.log("post saved to mongo");
		})
		.catch((error) => {
			console.error("post already there");
		});
});
