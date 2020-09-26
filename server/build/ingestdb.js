"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const mongoose_1 = __importDefault(require("mongoose"));
const fs_1 = __importDefault(require("fs"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("./db/User");
const Post_1 = require("./db/Post");
const rawData = fs_1.default.readFileSync("./sampledata.json").toString();
const data = JSON.parse(rawData);
const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PW}@cluster0.eisaa.mongodb.net/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;
console.log(url);
mongoose_1.default
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
    console.log("Connected to MongoDB.");
})
    .catch((error) => {
    console.log("NOT connected to MongoDB.");
    console.error(error.message);
});
data.users.map((u) => {
    u.password = bcrypt_1.default.hash(u.password, 10).then((encPW) => {
        const newUser = new User_1.User({
            username: u.id,
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
data.users.map((record) => { });
data.posts.map((record) => {
    const newPost = new Post_1.Post({
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
//# sourceMappingURL=ingestdb.js.map