"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dateformat_1 = __importDefault(require("dateformat"));
const path_1 = __importDefault(require("path"));
const db_1 = require("./db");
let bodyParser = require("body-parser");
const app = express_1.default();
app.use(cors_1.default());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());
app.use(express_1.default.static("../client/build"));
const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PW}@cluster0.eisaa.mongodb.net/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;
mongoose_1.default
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    console.log("Connected to MongoDB.");
})
    .catch((error) => {
    console.log("NOT connected to MongoDB.");
    console.error(error);
});
app.set("port", process.env.PORT || 5000);
app.get("/api/ping", (req, res) => {
    return res.send("pong");
});
app.post("/api/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { username, password } = req.body;
    yield db_1.User.findOne({ username: username })
        .then((user) => __awaiter(void 0, void 0, void 0, function* () {
        let encPW = (user === null || user === void 0 ? void 0 : user.password) ? user === null || user === void 0 ? void 0 : user.password.valueOf() : "";
        if (yield bcrypt_1.default.compare(password, encPW)) {
            const userForToken = {
                username: user === null || user === void 0 ? void 0 : user.username,
                avatar: user === null || user === void 0 ? void 0 : user.avatar,
                follows: user === null || user === void 0 ? void 0 : user.follows,
            };
            const token = jsonwebtoken_1.default.sign(userForToken, String(process.env.SECRETKEY));
            return res.status(200).json({
                token,
                username: user === null || user === void 0 ? void 0 : user.username,
                avatar: user === null || user === void 0 ? void 0 : user.avatar,
                follows: user === null || user === void 0 ? void 0 : user.follows,
            });
        }
        else {
            return res
                .status(401)
                .json({ error: "invalid username or password" });
        }
    }))
        .catch((err) => err);
}));
app.post("/api/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, password2 } = req.body;
    if (password === password2) {
        bcrypt_1.default.hash(password, 10).then((encPW) => {
            db_1.User.create({
                username: username,
                password: encPW,
                avatar: "https://robohash.org/" + username,
                follows: [],
            }).then((result) => {
                res.send("OK");
            });
        });
    }
    else {
        console.log(password, password2);
        res.send("passwords not the same");
    }
}));
app.get("/api/user/:username", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield db_1.User.findOne({ username: req.params.username })
        .then((result) => {
        return result;
    })
        .catch((err) => err));
}));
app.post("/api/follow/:username", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield db_1.User.findOne({ username: req.params.username })
        .then((result) => {
        let { followReq } = req.body;
        if (!(result === null || result === void 0 ? void 0 : result.follows.includes(followReq))) {
            result === null || result === void 0 ? void 0 : result.follows.push(followReq);
            result === null || result === void 0 ? void 0 : result.save();
            return `${req.params.username} follows ${req.body.followReq}`;
        }
        return `${req.params.username} already follows ${req.body.followReq}`;
    })
        .catch((err) => err));
}));
app.get("/api/posts/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield db_1.Post.find({})
        .then((result) => {
        return result;
    })
        .catch((err) => err));
}));
app.get("/api/posts/:limit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield db_1.Post.find({})
        .sort({ timestamp: -1 })
        .then((result) => __awaiter(void 0, void 0, void 0, function* () {
        let newArr = result.slice(0, Number(req.params.limit));
        return yield getUsersForPosts(newArr);
    }))
        .catch((err) => err));
}));
app.get("/api/posts/:username", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield db_1.Post.find({ user: req.params.username })
        .then((result) => {
        return result;
    })
        .catch((err) => err));
}));
app.post("/api/posts/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let formattedContent = req.body.content;
    let atRegex = new RegExp("@[a-zA-Z]+");
    let atUser = formattedContent.match(atRegex);
    if (atUser) {
        formattedContent = formattedContent.replace(new RegExp("@[a-zA-Z]+"), atTagForUser(atUser[0].substring(1)));
    }
    const newPost = new db_1.Post({
        user: req.body.user,
        timestamp: dateformat_1.default(Date.now(), "yyyy-mm-dd HH:MM:ss"),
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
}));
app.post("/api/posts/:id/like", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("OK");
}));
const getUsersForPosts = (posts) => __awaiter(void 0, void 0, void 0, function* () {
    const usersInPromise = posts.map((post) => __awaiter(void 0, void 0, void 0, function* () {
        return yield db_1.User.findOne({ username: post.user }).then((res) => res);
    }));
    const users = yield Promise.all(usersInPromise).then((res) => res);
    return posts.map((p, idx) => {
        var _a;
        let { id, user, timestamp, content, likes } = p;
        let temp = {
            avatar: (_a = users[idx]) === null || _a === void 0 ? void 0 : _a.avatar.valueOf(),
            id: id,
            user: user,
            timestamp: timestamp,
            content: content,
            likes: likes,
        };
        return temp;
    });
});
const atTagForUser = (user) => {
    return '<a href="/profile/"' + user + '">@' + user + "</a>";
};
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../client/build/index.html"));
});
app.listen(app.get("port"), () => {
    console.log(`Server running on port ${app.get("port")}.`);
}).on("error", (e) => console.error(e));
//# sourceMappingURL=app.js.map