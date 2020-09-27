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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db");
exports.userRouter = express_1.default.Router();
exports.userRouter.post("/api/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.userRouter.post("/api/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.userRouter.get("/api/user/:username", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield db_1.User.findOne({ username: req.params.username })
        .then((result) => {
        return result;
    })
        .catch((err) => err));
}));
exports.userRouter.post("/api/follow/:username", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
//# sourceMappingURL=users.js.map