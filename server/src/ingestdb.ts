/*
	WARNING: Only use for DEVELOPMENT! 
			 This filw will place a heap of data into the MongoDB instance. 
*/

require("dotenv").config();

import mongoose from "mongoose";
import fs from "fs";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import { User } from "./db/User";
import { Post } from "./db/Post";

// Load data from JSON file into memory
const rawData: string = fs.readFileSync("./sampledata.json").toString();
const data: any = JSON.parse(rawData);

const url: string = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PW}@cluster0.eisaa.mongodb.net/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;

console.log(url);

const atTagForUser = (user: string) => {
	return '<a href="/profile/' + user + '">@' + user + "</a>";
};

const hashTagForUser = (hash: string) => {
	return '<a href="/hashtag/' + hash + '">#' + hash + "</a>";
};

mongoose
	.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => {
		console.log("Connected to MongoDB.");
	})
	.catch((error) => {
		console.log("NOT connected to MongoDB.");
		console.error(error.message);
	});

// data.users.map((u: any) => {
// 	u.password = bcrypt.hash(u.password, 10).then((encPW) => {
// 		const newUser = new User({
// 			username: u.id,
// 			password: encPW,
// 			avatar: u.avatar,
// 			followers: u.followers,
// 		});

// 		newUser
// 			.save()
// 			.then((result) => {
// 				console.log("user saved to mongo");
// 			})
// 			.catch((error) => {
// 				console.error("user already there");
// 			});
// 	});
// });

data.posts.map((record: any) => {
	let formattedContent: string = record.content;
	let atRegex: RegExp = new RegExp("@[a-zA-Z]+");
	let atUser: string[] = formattedContent.match(atRegex)!;
	if (atUser) {
		formattedContent = formattedContent.replace(
			new RegExp("@[a-zA-Z]+"),
			atTagForUser(atUser[0].substring(1))
		);
	}

	let hashRegex: RegExp = new RegExp("@[a-zA-Z]+");
	let hashtag: string[] = formattedContent.match(hashRegex)!;
	if (hashtag) {
		formattedContent = formattedContent.replace(
			new RegExp("@[a-zA-Z]+"),
			hashTagForUser(hashtag[0].substring(1))
		);
	}

	const newPost = new Post({
		id: uuid(),
		user: record.user,
		timestamp: record.timestamp,
		content: formattedContent,
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
