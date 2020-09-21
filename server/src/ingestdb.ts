require("dotenv").config();

import mongoose from "mongoose";
import fs from "fs";

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

data.users.map((record: any) => {
	console.log(record);

	const newUser = new User({
		id: record.id,
		password: record.password,
		avatar: record.avatar,
		followers: record.followers,
	});

	newUser
		.save()
		.then((result) => {
			console.log("user saved to mongo");
		})
		.catch((error) => {
			console.error("user already there");
		});
});

data.posts.map((record: any) => {
	console.log(record);

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
			console.log(error);
			console.error("post already there");
		});
});
