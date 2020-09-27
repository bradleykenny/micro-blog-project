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
exports.postRouter = void 0;
const express_1 = __importDefault(require("express"));
const dateformat_1 = __importDefault(require("dateformat"));
const db_1 = require("../db");
exports.postRouter = express_1.default.Router();
exports.postRouter.get("/api/posts/user/:username/:limit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield db_1.Post.find({ user: req.params.username })
        .sort({ timestamp: -1 })
        .then((result) => __awaiter(void 0, void 0, void 0, function* () {
        const limit = Number(req.params.limit);
        if (result.length > limit) {
            let newArr = result.slice(0, limit);
            return yield getUsersForPosts(newArr);
        }
        return yield getUsersForPosts(result);
    }))
        .catch((err) => err));
}));
exports.postRouter.get("/api/posts/:limit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield db_1.Post.find({})
        .sort({ timestamp: -1 })
        .then((result) => __awaiter(void 0, void 0, void 0, function* () {
        const limit = Number(req.params.limit);
        if (result.length > limit) {
            let newArr = result.slice(0, limit);
            return yield getUsersForPosts(newArr);
        }
        return yield getUsersForPosts(result);
    }))
        .catch((err) => err));
}));
exports.postRouter.get("/api/posts/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield db_1.Post.find({})
        .then((result) => {
        return result;
    })
        .catch((err) => err));
}));
exports.postRouter.post("/api/posts/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.postRouter.post("/api/posts/:id/like", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.default = exports.postRouter;
//# sourceMappingURL=posts.js.map