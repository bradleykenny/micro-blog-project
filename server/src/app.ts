require("dotenv").config();

import express from "express";
import { MongoClient } from "mongodb";

const app = express();

app.set("port", 5000);

// Test routes to ensure up and running

app.get("/test", (req, res) => {
	return res.send("test");
});

app.get("/ping", (req, res) => {
	return res.send("pong");
});

// Listening...

app.listen(app.get("port"), () => {
	console.log(`Server running on port ${app.get("port")}`);
}).on("error", (e: object) => console.error(e));

// MongoDB code... not in use... yet

const mongodb = () => {
	const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PW}@cluster0.eisaa.mongodb.net/${process.env.MONGODB_DB}?retryWrites=true&w=majority`; // update password for it to work

	const client = new MongoClient(uri, { useNewUrlParser: true });
	client.connect((err) => {
		const collection = client.db("test").collection("devices");
		collection.insertOne({ hello: "test" });
		console.log(collection.find({}));
		client.close();
	});
};
