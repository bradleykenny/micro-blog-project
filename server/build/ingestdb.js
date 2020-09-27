"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const mongoose_1 = __importDefault(require("mongoose"));
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const Post_1 = require("./db/Post");
const rawData = fs_1.default.readFileSync("./sampledata.json").toString();
const data = JSON.parse(rawData);
const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PW}@cluster0.eisaa.mongodb.net/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;
console.log(url);
const atTagForUser = (user) => {
    return '<a href="/profile/' + user + '">@' + user + "</a>";
};
const hashTagForUser = (hash) => {
    return '<a href="/hashtag/' + hash + '">#' + hash + "</a>";
};
mongoose_1.default
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
    console.log("Connected to MongoDB.");
})
    .catch((error) => {
    console.log("NOT connected to MongoDB.");
    console.error(error.message);
});
data.posts.map((record) => {
    let formattedContent = record.content;
    let atRegex = new RegExp("@[a-zA-Z]+");
    let atUser = formattedContent.match(atRegex);
    if (atUser) {
        formattedContent = formattedContent.replace(new RegExp("@[a-zA-Z]+"), atTagForUser(atUser[0].substring(1)));
    }
    let hashRegex = new RegExp("#[a-zA-Z]+");
    let hashtag = formattedContent.match(hashRegex);
    if (hashtag) {
        formattedContent = formattedContent.replace(new RegExp("#[a-zA-Z]+"), hashTagForUser(hashtag[0].substring(1)));
    }
    const newPost = new Post_1.Post({
        id: uuid_1.v4(),
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
//# sourceMappingURL=ingestdb.js.map