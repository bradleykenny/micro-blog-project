"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const posts_1 = require("./mongo/posts");
let bodyParser = require("body-parser");
const app = express_1.default();
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());
const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PW}@cluster0.eisaa.mongodb.net/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;
mongoose_1.default
    .connect(url, { useNewUrlParser: true })
    .then((result) => {
    console.log("connected to mongo");
})
    .catch((error) => {
    console.log("NOT connected to mongo");
    console.error(error);
});
let db = mongoose_1.default.connection;
app.set("port", 5000);
app.get("/test", (req, res) => {
    return res.send("test");
});
app.get("/ping", (req, res) => {
    return res.send("pong");
});
app.get("/user/:username", (req, res) => {
    return res.json({ username: req.params.username });
});
app.get("/posts", (req, res) => {
    const instance = new posts_1.BlogPost();
    return "1";
});
app.get("/data/import/test", (req, res) => {
    return res.send("Test data imported.");
});
app.listen(app.get("port"), () => {
    console.log(`Server running on port ${app.get("port")}.`);
}).on("error", (e) => console.error(e));
//# sourceMappingURL=app.js.map