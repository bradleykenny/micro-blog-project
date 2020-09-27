require("dotenv").config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";

import { postRouter, userRouter } from "./controllers";

let bodyParser = require("body-parser");
const app = express();

// App configuration
app.use(cors());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
app.use(bodyParser.json());
app.use(express.static("../client/build"));

// MongoDB connection
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

// Controllers to use for routing
app.use(postRouter);
app.use(userRouter);

// Catch all to avoid "cannot find /*" error
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

// Listening...
app.listen(app.get("port"), () => {
	console.log(`Server running on port ${app.get("port")}.`);
}).on("error", (e: object) => console.error(e));
